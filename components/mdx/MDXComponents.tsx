import Link from 'next/link';
import type { MDXComponents as MDXComponentsType } from 'mdx/types';

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-lg border-l-4 border-[var(--color-primary)] bg-blue-50 p-4">
      <div className="text-[var(--color-gray-800)]">{children}</div>
    </div>
  );
}

function CustomLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }) {
  if (!href) return <a {...props}>{children}</a>;

  const isExternal = href.startsWith('http') || href.startsWith('//');

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      {...props}
      className="overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-green-400"
    >
      {children}
    </pre>
  );
}

export const MDXComponents: MDXComponentsType = {
  blockquote: Callout,
  a: CustomLink as MDXComponentsType['a'],
  pre: CodeBlock,
};
