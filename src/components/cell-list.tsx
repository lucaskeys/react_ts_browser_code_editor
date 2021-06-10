import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) => {
    return order.map((id) => {
      return data[id];
    });
  });
  useTypedSelector((state) => console.log(state));
  return <div>Cell List</div>;
};

export default CellList;
