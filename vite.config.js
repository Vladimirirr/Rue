const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxInject: `import { h } from '@/vdom/h.js'`,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.js'),
      name: 'Rue',
      fileName: 'Rue',
      // umd格式：使用script方式直接引入，已经被压缩
      // es格式：打包工具（比如webpack、vite）使用，没有被压缩
      formats: ['umd', 'es'],
    },
  },
})
