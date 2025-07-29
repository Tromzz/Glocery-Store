/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
        domains:['127.0.0.1']
    }
};

export default nextConfig;
