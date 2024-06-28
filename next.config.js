/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  env: {
    BACK_DATA: process.env.BACK_DATA,
    API_ALISSA: process.env.API_ALISSA,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
