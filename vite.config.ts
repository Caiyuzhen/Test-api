import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
	plugins: [react()],
	server: {
		cors: true, // 默认启用并允许任何源
		port: 3005,
		open: true, // 在服务器启动时自动在浏览器中打开应用程序
		proxy: { //代理配置以避免跨域问题
			'/api': {
				target: 'http://localhost:3005',  //代理接口
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			},		
		},
	},
})
