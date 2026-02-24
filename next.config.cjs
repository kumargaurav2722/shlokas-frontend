/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-router-dom": require("path").resolve(
        __dirname,
        "src/compat/react-router-dom.js"
      )
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: "/gita-overview",
        destination: "/bhagavad-gita",
        permanent: true
      },
      {
        source: "/vedas-overview",
        destination: "/scriptures/vedas",
        permanent: true
      },
      {
        source: "/upanishads-overview",
        destination: "/upanishads",
        permanent: true
      },
      {
        source: "/puranas-overview",
        destination: "/scriptures/puranas",
        permanent: true
      },
      {
        source: "/mahabharata-overview",
        destination: "/scriptures/mahabharata",
        permanent: true
      },
      {
        source: "/scriptures/gita",
        destination: "/bhagavad-gita",
        permanent: true
      },
      {
        source: "/scriptures/gita/:text/:chapter",
        destination: "/bhagavad-gita/chapter-:chapter",
        permanent: true
      },
      {
        source: "/scriptures/gita/:text/:chapter/:verse",
        destination: "/bhagavad-gita/chapter-:chapter/verse-:verse",
        permanent: true
      }
    ];
  },
  async rewrites() {
    const langPrefix = "/:lang(en|hi|bn|mr|te|ta|kn)";
    return [
      {
        source: `${langPrefix}/bhagavad-gita/:chapter/:verse`,
        destination: "/bhagavad-gita/chapter-:chapter/verse-:verse"
      },
      {
        source: `${langPrefix}/bhagavad-gita/:chapter`,
        destination: "/bhagavad-gita/chapter-:chapter"
      },
      {
        source: `${langPrefix}/bhagavad-gita`,
        destination: "/bhagavad-gita"
      },
      {
        source: `${langPrefix}/:path*`,
        destination: "/:path*"
      }
    ];
  }
};

module.exports = nextConfig;
