import { createFileRoute } from "@tanstack/react-router";
import AboutUsSection from "@/components/ui/about-us-section";
import TeamSection from "@/components/ui/team-section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TS Tech Studio" },
      {
        name: "description",
        content:
          "TS Tech Studio is a modern digital solutions agency helping businesses establish, grow, and scale their online presence.",
      },
      { property: "og:title", content: "About — TS Tech Studio" },
      {
        property: "og:description",
        content: "Our mission, vision, and the values behind our work.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <AboutUsSection />
      <TeamSection />
    </main>
  );
}
