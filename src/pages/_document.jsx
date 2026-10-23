import { Html, Head, Main, NextScript } from 'next/document';

const DOMAIN = 'https://priteshpatel.dev';

export default function Document() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${DOMAIN}/#person`,
      name: 'Pritesh Patel',
      jobTitle: 'Full Stack MERN Developer',
      description:
        'Self-taught Full Stack MERN Developer based in Gujarat, India. Co-founder of VegBazar, a production grocery platform serving 600+ users. Specializes in React.js, Node.js, Express.js, MongoDB, and Linux VPS deployment.',
      url: DOMAIN,
      email: 'dev.pritesh1@gmail.com',
      image: `${DOMAIN}/og-image.png`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Valsad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
      knowsAbout: [
        'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose',
        'Tailwind CSS', 'JavaScript', 'REST APIs', 'JWT Authentication',
        'Linux VPS', 'Nginx', 'PM2', 'SSL/HTTPS', 'DNS Configuration',
        'Git', 'GitHub', 'Razorpay', 'Cloudinary', 'EmailJS',
        'GSAP', 'Framer Motion', 'Next.js', 'Full Stack Development',
        'MERN Stack', 'Web Application Development',
      ],
      sameAs: [
        'https://github.com/codax69',
        'https://linkedin.com/in/devpritesh',
      ],
      alumniOf: [
        { '@type': 'EducationalOrganization', name: 'State Polytechnic' },
        { '@type': 'EducationalOrganization', name: 'ITI Pardi' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${DOMAIN}/#website`,
      url: DOMAIN,
      name: 'Pritesh Patel | Full Stack MERN Developer Portfolio',
      description:
        'Portfolio of Pritesh Patel — Full Stack MERN Developer from Gujarat, India. Featuring projects in React.js, Node.js, MongoDB, and Linux VPS deployment.',
      author: { '@id': `${DOMAIN}/#person` },
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${DOMAIN}/#profilepage`,
      url: DOMAIN,
      name: 'Pritesh Patel — Full Stack MERN Developer',
      description:
        'Professional portfolio of Pritesh Patel, a self-taught Full Stack MERN developer from Gujarat, India.',
      mainEntity: { '@id': `${DOMAIN}/#person` },
      dateModified: new Date().toISOString().split('T')[0],
    },
  ];

  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="color-scheme" content="dark light" />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload the two font families used above-the-fold */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data */}
        {structuredData.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
