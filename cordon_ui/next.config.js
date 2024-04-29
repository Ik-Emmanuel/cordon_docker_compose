
module.exports = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: '192.171.164.40:8080',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'localhost:8080',
                pathname: '**',
            },

        ],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['192.171.164.40:8080', 'localhost:8080',],
        },
    },
}
