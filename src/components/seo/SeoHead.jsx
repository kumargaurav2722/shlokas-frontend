import Head from "next/head";
import { useRouter } from "next/router";
import { buildHreflangs, canonicalUrl } from "../../utils/seo";

export default function SeoHead({
  title,
  description,
  canonical,
  schema,
  image,
  ogType = "website",
  hreflangs
}) {
  const router = useRouter();
  const path = router?.asPath ? router.asPath.split("#")[0] : "/";
  const canonicalHref = canonical || canonicalUrl(path);
  const hreflangLinks = hreflangs || buildHreflangs(path);
  const imageHref = image || canonicalUrl("/og-default.svg");
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];
  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
      {hreflangLinks.map((entry) => (
        <link
          key={`${entry.lang}-${entry.href}`}
          rel="alternate"
          hrefLang={entry.lang}
          href={entry.href}
        />
      ))}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonicalHref && <meta property="og:url" content={canonicalHref} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {imageHref && <meta property="og:image" content={imageHref} />}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {imageHref && <meta name="twitter:image" content={imageHref} />}
      {schemas.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </Head>
  );
}
