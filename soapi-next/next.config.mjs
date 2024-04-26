/** @type {import('next').NextConfig} */
const nextConfig = {
     env: {
          bearerToken:
               "c1dd10f8bccd83d992bd892194fa28c94efe692b1e4511c26ac33579affe0c9f9cf0909018feab10b69c54631bb40bb2570de4125843789ac8738e1f62d2e4b1383f7a1563064a856681675c2776b835b41a049f16f34a413c1cfafbc2d337d8cb8fad6fa6cf27b881d7447c56a627949e8aa600a558468408c65944b52135e1",
          strapiAdress: "http://localhost:1337",
          serverAdress: " http://localhost:3000",
          testId: 5,
     },
     images: {
          domains: ["localhost"],
     },
};

export default nextConfig;
