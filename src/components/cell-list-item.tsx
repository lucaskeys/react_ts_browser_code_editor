import React from 'react';
import { Cell } from '../redux';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import ActionBar from './action-bar';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  cell.type === 'code' ? (child = <CodeCell cell={cell} />) : (child = <TextEditor cell={cell} />);

  return (
    <div>
      <ActionBar id={cell.id} />
      {child}
    </div>
  );
};

export default CellListItem;
