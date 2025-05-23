import { headlineService } from "@/lib/services/headlineService";
import { notFound } from "next/navigation";
import { HeadlineDetail } from "@/components/news/single-news/HeadlineDetail";
import { MoreHeadlines } from "@/components/news/single-news/MoreHeadlines";
import { CommentsSection } from "@/components/news/single-news/comments/CommentsSection";


type HeadlinePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function HeadlinePage(props: HeadlinePageProps) {
  const params = await props.params;
  const { id } = params;

  const headlines = await headlineService.getAllHeadlines();
  const headline = headlines.find((h) => h.id === id);

  if (!headline) return notFound();

  const others = headlines.filter((h) => h.id !== id);

  return (
    <main className="bg-white min-h-screen">
      <section className="max-w-6xl mx-auto px-4 md:px-8">
        <HeadlineDetail headline={headline} />
        <MoreHeadlines headlines={others} />
        <CommentsSection headlineId={id} />
      </section>
    </main>
  );
}
