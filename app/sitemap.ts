import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://passverse.com.ng/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const topSubjects = ['mathematics', 'english', 'biology', 'physics', 'chemistry'];
  const recentYears = [2025, 2024, 2023, 2022, 2021];
  const allExams    = ['jamb', 'waec', 'gce', 'neco'];

  const pastQuestionsUrls: MetadataRoute.Sitemap = [];

  pastQuestionsUrls.push({
    url: 'https://passverse.com.ng/past-questions',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  });

  for (const exam of allExams) {
    for (const subject of topSubjects) {
      // Subject index pages
      pastQuestionsUrls.push({
        url: `https://passverse.com.ng/past-questions/${exam}/${subject}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });

      // Year pages
      for (const year of recentYears) {
        pastQuestionsUrls.push({
          url: `https://passverse.com.ng/past-questions/${exam}/${subject}/${year}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.9,
        });
      }
    }
  }

  return [
    {
      url: 'https://passverse.com.ng',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://passverse.com.ng/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://passverse.com.ng/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://passverse.com.ng/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...blogUrls,
    ...pastQuestionsUrls,
  ];
}
