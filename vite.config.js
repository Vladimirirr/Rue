const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  esbuild: {
    // 存疑：为什么有时候生效有时候不行
    // jsxFactory: 'jsx',
    // jsxInject: `import { jsx } from 'snabbdom'`,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.js'),
      name: 'Rue',
      fileName: 'Rue',
      formats: ['umd', 'es'],
    },
    // rollupOptions: {
    //   // 外部依赖不要打包
    //   external: ['vue'],
    //   output: {
    //     // 当使用 UMD 或 IIFE 时候，外部依赖给一个全局名字
    //     globals: {
    //       vue: 'Vue',
    //     },
    //   },
    // },
  },
})