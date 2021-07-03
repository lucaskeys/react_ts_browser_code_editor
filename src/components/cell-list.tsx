import React, { Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import './add-cell.scss';
import './cell-list.scss';
const CellList: React.FC = () => {
  // creates an ordered array of all the cell objects
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <CellListItem cell={cell} />
        <AddCell prevCellId={cell.id} />
      </Fragment>
    );
  });
  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
