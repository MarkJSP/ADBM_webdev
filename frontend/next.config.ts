/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Expose this env var to the browser, so you can use process.env.NEXT_PUBLIC_API_URL
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:3000',
  },

  // If you ever need rewrites or proxies, you can add them here:
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3000/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
