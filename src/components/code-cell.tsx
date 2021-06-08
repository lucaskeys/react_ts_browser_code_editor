import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
// this is the function that creates our bundle and returns the result - located in the bundler directory
import bundle from '../bundler';
import Resizable from './resizable';
const CodeCell = () => {
  // this input will be used in our plugin file for the import package inside our onLoad function for the contents
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor onChange={(value) => setInput(value)} initialValue="'Happy coding!'" />
        </Resizable>
        {/* <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea> */}
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
