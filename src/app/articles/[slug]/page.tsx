import { articles } from "@/lib/articles";
import { ArticleView } from "@/components/ArticleView";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articleIndex = articles.findIndex((a) => a.slug === slug);

  if (articleIndex === -1) {
    notFound();
  }

  const article = articles[articleIndex];
  // Recommends the next article in the list cyclically
  const nextArticle = articles[(articleIndex + 1) % articles.length];

  return <ArticleView article={article} nextArticle={nextArticle} />;
}
