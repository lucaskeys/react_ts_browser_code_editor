import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});

// just testing to see if something is saved to our browser db - can check via application tab in our console, then going to indexedDB and our storage name
// (async () => {
//   // this saves to an index db inside the browser
//   await fileCache.setItem('color', 'red');

//   const color = await fileCache.getItem('color');
//   console.log(color);
// })();

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // handle root entry file of 'index.js'
      // regex for looking for an index.js file
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          path: 'index.js',
          namespace: 'a'
        };
      });

      // the onResolve - used to figure out what the actual path is to a file - overrides ESBuilds natural behavior to look for a file in the file system
      // build.onResolve({ filter: /.*/ }, async (args: any) => {
      //   // filter - regex and namespace allows us to only apply  functionality to certain files

      // Handle relative paths in a module
      // this regex looks for a ./ or a ../
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          // importer - 'unpkg.com/medium-test-pkg'
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        };
      });

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };
        // else if (args.path === 'tiny-test-pkg') {
        //   return { path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js', namespace: 'a' };
        // }
      });
    }
  };
};
