import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, path }) => {
  const baseUrl = "https://tripzybee.com"; // Replace with your actual domain
  const canonicalUrl = `${baseUrl}${path || ""}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Search Engine Directives */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Social Media Metadata */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Tripzybee" />
      
      {/* Structured Data for Agency */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Tripzybee",
          "image": "https://tripzybee.com/assets/logo.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Whitefield",
            "addressLocality": "Bengaluru",
            "addressRegion": "KA",
            "postalCode": "560066",
            "addressCountry": "IN"
          },
          "url": canonicalUrl
        })}
      </script>
    </Helmet>
  );
};

export default SEO;