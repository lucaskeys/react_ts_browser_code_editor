import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import CodeEditor from './components/code-editor';
import Preview from './components/preview';
// this is the function that creates our bundle and returns the result - located in the bundler directory
import bundle from './bundler';
const App = () => {
  // this input will be used in our plugin file for the import package inside our onLoad function for the contents
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  // empty array means to call the function one time
  // useEffect(() => {
  //   startService();
  // }, []);

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor onChange={(value) => setInput(value)} initialValue="'Happy coding!'" />
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
