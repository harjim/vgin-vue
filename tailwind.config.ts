import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  safelist: '', // 白名单
  attributify: {
    prefix: 'c:'
  },
  alias: {
    'flex-center': 'flex justify-center items-center'
  },
  theme: {},
  plugins: []
})
