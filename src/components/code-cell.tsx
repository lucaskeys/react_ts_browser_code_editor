import React, { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../redux/cellInterface';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // this input will be used in our plugin file for the import package inside our onLoad function for the contents
  // const [code, setCode] = useState('');
  // const [error, setError] = useState('');
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => {
    return state.bundles[cell.id];
  });
  console.log(bundle);

  // this is the function that creates our bundle and returns the result - located in the bundler directory
  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          {/* cell.id taken from props */}
          <CodeEditor onChange={(value) => updateCell(cell.id, value)} initialValue={cell.content} />
        </Resizable>
        {bundle && <Preview code={bundle.code} err={bundle.error} />}
      </div>
    </Resizable>
  );
};

export default CodeCell;
