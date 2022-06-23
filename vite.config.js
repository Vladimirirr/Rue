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
