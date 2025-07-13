import { NextConfig } from 'next';

interface NextjsTaggerOptions {
  enabled?: boolean;
  prefixName?: string;
  debug?: boolean;
  include?: string[];
  exclude?: (string | RegExp)[];
}

declare function withNextjsTagger(options?: NextjsTaggerOptions): (nextConfig?: NextConfig) => NextConfig;

export = withNextjsTagger;