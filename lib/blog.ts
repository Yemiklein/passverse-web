import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  readTime: string;
  featured: boolean;
  coverEmoji: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

function getMDXFiles(): string[] {
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
}

function parseFrontmatter(filePath: string): { frontmatter: BlogPost; content: string } {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const frontmatter: BlogPost = {
    slug: path.basename(filePath, '.mdx'),
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    category: data.category ?? 'General',
    keywords: data.keywords ?? [],
    readTime: stats.text,
    featured: data.featured ?? false,
    coverEmoji: data.coverEmoji ?? '📝',
  };

  return { frontmatter, content };
}

export function getAllPosts(): BlogPost[] {
  const files = getMDXFiles();
  const posts = files.map((file) => {
    const { frontmatter } = parseFrontmatter(path.join(BLOG_DIR, file));
    return frontmatter;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): { frontmatter: BlogPost; content: string } {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  return parseFrontmatter(filePath);
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.featured)
    .slice(0, 3);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getRelatedPosts(slug: string, category: string): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.category === category && p.slug !== slug)
    .slice(0, 3);
}
