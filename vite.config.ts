import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
	plugins: [react()],
	server: {
		open: true,
		proxy: { //代理配置以避免跨域问题
			'/api': {
				target: 'http://localhost:3005',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			},		
		},
	},
})
