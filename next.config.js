/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      "res.cloudinary.com",
      "localhost",
      "pgm-platform-server.herokuapp.com",
    ],
  },
  reactStrictMode: true,
  // publicRuntimeConfig: true
};
