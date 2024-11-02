module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/planner",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};
