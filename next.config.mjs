/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '20mb',
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'artphanage-images.s3.eu-north-1.amazonaws.com',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
};

export default nextConfig;
