import { loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
// import viteCompression from 'vite-plugin-compression';
import uniReadPagesV3Plugin from '@jinghe-sanjiaoroad-app/core/src/router/utils/uni-read-pages-v3';
import mpliveMainfestPlugin from '@jinghe-sanjiaoroad-app/core/src/libs/mplive-manifest-plugin';


// https://vitejs.dev/config/
export default (command, mode) => {
	const env = loadEnv(mode, __dirname, 'SHOPRO_');
	return {
		envPrefix: "SHOPRO_",
		plugins: [
			uni(),
			// viteCompression({
			// 	verbose: false
			// }),
			uniReadPagesV3Plugin({
				pagesJsonDir: path.resolve(__dirname, './pages.json'),
				includes: ['path', 'aliasPath', 'name', 'meta'],
			}),
			mpliveMainfestPlugin(env.SHOPRO_MPLIVE_ON)
		],
		server: {
			host: true,
			// open: true,
			port: env.SHOPRO_DEV_PORT,
			hmr: {
				overlay: true,
			},
		},
		resolve: {
			// 确保正确解析 CommonJS 格式的依赖模块，避免在 ESM 环境中的导入错误
			alias: {
				'crypto-js': 'crypto-js/index.js',
				'weixin-js-sdk': 'weixin-js-sdk/index.js'
			}
		},
		optimizeDeps: {
			// 预构建这些频繁使用的依赖以提高开发服务器性能和热更新速度
			include: [
				'dayjs',
				'dayjs/plugin/relativeTime',
				'dayjs/plugin/duration',
				'dayjs/locale/zh-cn'
			],
		},
	};
};
