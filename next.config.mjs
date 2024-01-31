/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			allowedOrigins: ['localhost', 'localhost:3030', 'http://localhost:3030']
		}
	}
};

export default nextConfig;
