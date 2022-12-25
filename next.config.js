/** @type {import('next').NextConfig} */

const {i18n} = require('./i18n.config')

const nextConfig = {
  reactStrictMode: true,
	serverRuntimeConfig: {
      // Will only be available on the server side
		token: 'asojffs54df5asdf54as35dfa65df4eghbv2'
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.dummyjson.com',
			},
		],
	},
	i18n
}

module.exports = nextConfig
