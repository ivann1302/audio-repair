import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  sassOptions: {
    additionalData: `
      @use "sass:color";
      @use "@/shared/styles/variables" as *;
      @use "@/shared/styles/mixins" as *;
    `,
  },
}

export default nextConfig
