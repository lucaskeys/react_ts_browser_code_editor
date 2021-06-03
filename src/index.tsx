import * as esbuild from 'esbuild-wasm';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plug';
import { fetchPlugin } from './plugins/fetch-plugin';
const App = () => {
  const ref = useRef<any>();

  // this input will be used in our plugin file for the import package inside our onLoad function for the contents
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // empty array means to call the function one time
  useEffect(() => {
    startService();
  }, []);

  // this is the esbuild initialization - it will grab the web assembly file from our public directory - the service object we receive will be used to bundle/transform
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  };

  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    // first arg is the code we want to transpile
    // const result = await ref.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015'
    // });

    // console.log(result);
    const result = await ref.current.build({
      // we dont directly provide the esbuilder our code to bundle, but we provide it an entry point file
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      // this is the input state code from above
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });
    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
