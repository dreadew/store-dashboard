/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'wallpapersmug.com',
			},
		],
	},
	experimental: {
		serverActions: {
			allowedOrigins: ['localhost', 'localhost:3030', 'http://localhost:3030'],
		},
	},
}

export default nextConfig
