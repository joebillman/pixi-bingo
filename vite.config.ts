import {defineConfig} from 'vite'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: false,
        rollupOptions: {
            preserveEntrySignatures: "allow-extension",
            output: {
                dir: `dist`,
                assetFileNames: `js/[name].[ext]`,
                chunkFileNames: `js/[name].js`,
                entryFileNames: `js/[name].js`,
                name: "Decoding",
            },
        },
        sourcemap: true,
    },
    esbuild: {
        target: "es2020",
    },
    plugins: [tsconfigPaths()],
    server: {
        port: 3030,
        open: true,
    }
})
