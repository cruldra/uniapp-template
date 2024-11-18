import uniModule from '@dcloudio/vite-plugin-uni'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

// @ts-expect-error missing types
const Uni = uniModule.default || uniModule

export default defineConfig({
  plugins: [
    Uni(),
    UnoCSS(),
  ],
})
