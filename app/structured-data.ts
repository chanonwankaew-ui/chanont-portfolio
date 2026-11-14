export function generateStructuredData() {
  const baseUrl = 'https://chanont-portfolio.vercel.app';
  
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Chanont Wankaew',
    jobTitle: 'Senior Telecom Data Analyst & AI Solutions Specialist',
    url: baseUrl,
    sameAs: [
      'https://www.linkedin.com/in/chanont-wankaew',
    ],
    description: 'Senior Telecom Data Analyst & AI Solutions Specialist with 10+ years in RAN/RF Planning & Optimization (3G/4G/5G NR) and CEM Focus.',
    knowsAbout: [
      'Telecom Data Analytics',
      'RF Optimization',
      '5G NR',
      'AI Solutions',
      'Customer Experience Management',
      'BigQuery',
      'Python',
      'Power BI',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sattahip',
      addressRegion: 'Chonburi',
      addressCountry: 'TH',
    },
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Chanont Wankaew Portfolio',
    url: baseUrl,
    description: 'Portfolio of Chanont Wankaew - Senior Telecom Data Analyst & AI Solutions Specialist',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Chanont Wankaew Portfolio',
    url: baseUrl,
    logo: `${baseUrl}/cw-icon.jpg`,
    description: 'Professional portfolio showcasing telecom data analytics and AI solutions expertise',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'chanont.wankaew@email.com',
      contactType: 'professional',
    },
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Engineering Evidence & Case Studies',
    description: 'Case studies and evidence of telecom data analytics and RF optimization work',
    author: {
      '@type': 'Person',
      name: 'Chanont Wankaew',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Chanont Wankaew Portfolio',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/cw-icon.jpg`,
      },
    },
  };

  return {
    person: personSchema,
    webSite: webSiteSchema,
    organization: organizationSchema,
    article: articleSchema,
  };
}