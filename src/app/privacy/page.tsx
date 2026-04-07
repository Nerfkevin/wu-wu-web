import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { LegalShell } from "@/components/legal/LegalShell";

const SITE = "https://wu-wu.com";
const CONTACT = "hello@wu-wu.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Wu-Wu",
  description: "How Wu-Wu handles information when you use wu-wu.com.",
  alternates: { canonical: `${SITE}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      effectiveDate="April 7, 2026"
      icon={Shield}
    >
      <p>
        This Privacy Policy explains how Wu-Wu (&quot;we,&quot; &quot;us&quot;)
        handles information when you visit <a href={SITE}>{SITE}</a> and related
        pages (together, the &quot;Site&quot;). By using the Site, you agree to
        this policy.
      </p>

      <section>
        <h2>1. What the Site is</h2>
        <p>
          The Site is a simple public website for Wu-Wu.{" "}
          <strong>
            There is no sign-in, no user accounts, and no public user profiles on
            the Site today.
          </strong>{" "}
          You browse as a visitor. If we add accounts or profiles later, we will
          update this policy; unless we say otherwise, profiles will stay
          private by default.
        </p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <h3>Automatically</h3>
        <ul>
          <li>
            <strong>Server and hosting logs:</strong> Our infrastructure
            provider (e.g. Vercel) may log technical data such as IP address,
            browser type, request time, and URL — for security, debugging, and
            reliability.
          </li>
          <li>
            <strong>Cookies / analytics (if we use them):</strong> We may use
            first-party or third-party tools to understand traffic in aggregate.
            You can control cookies through your browser settings.
          </li>
        </ul>
        <h3>When you email us</h3>
        <p>
          If you contact us at <a href={`mailto:${CONTACT}`}>{CONTACT}</a>, we
          receive your email address and the contents of your message so we can
          reply.
        </p>
      </section>

      <section>
        <h2>3. How we use information</h2>
        <ul>
          <li>Run, secure, and improve the Site</li>
          <li>Respond to your messages</li>
          <li>Comply with law and protect our rights and users</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing</h2>
        <p>
          We do not sell your personal information. We share data only with
          service providers who help us host or operate the Site (for example
          cloud hosting), under agreements that limit their use of the data.
        </p>
      </section>

      <section>
        <h2>5. Retention</h2>
        <p>
          We keep information only as long as needed for the purposes above or as
          required by law. Logs are typically kept for a limited period and then
          rotated or deleted.
        </p>
      </section>

      <section>
        <h2>6. Children</h2>
        <p>
          The Site is not directed at children under 13, and we do not knowingly
          collect personal information from them.
        </p>
      </section>

      <section>
        <h2>7. Your rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, or restrict use of personal data. Email us at{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a> and we will respond as
          required by applicable law.
        </p>
      </section>

      <section>
        <h2>8. Changes</h2>
        <p>
          We may update this Privacy Policy from time to time. We will change the
          effective date above when we do. Continued use of the Site after
          updates means you accept the revised policy.
        </p>
      </section>

      <section>
        <h2>9. Contact</h2>
        <p>
          Questions about privacy or Wu-Wu:{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
        </p>
      </section>
    </LegalShell>
  );
}
