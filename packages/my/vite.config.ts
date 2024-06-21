// import alias from '@rollup/plugin-alias'
// import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import dayjs from 'dayjs'
import path from 'path'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
    plugins: [
        // alias({
        //     entries: [{ find: '@', replacement: path.resolve(process.cwd(), 'src') }]
        // }),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/app/components/Icon')],
            symbolId: '[name]'
        }),
        react(),
        // react({
        //     babel: {
        //         plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator']
        //     }
        // }),
        replace({
            preventAssignment: true,
            __build_info: JSON.stringify({
                time: dayjs().format('YYYY/MM/DD HH:mm:ss'),
                dev: process.env.NODE_ENV === 'development'
            })
        })
        // commonjs()
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer()
                // ...(process.env.NODE_ENV === 'production'
                //     ? [
                //           cssnano({
                //               preset: ['default', { discardComments: { removeAll: true } }]
                //           })
                //       ]
                //     : [])
            ]
        },
        modules: {
            generateScopedName: '[name]-[local]-[hash:base64:5]',
            localsConvention: 'camelCaseOnly'
        },
        // preprocessorOptions: {
        //     styl: {
        //         imports: [path.resolve(process.cwd(), 'src/assets/stylus/lib/mixin.styl')]
        //     },
        //     stylus: {
        //         imports: [path.resolve(process.cwd(), 'src/assets/stylus/lib/mixin.styl')]
        //     },
        //     less: {
        //         javascriptEnabled: true,
        //         modifyVars: {
        //             '@primary-color': '#1890ff'
        //         }
        //     }
        // }
    },
    envPrefix: ['VITE_', 'REACT_APP_'],
    define: {
        'process.env': {},
        __DEV__: process.env.NODE_ENV === 'development'
    },
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    // build: {
    //     assetsInlineLimit: 0,
    //     rollupOptions: {
    //         output: {
    //             manualChunks: {
    //                 react: ['react', 'react-dom', 'react-router', 'react-router-dom', 'recoil'],
    //                 i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
    //                 common: ['classnames', 'axios', 'copy-to-clipboard', 'virtual:svg-icons-register']
    //             }
    //         }
    //     }
    // },
    server: {
        port: 3002
        // proxy: {
        //     '/api': {
        //         target: 'https://api.xxx.game',
        //         changeOrigin: true,
        //         bypass: (req, res) => {
        //             delete req.headers['origin']
        //         }
        //     }
        // }
    }
})
