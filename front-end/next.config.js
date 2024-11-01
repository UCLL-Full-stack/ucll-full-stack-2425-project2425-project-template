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
};
