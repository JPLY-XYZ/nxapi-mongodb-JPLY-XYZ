/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// next.config.js
module.exports = {
    experimental: {
      middlewareFile: true, // Habilita el uso de middleware en Next.js (para versiones anteriores)
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Aplica el middleware a las rutas de la API
          destination: '/:path*', // Permite que el middleware se aplique correctamente
        },
      ];
    },
  };
  
