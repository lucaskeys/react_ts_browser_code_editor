import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
// editorDidMount is a type definition ONLY! - THIS is being imported from the types file when command clicking on EditorDidMount
import React, { useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  // this is the type annotation that we are importing
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    console.log(getValue());
    // The onEditorDidMount only gets run once on init, so we need to also pass in monacoEditor as and argument and then run onDidChange - this is what keeps track of any changes in the value inside the editor
    monacoEditor.onDidChangeModelContent(() => {
      console.log(getValue());
      // this onChange function thats being passed in as a prop is getting the result of getValue, soo no whenever the user types inside the editor, the onChange function is called and we update our input state inside of our parent component
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // get current value
    // console.log(editorRef.current);
    const unformatted = editorRef.current.getModel().getValue();
    // format that value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    // set the formatted value back inside the editor
    editorRef.current.setValue(formatted);
  };
  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language="javascript"
        theme="dark"
        height="400px"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
