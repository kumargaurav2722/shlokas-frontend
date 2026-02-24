import { getSiteUrl } from "../src/utils/seo";

export async function getServerSideProps({ res }) {
  const site = getSiteUrl();
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}
