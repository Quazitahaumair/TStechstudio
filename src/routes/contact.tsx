import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Mail, MapPin, Send, Phone } from "lucide-react";
import { z } from "zod";
import { submitContact, contactSchema } from "@/lib/contact.functions";
import { services } from "@/data/services";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TS Tech Studio" },
      {
        name: "description",
        content:
          "Get in touch with TS Tech Studio for websites, apps, design, marketing, and branding. Request a free quote.",
      },
      { property: "og:title", content: "Contact — TS Tech Studio" },
      { property: "og:description", content: "Tell us about your project." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

function ContactPage() {
  const send = useServerFn(submitContact);
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update =
    (key: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of (parsed.error as z.ZodError).issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await send({ data: parsed.data });
      if (!res.ok) {
        toast.error("Form submission blocked", {
          description: res.error || "Too many attempts. Please try again later.",
        });
        return;
      }

      if (res.emailed) {
        toast.success("Thanks! We'll be in touch within 24 hours.", {
          description: "A notification email has been sent to our team.",
        });
        setForm(empty);
      } else {
        console.warn("Contact email delivery warning:", res.error);
        toast.warning("Message recorded, but email notification failed.", {
          description: res.error || "Please check your mail keys configuration.",
        });
        setForm(empty);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-ring";

  return (
    <div className="mx-auto max-w-6xl px-6 pt-40 pb-16 sm:pt-52 md:pt-60">
      <header className="text-center">
        <p className="text-sm font-medium text-teal">Get In Touch</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Let's build together</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Tell us about your project and we'll get back to you with a free quote.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-border bg-card/60 p-8 shadow-card">
            <h2 className="text-xl font-bold">Contact details</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer to reach out directly? We're here to help.
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
                  <Mail className="size-4" />
                </span>
                <span>
                  <span className="block text-muted-foreground">Email</span>
                  <a href="mailto:tstechstudio11@gmail.com" className="hover:text-brand transition-colors">
                    tstechstudio11@gmail.com
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
                  <Phone className="size-4" />
                </span>
                <span>
                  <span className="block text-muted-foreground">Phone / WhatsApp</span>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+917875992292" className="hover:text-brand transition-colors">
                      +91 7875992293
                    </a>
                    <a href="tel:+919623710631" className="hover:text-brand transition-colors">
                      +91 9623710631
                    </a>
                  </div>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
                  <MapPin className="size-4" />
                </span>
                <span>
                  <span className="block text-muted-foreground">Working worldwide</span>
                  Kinwat Dist. Nanded, Maharashtra.
                </span>
              </li>
            </ul>
            <div className="mt-8 rounded-2xl border border-border bg-secondary/30 p-5 text-sm text-muted-foreground">
              <p className="text-gradient font-display text-lg font-bold">
                Innovate. Develop. Grow.
              </p>
              <p className="mt-1">Your partner in digital transformation.</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-border bg-card/60 p-8 shadow-card lg:col-span-3"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Name</label>
              <input
                className={field}
                value={form.name}
                onChange={update("name")}
                placeholder="Quazi Taha"
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input
                className={field}
                value={form.email}
                onChange={update("email")}
                placeholder="Taha@company.com"
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Phone Number</label>
              <input
                className={field}
                value={form.phone}
                onChange={update("phone")}
                placeholder="+91 99999 99999"
              />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Company <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                className={field}
                value={form.company}
                onChange={update("company")}
                placeholder="TStechstudio"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Service <span className="text-muted-foreground">(optional)</span>
              </label>
              <select className={field} value={form.service} onChange={update("service")}>
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium">Message</label>
            <textarea
              className={`${field} min-h-32 resize-y`}
              value={form.message}
              onChange={update("message")}
              placeholder="Tell us about your project, goals, and timeline…"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                Send message <Send className="size-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
