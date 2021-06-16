import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => {
    return <CellListItem key={cell.id} cell={cell} />;
  });
  return <div>{renderedCells}</div>;
};

export default CellList;
