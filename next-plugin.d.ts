import { NextConfig } from 'next';

interface NextjsTaggerOptions {
  enabled?: boolean;
  prefixName?: string;
  debug?: boolean;
}

declare function withNextjsTagger(options?: NextjsTaggerOptions): (nextConfig?: NextConfig) => NextConfig;

export = withNextjsTagger;