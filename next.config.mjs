/** @type {import('next').NextConfig} */
const nextConfig = {
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
