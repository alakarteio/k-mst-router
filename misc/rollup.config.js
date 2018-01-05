import path from 'path'
import fs from 'fs'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  name: pkg.amdName || pkg.name,
  input: pkg['jsnext:main'] || 'src/index.js',
  sourcemap: path.resolve(pkg.main),
  output: {
    file: pkg.main,
    format: process.env.FORMAT || 'umd',
  },
  external: ['mobx-state-tree', 'k-mst-purifier', 'path-to-regexp', 'mobx'],
  plugins: [
    babel(),
    commonjs({
      include: 'node_modules/**',
      extensions: ['.js', '.jsx'],
    }),
    // uglify(),
  ],
  globals: {
  },
}
