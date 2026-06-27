import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getCaseStudy } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData, params }) => {
    const c = loaderData?.study;
    return {
      meta: [
        { title: `${c?.title ?? "Case Study"} — TS Tech Studio` },
        { name: "description", content: c?.challenge ?? "" },
        { property: "og:title", content: `${c?.title ?? "Case Study"} — TS Tech Studio` },
        { property: "og:description", content: c?.challenge ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/case-studies/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/case-studies/${params.slug}` }],
      scripts: c
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: c.title,
                about: c.client,
                publisher: { "@type": "Organization", name: "TS Tech Studio" },
              }),
            },
          ]
        : [],
    };
  },
  component: CaseStudyDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Case study not found</h1>
      <Link to="/case-studies" className="mt-6 inline-block text-brand">
        ← Back to case studies
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
    </div>
  ),
});

function CaseStudyDetail() {
  const { study } = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <Link
        to="/case-studies"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All case studies
      </Link>

      <header className="mt-8">
        <span className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground">
          {study.category} · {study.client}
        </span>
        <h1 className="mt-4 text-4xl font-bold leading-tight">{study.title}</h1>
      </header>

      <div
        className={cn(
          "relative mt-8 grid h-52 place-items-center overflow-hidden rounded-3xl bg-gradient-to-br shadow-glow",
          study.cover,
        )}
      >
        <div className="absolute inset-0 bg-grid opacity-30" />
        <span className="relative font-display text-4xl font-bold opacity-80">{study.client}</span>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {study.results.map((r: { label: string; value: string }) => (
          <div
            key={r.label}
            className="rounded-2xl border border-border bg-card/60 p-5 text-center"
          >
            <p className="text-3xl font-bold text-gradient">{r.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{r.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">The challenge</h2>
        <p className="mt-3 text-muted-foreground">{study.challenge}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Our approach</h2>
        <ul className="mt-4 space-y-3">
          {study.approach.map((a: string) => (
            <li key={a} className="flex gap-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gradient-brand text-brand-foreground">
                <Check className="size-3.5" />
              </span>
              <span className="text-muted-foreground">{a}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Tech stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {study.stack.map((t: string) => (
            <span
              key={t}
              className="rounded-md border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <blockquote className="mt-12 rounded-3xl border border-border bg-card/60 p-8 shadow-card">
        <p className="text-lg font-medium">"{study.quote.text}"</p>
        <footer className="mt-3 text-sm text-muted-foreground">— {study.quote.author}</footer>
      </blockquote>

      <div className="mt-12 rounded-3xl border border-border bg-card/60 p-8 text-center shadow-glow">
        <h2 className="text-2xl font-bold">Want results like these?</h2>
        <Link
          to="/contact"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          Start your project <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
