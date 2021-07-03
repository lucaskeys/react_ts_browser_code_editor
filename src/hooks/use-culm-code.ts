import { useTypedSelector } from '../hooks/use-typed-selector';

export const useCulmCod = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => {
      return data[id];
    });
    // this is not only used for the cumulative value of all previous code cells, combined into one and then bundled, but this also contains a premade show function that shows code on the preview
    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    var show = (value) => {
      const root =  document.querySelector('#root');

      if(typeof value === 'object') {
        if(value.$$typeof && value.props) {
          _ReactDOM.render(value,  root)
        } else {
        root.innerHTML = JSON.stringify(value);
        }
      }  else {
        root.innerHTML = value;
      }
    }
    `;
    // no operation
    const showFuncNoop = 'var show = () => {}';
    const culmCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          culmCode.push(showFunc);
        } else {
          culmCode.push(showFuncNoop);
        }
        culmCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return culmCode;
  }).join('\n');
};
