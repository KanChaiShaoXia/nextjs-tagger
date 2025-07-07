import { NextConfig } from 'next';

interface NextjsTaggerOptions {
  enabled?: boolean;
  prefixName?: string;
}

declare function withNextjsTagger(options?: NextjsTaggerOptions): (nextConfig?: NextConfig) => NextConfig;

export = withNextjsTagger;