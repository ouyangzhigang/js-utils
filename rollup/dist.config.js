import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';

const fs = require('fs');
const rmdir = require('./rmdir');

rmdir('./dist');

let rollupConfig = [{
  input: 'main.js',
  output: {
    file: 'dist/jes-utils.js',
    format: 'umd',
    name: 'jes-utils'
  },
  plugins: [
    babel({
      exclude: '/node_modules/'
    }), 
    eslint({
      include: ['main.js']
    }),
    resolve(),
    uglify()
  ]
}]

const chunksFile = fs.readdirSync('chunks');
console.log(chunksFile);

chunksFile.forEach((file) => {
  rollupConfig.push({
    input: `chunks/${file}`,
    output: {
      file: `dist/${file}`,
      format: 'umd',
      name: file.replace(/.js$/, '')
    },
    plugins: [
      babel({
        exclude: '/node_modules/'
      }), 
      eslint({
        include: [`chunks/${file}`]
      }),
      resolve(),
      uglify()
    ]
  })
})

module.exports = rollupConfig;
