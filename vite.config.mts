import uniModule from '@dcloudio/vite-plugin-uni'
import UnoCSS from 'unocss/vite'
import {defineConfig} from 'vite'
import {resolve} from 'path';
// @ts-expect-error missing types
const Uni = uniModule.default || uniModule
const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
    '@': pathResolve('./src/'),
};
export default defineConfig({
    plugins: [
        Uni(),
        UnoCSS(),
    ],
    resolve: {
        alias
    }
})
