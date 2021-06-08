import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plug';
import { fetchPlugin } from './plugins/fetch-plugin';

// this type comes from the startService
let service: esbuild.Service;
const bundle = async (rawCode: string) => {
  // if NOT service - meaning if this is the first time we are running this function
  if (!service) {
    // this is the esbuild initialization - it will grab the web assembly file from the wasmURL location - the service object we receive will be used to bundle/transform
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }
  // this is bundling the code and returning the result of the bundled code
  try {
    const result = await service.build({
      // we don't directly provide the ESbuilder our code to bundle, but we provide it an entry point file
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      // this is the input state code from above
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    // we make it an object because if successful, it will return a string, if there is an error, it will also be a string, so we cant differentiate between the errors, so we make it an object
    return {
      code: result.outputFiles[0].text,
      err: '',
    };
  } catch (error) {
    return {
      code: '',
      err: error.message,
    };
  }
};

export default bundle;
