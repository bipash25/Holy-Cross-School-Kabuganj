import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
}

const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogType = "website",
  ogImage = "/images/og-image.jpg",
  twitterCard = "summary_large_image",
}: SEOHeadProps) => {
  // Construct the full title with site name
  const fullTitle = `${title} | Holy Cross School Kabuganj`;

  // Get the current URL
  const currentUrl = canonicalUrl || window.location.href;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Holy Cross School Kabuganj" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org markup for Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Holy Cross School Kabuganj",
          description: description,
          url: currentUrl,
          logo: "/images/logo.png",
          sameAs: [
            "https://www.facebook.com/holycrosskabuganj",
            "https://www.instagram.com/holycrosskabuganj",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 School Road",
            addressLocality: "Kabuganj",
            addressRegion: "Dhaka",
            postalCode: "1000",
            addressCountry: "Bangladesh",
          },
          telephone: "+880 1234 567890",
          email: "info@holycrosskabuganj.edu",
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
