import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "media.istockphoto.com",
      "hemant-social.s3.ap-south-1.amazonaws.com"
    ]
  }
};

export default nextConfig;
