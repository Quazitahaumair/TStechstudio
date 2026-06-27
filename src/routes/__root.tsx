import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportTstechstudioError } from "../lib/tstechstudio-error-reporting";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { Toaster } from "../components/ui/sonner";
import { LoadingOverlay } from "../components/ui/loading-overlay";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportTstechstudioError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page did not load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#fffbf5" },
      { title: "TS Tech Studio - Digital Solutions Agency" },
      {
        name: "description",
        content:
          "TS Tech Studio builds high-performance websites, apps, UI/UX design, and branding. Transforming ideas into powerful digital experiences.",
      },
      { name: "author", content: "TS Tech Studio" },
      { property: "og:title", content: "TS Tech Studio - Digital Solutions Agency" },
      {
        property: "og:description",
        content: "Websites, apps, design, and branding for businesses ready to grow.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "TS Tech Studio" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TS Tech Studio",
          description: "Modern digital solutions agency for websites, apps, design, and branding.",
          slogan: "Transforming Ideas Into Powerful Digital Experiences.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ background: "#FFFBF5", colorScheme: "light" }}>
      <head suppressHydrationWarning>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){
          var l=document.createElement('link');
          l.rel='stylesheet';
          l.href='https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap';
          document.head.appendChild(l);
        })();`,
          }}
        />
        <HeadContent />
      </head>
      <body suppressHydrationWarning style={{ background: "#FFFBF5" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingOverlay>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <Toaster />
      </LoadingOverlay>
    </QueryClientProvider>
  );
}
