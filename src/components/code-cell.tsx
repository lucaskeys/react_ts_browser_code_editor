import React, { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
// this is the function that creates our bundle and returns the result - located in the bundler directory
import bundle from '../bundler';
import Resizable from './resizable';
import { Cell } from '../redux/cellInterface';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // this input will be used in our plugin file for the import package inside our onLoad function for the contents
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setError(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          {/* cell.id taken from props */}
          <CodeEditor onChange={(value) => updateCell(cell.id, value)} initialValue={cell.content} />
        </Resizable>
        {/* <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea> */}
        <Preview code={code} err={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
