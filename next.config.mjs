import UnoCss from '@unocss/webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                port: '',
            },
        ],
    },
    webpack: (config) => {
        config.cache = false;
        config.plugins.push(UnoCss());
        return config;
    }
};

export default nextConfig;
