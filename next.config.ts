import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	reactStrictMode: false,
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: '*',
			},
		],
	},
};

export default nextConfig;
