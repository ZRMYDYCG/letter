import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	return {
		plugins: [
			uni(),
			viteMockServe({ mockPath: 'mock', enable: command === 'serve' }),
			createSvgIconsPlugin({
				// Specify the icon folder to be cached
				iconDirs: [path.resolve(process.cwd(), 'src/static/icons')],
				// Specify symbolId format
				symbolId: 'icon-[dir]-[name]',
			}),
		],
	}
})
