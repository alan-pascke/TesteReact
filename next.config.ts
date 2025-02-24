import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ["rspneus.com.br"],
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'rspneus.com.br',
        port: '',
        pathname: '/**',
      }
    ]
  },
};

export default nextConfig;
