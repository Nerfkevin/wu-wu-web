import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { LegalShell } from "@/components/legal/LegalShell";

const SITE = "https://wu-wu.com";
const CONTACT = "hello@98goats.com";

export const metadata: Metadata = {
  title: "Terms of Service | Wu-Wu",
  description: "Terms for using wu-wu.com and Wu-Wu’s website.",
  alternates: { canonical: `${SITE}/terms` },
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      effectiveDate="April 7, 2026"
      icon={FileText}
    >
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of{" "}
        <a href={SITE}>{SITE}</a> (the &quot;Site&quot;) operated for Wu-Wu. If
        you do not agree, please do not use the Site.
      </p>

      <section>
        <h2>1. The service</h2>
        <p>
          The Site provides information and updates about Wu-Wu.{" "}
          <strong>
            The Site does not currently offer sign-in, accounts, or public user
            profiles.
          </strong>{" "}
          If we add features later, we will describe them on the Site and may
          update these Terms; unless we say otherwise, any profiles will remain
          private by default.
        </p>
      </section>

      <section>
        <h2>2. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site in violation of any applicable law</li>
          <li>
            Probe, disrupt, or overload our systems, or circumvent security
          </li>
          <li>
            Scrape or copy the Site in bulk without permission (normal browsing
            and search-engine indexing excepted)
          </li>
          <li>Misrepresent your relationship with Wu-Wu</li>
        </ul>
        <p>
          We may suspend or block access if we reasonably believe you have broken
          these rules.
        </p>
      </section>

      <section>
        <h2>3. Intellectual property</h2>
        <p>
          The Site and its content (including design, text, graphics, and Wu-Wu
          branding) are owned by us or our licensors. Do not copy, modify, or
          redistribute our materials without permission, except as allowed by law
          (such as temporary copies in your browser).
        </p>
      </section>

      <section>
        <h2>4. Third-party links</h2>
        <p>
          The Site may link to other sites or services. We are not responsible for
          their content or practices; use them at your own risk.
        </p>
      </section>

      <section>
        <h2>5. Disclaimers</h2>
        <p>
          The Site is provided <strong>&quot;as is&quot;</strong> and{" "}
          <strong>&quot;as available.&quot;</strong> We disclaim warranties to
          the fullest extent permitted by law, including implied warranties of
          merchantability and fitness for a particular purpose. We do not
          guarantee uninterrupted or error-free operation.
        </p>
      </section>

      <section>
        <h2>6. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Wu-Wu and its operators will not
          be liable for indirect, incidental, special, consequential, or punitive
          damages, or loss of profits or data, arising from your use of the Site.
          Our total liability for any claim related to the Site is limited to the
          greater of (a) amounts you paid us in the twelve months before the claim
          for the service giving rise to it, or (b) one hundred U.S. dollars
          (USD $100) if you paid nothing.
        </p>
      </section>

      <section>
        <h2>7. Indemnity</h2>
        <p>
          You agree to indemnify and hold harmless Wu-Wu and its operators from
          claims, damages, and costs (including reasonable attorneys&apos; fees)
          arising from your misuse of the Site or breach of these Terms.
        </p>
      </section>

      <section>
        <h2>8. Privacy</h2>
        <p>
          Our{" "}
          <Link href="/privacy" className="text-violet-400 underline">
            Privacy Policy
          </Link>{" "}
          describes how we handle information. It is part of these Terms by
          reference.
        </p>
      </section>

      <section>
        <h2>9. Changes</h2>
        <p>
          We may update these Terms from time to time. We will update the
          effective date on this page. Continued use of the Site after changes
          means you accept the updated Terms.
        </p>
      </section>

      <section>
        <h2>10. Governing law</h2>
        <p>
          These Terms are governed by the laws that apply to Wu-Wu&apos;s
          operations, without regard to conflict-of-law rules. Disputes will be
          brought in the courts of that jurisdiction, unless applicable law
          requires otherwise.
        </p>
      </section>

      <section>
        <h2>11. Contact</h2>
        <p>
          Questions about these Terms:{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
        </p>
      </section>
    </LegalShell>
  );
}
