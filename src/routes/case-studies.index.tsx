import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies — TS Tech Studio" },
      {
        name: "description",
        content:
          "In-depth case studies showing how TS Tech Studio delivered measurable results for clients.",
      },
      { property: "og:title", content: "Case Studies — TS Tech Studio" },
      {
        property: "og:description",
        content: "Real challenges, real solutions, real results.",
      },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <header className="text-center">
        <p className="text-sm font-medium text-teal">Proven Results</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Case Studies</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Deep dives into how we solve real business problems with technology and design.
        </p>
      </header>

      <div className="mt-12 space-y-8">
        {caseStudies.map((c, i) => (
          <Link
            key={c.slug}
            to="/case-studies/$slug"
            params={{ slug: c.slug }}
            className="group grid overflow-hidden rounded-3xl border border-border bg-card/60 shadow-card transition-all hover:shadow-glow md:grid-cols-2"
          >
            <div
              className={cn(
                "relative grid min-h-56 place-items-center bg-gradient-to-br",
                c.cover,
                i % 2 === 1 && "md:order-2",
              )}
            >
              <div className="absolute inset-0 bg-grid opacity-30" />
              <span className="relative font-display text-3xl font-bold opacity-80">
                {c.client}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8">
              <span className="w-fit rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground">
                {c.category}
              </span>
              <h2 className="mt-3 text-2xl font-bold">{c.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{c.challenge}</p>
              <div className="mt-5 flex flex-wrap gap-4">
                {c.results.map((r) => (
                  <div key={r.label}>
                    <p className="text-xl font-bold text-gradient">{r.value}</p>
                    <p className="text-xs text-muted-foreground">{r.label}</p>
                  </div>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Read case study
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
