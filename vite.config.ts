/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite'
import { ImportMetaEnv } from './src/types/env'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'APP_']) as unknown as ImportMetaEnv

  return {
    base: env.VITE_BASE,
    envPrefix: ['VITE_', 'APP_'],
    plugins: [
      Vue(),
      Jsx(),
      WindiCSS(),
      AutoImport({
        imports: ['vue', 'pinia', 'vue-router'],
        dts: 'src/types/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      Components({
        resolvers: [VarletUIResolver()],
        dts: 'src/types/components.d.ts'
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
