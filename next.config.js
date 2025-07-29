/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
    /*
    experimental: {
        appDir: true
    },
    */
    images: {
        unoptimized: isDev,
    }
};

module.exports = nextConfig;
