const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
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
