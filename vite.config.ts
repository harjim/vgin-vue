/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import Compression from 'vite-plugin-compression'
import { viteMockServe } from 'vite-plugin-mock'
import WindiCSS from 'vite-plugin-windicss'
import { ImportMetaEnv } from './src/types/env'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'APP_']) as unknown as ImportMetaEnv

  return {
    base: env.VITE_BASE,
    envPrefix: ['VITE_', 'APP_'],
    plugins: [
      Vue(),
      Jsx(),
      WindiCSS(),
      AutoImport({
        imports: [
          'vue',
          'pinia',
          'vue-router',
          '@vueuse/core',
          {
            '@varlet/ui': ['Snackbar'],
            '@vueuse/core': ['createFetch']
          }
        ],
        dts: 'src/types/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      Components({
        resolvers: [
          VarletUIResolver(),
          IconsResolver({
            prefix: 'i',
            alias: {
              park: 'icon-park'
            }
            // customCollections: {
            //   // home图标集
            //   // 给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
            //   home: FileSystemIconLoader('src/assets/svg/home', (svg) =>
            //     svg.replace(/^<svg /, '<svg fill="currentColor" ')
            //   )
            // }
          })
        ],
        dts: 'src/types/components.d.ts'
      }),
      Icons({
        scale: 1,
        autoInstall: true,
        compiler: 'vue3',
        jsx: 'react'
      }),
      Compression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      viteMockServe({
        mockPath: 'mocks',
        watchFiles: true,
        localEnabled: command === 'serve',
        prodEnabled: command === 'serve'
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: env.VITE_PORT,
      open: true,
      cors: true,
      proxy: {
        '/api/': {
          target: env.APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\//, '')
        }
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        reporter: ['text', 'json', 'html']
      },
      transformMode: {
        web: [/.[tj]sx$/]
      }
    }
  }
})
