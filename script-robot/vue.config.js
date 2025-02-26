/*
 * @Author: hvinci
 * @Date: 2023-10-23 22:54:19
 * @LastEditors: hvinci
 * @LastEditTime: 2023-11-06 15:22:09
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:{
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  pwa: {
    iconPaths: {
    favicon32: 'favicon.ico',
    favicon16: 'favicon.ico',
    appleTouchIcon: 'favicon.ico',
    maskIcon: 'favicon.ico',
    msTileImage:'favicon.ico',
    }
  }
})


  