import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
const fs = require('fs');
const rmdir = require('./rmdir');

rmdir('./lib');

let rollupConfig = [{
  input: 'main.js',
  output: {
    file: 'lib/jes-utils.js',
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
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    })
  ]
}]

const chunksFile = fs.readdirSync('chunks');
console.log(chunksFile);

chunksFile.forEach((file) => {
  rollupConfig.push({
    input: `chunks/${file}`,
    output: {
      file: `lib/${file}`,
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
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      })
    ]
  })
})

module.exports = rollupConfig;
