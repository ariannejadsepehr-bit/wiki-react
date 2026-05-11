import { MetadataRoute } from 'next';

const baseUrl = 'https://wikibehtarin.com';

const categoryPages = [
  'vakil', 'pezeshk', 'restaurant', 'klinik-zibai', 'kasht-mu',
  'dandanpezeshk', 'hotel', 'amuzeshgah', 'darukhaneh',
];

const cityPages = ['tehran', 'mashhad', 'isfahan', 'shiraz', 'tabriz', 'karaj', 'ahvaz', 'rasht'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/register-business`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/auth/login`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/auth/register`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  const categoryPagesMap: MetadataRoute.Sitemap = categoryPages.map((cat) => ({
    url: `${baseUrl}/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const cityCategoryPages: MetadataRoute.Sitemap = categoryPages.flatMap((cat) =>
    cityPages.map((city) => ({
      url: `${baseUrl}/${cat}-${city}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    }))
  );

  return [...staticPages, ...categoryPagesMap, ...cityCategoryPages];
}
