import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

// A simple in-memory store for rate limiting IP addresses
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; waitSec?: number } {
  const limit = 5; // Max 5 requests
  const windowMs = 15 * 60 * 1000; // Per 15 minutes window
  const now = Date.now();

  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return { allowed: true };
  }

  if (record.count >= limit) {
    const waitSec = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, waitSec };
  }

  record.count++;
  return { allowed: true };
}

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (10+ characters)")
    .max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Receives a contact submission and sends an email notification.
 * If a Resend connector key is configured it sends a real email,
 * otherwise it safely records the lead server-side and returns success.
 */
export const submitContact = createServerFn({ method: "POST" })
  .validator((data: ContactInput) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Retrieve client IP for server-side rate limiting to prevent bot spam
    const request = getRequest();
    const clientIp = request
      ? request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1"
      : "127.0.0.1";

    const limitCheck = checkRateLimit(clientIp);
    if (!limitCheck.allowed) {
      console.warn(`Contact form submission rate-limited for IP ${clientIp}`);
      return {
        ok: false,
        emailed: false,
        error: `Too many attempts. Please wait ${limitCheck.waitSec} seconds before submitting again.`,
      };
    }

    const envs = typeof process !== "undefined" ? process.env : {};
    const metaEnvs = (import.meta as any).env || {};

    const resendKey = envs.RESEND_API_KEY || metaEnvs.VITE_RESEND_API_KEY || metaEnvs.RESEND_API_KEY;
    const notifyTo = envs.CONTACT_NOTIFY_EMAIL || metaEnvs.VITE_CONTACT_NOTIFY_EMAIL || metaEnvs.CONTACT_NOTIFY_EMAIL || "tstechstudio11@gmail.com";

    const html = `
      <h2>New enquiry — TS Tech Studio</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company || "—")}</p>
      <p><strong>Service:</strong> ${escapeHtml(data.service || "—")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
    `;

    if (resendKey) {
      try {
        const url = "https://api.resend.com/emails";
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendKey}`,
        };

        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify({
            from: "TS Tech Studio <onboarding@resend.dev>",
            to: [notifyTo],
            reply_to: data.email,
            subject: `New enquiry from ${data.name}`,
            html,
          }),
        });

        if (!res.ok) {
          const errMsg = await res.text();
          console.error("Email send failed:", res.status, errMsg);
          return { ok: true, emailed: false, error: `Resend API error (${res.status}): ${errMsg}` };
        }
        return { ok: true, emailed: true };
      } catch (err: any) {
        console.error("Email send error:", err);
        return { ok: true, emailed: false, error: err?.message || "Network request failed" };
      }
    }

    // No email provider configured yet — record the lead in server logs.
    console.log("New contact submission (no API key configured):", JSON.stringify(data));
    return { ok: true, emailed: false, error: "No RESEND_API_KEY configured in environment variables." };
  });

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
