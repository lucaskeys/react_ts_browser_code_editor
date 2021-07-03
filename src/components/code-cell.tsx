import React, { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../redux/cellInterface';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCulmCod } from '../hooks/use-culm-code';
import './code-cell.scss';

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
  const culmCode = useCulmCod(cell.id);

  console.log(culmCode);

  // this is the function that creates our bundle and returns the result - located in the bundler directory
  useEffect(() => {
    if (!bundle) {
      // add in a return for each of the code snippets and join them together
      createBundle(cell.id, culmCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, culmCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [culmCode, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          {/* cell.id taken from props */}
          <CodeEditor onChange={(value) => updateCell(cell.id, value)} initialValue={cell.content} />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.error} />
          )}
        </div>
        {/* {bundle && <Preview code={bundle.code} err={bundle.error} />} */}
      </div>
    </Resizable>
  );
};

export default CodeCell;
