/** @type {import('next').NextConfig} */
const nextConfig = {

    images:
    {
        remotePatterns: [
            {protocol: "https", 
            hostname: "dragonball-api.com"}]
    },


    rewrites: () => 
    { 
        return [
            {
                source: "/",
                destination: "/home",

            },
            {
                source: "/segunda_rota",
                destination: "/axiosPage",

            },
            {
                source: "/primeira_rota",
                destination: "/fetchPage",

            },
            {
                source: "/terceira_rota", 
                destination: "/serverSide",

            },
        ]
    }
};

export default nextConfig;
