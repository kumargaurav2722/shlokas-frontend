export const buildBreadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const buildBookSchema = (name, url, author = "Vyasa") => ({
  "@context": "https://schema.org",
  "@type": "Book",
  name,
  url,
  author
});

export const buildArticleSchema = ({
  headline,
  url,
  bookName,
  bookUrl
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  url,
  isPartOf: {
    "@type": "Book",
    name: bookName,
    url: bookUrl
  }
});
