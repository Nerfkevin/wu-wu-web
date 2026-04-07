import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { LegalShell } from "@/components/legal/LegalShell";

const SITE = "https://wu-wu.com";
const EMAIL = "hello@wu-wu.com";

export const metadata: Metadata = {
  title: "Contact | Wu-Wu",
  description: "Contact Wu-Wu via email.",
  alternates: { canonical: `${SITE}/contact` },
};

export default function ContactPage() {
  return (
    <LegalShell title="Contact" icon={Mail}>
      <p>
        Questions about Wu-Wu? Email us — we&apos;ll get back to you when we can.
      </p>
      <p className="mt-8 text-center">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white no-underline shadow-lg shadow-violet-950/50 transition hover:from-violet-500 hover:to-fuchsia-500"
        >
          {EMAIL}
        </a>
      </p>
    </LegalShell>
  );
}
