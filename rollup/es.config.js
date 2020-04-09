import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';

const fs = require('fs');

let rollupConfig = [{
  input: 'main.js',
  output: {
    file: 'es/js-utils.js',
    format: 'es',
    name: 'js-utils'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }), 
    eslint({
      include: ['main.js']
    }),
  ]
}]

const chunksFile = fs.readdirSync('chunks');
console.log(chunksFile);

chunksFile.forEach((file) => {
  rollupConfig.push({
    input: `chunks/${file}`,
    output: {
      file: `es/${file}`,
      format: 'es',
      name: file.replace(/.js$/, '')
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }), 
      eslint({
        include: [`chunks/${file}`]
      }),
    ]
  })
})

module.exports = rollupConfig;
