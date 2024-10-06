/** @type {import('next').NextConfig} */
const nextConfig = {
    output:"export",
    async redirects() {
      return [
        {
          source: '/',
          destination: '/browse',
          permanent: true, 
        },
      ];
    },
    images:{
      remotePatterns:[
        {
          protocol:"https",
          hostname:"image.tmdb.org",
          port:"",
        }
      ]
    }
  };
  
  export default nextConfig;