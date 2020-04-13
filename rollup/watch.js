const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const { eslint } = require('rollup-plugin-eslint');

const inputOptions = {
  input: 'main.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }), 
    eslint({
      include: ['main.js']
    })
  ]
};

const outputOptions = {
  output: {
    file: 'test/js-utils.js',
    format: 'umd',
    name: 'js-utils',
    sourcemap: true
  }
};

const watchOptions = {
  ...inputOptions,
  ...outputOptions,
  watch: {
    include: 'chunks/**'
  }
};

const watcher = rollup.watch(watchOptions);

watcher.on('event', event => {
  console.log('watch status', event.code);
});
