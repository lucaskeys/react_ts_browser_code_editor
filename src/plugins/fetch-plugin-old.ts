import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const fetchPlugin = (inputSearch: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // intercept the onLoad call  -  if you are trying to load anything other than the index.js file, look for the contents again below - esbuild will take the contents and continue the bundling process
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          // instructs bundler to not try and load a file, but rather use the contents (below) that we have given to you instead

          // const react = require('react')
          // const reactDOM = require('react-dom')
          return {
            loader: 'jsx',
            // this comes from our function argument
            contents: inputSearch
          };
        }

        // check to see if we have already fetched this file and if it is in the cache
        // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        // // if it is, return it immediately
        // if (cachedResult) {
        //   return cachedResult;
        // }
        // args.path is the full path to the file we are attempting to fetch
        const { data, request } = await axios.get(args.path);

        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
        // new lines removed, quotes removed from css file - this will make all the css into a single line so it can be read by the bundler
        const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
        const contents =
          fileType === 'css'
            ? `
        const style = document.createElement('style');
        style.innerText = '${escaped}';
        document.head.appendChild(style)
        `
            : data;

        const result: esbuild.OnLoadResult = {
          // this is fetching only jsx files but we need to also fetch css files
          loader: 'jsx',
          contents: contents,
          // responseURL comes from our request and its the 'https://unpkg.com/nested-test-pkg@1.0.0/src/index.js', we then do the './' to go up a directory in the path location, to get '/nested-test-pkg@1.0.0/src/'
          resolveDir: new URL('./', request.responseURL).pathname
        };
        // store response in cache via key value pairs ---- args.path is going to be our key

        await fileCache.setItem(args.path, result);
        return result;
      });
    }
  };
};
