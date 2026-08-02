import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen min-h-dvh w-full bg-[#F4F4EE] text-slate-900 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-8"
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Last updated: August 1, 2025
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information you provide directly to us when you create
              an account, use our messaging features, or communicate with us.
              This includes:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 ml-2">
              <li>Account information such as your name, email address, and profile picture</li>
              <li>Messages and media you send through the Service</li>
              <li>Device information including IP address, browser type, and operating system</li>
              <li>Usage data such as access times, pages viewed, and features used</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 ml-2">
              <li>Provide, maintain, and improve the Service</li>
              <li>Process and deliver messages between users in real time</li>
              <li>Send you technical notices, updates, and administrative messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with the Service</li>
              <li>Detect, investigate, and prevent fraudulent transactions and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              3. Data Storage & Security
            </h2>
            <p>
              We implement appropriate technical and organizational security
              measures designed to protect the security of any personal
              information we process. However, no electronic transmission over
              the Internet or information storage technology can be guaranteed
              to be 100% secure, so we cannot promise or guarantee that
              hackers, cybercriminals, or other unauthorized third parties will
              not be able to defeat our security measures.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              4. Data Sharing & Disclosure
            </h2>
            <p className="mb-3">
              We do not sell, trade, or otherwise transfer your personal
              information to outside parties. We may share information in the
              following situations:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 ml-2">
              <li>With your consent or at your direction</li>
              <li>With service providers who assist us in operating the Service</li>
              <li>To comply with legal obligations or respond to lawful requests</li>
              <li>To protect the rights, property, or safety of VChat, our users, or the public</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              5. Cookies & Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our Service and hold certain information. Cookies are files
              with a small amount of data which may include an anonymous unique
              identifier. You can instruct your browser to refuse all cookies
              or to indicate when a cookie is being sent. However, if you do
              not accept cookies, you may not be able to use some portions of
              our Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              6. Data Retention
            </h2>
            <p>
              We will retain your personal information only for as long as is
              necessary for the purposes set out in this Privacy Policy. We
              will retain and use your information to the extent necessary to
              comply with our legal obligations, resolve disputes, and enforce
              our policies. When you delete your account, we will delete or
              anonymize your personal information within 30 days, except where
              retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              7. Your Rights
            </h2>
            <p className="mb-3">
              Depending on your location, you may have the following rights
              regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 ml-2">
              <li>The right to access the personal data we hold about you</li>
              <li>The right to request correction of inaccurate personal data</li>
              <li>The right to request deletion of your personal data</li>
              <li>The right to withdraw consent at any time</li>
              <li>The right to data portability</li>
              <li>The right to lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              8. Children's Privacy
            </h2>
            <p>
              Our Service is not intended for use by anyone under the age of
              13. We do not knowingly collect personally identifiable
              information from children under 13. If we become aware that we
              have collected personal data from a child under 13 without
              verification of parental consent, we take steps to remove that
              information from our servers immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last updated" date. You are advised
              to review this Privacy Policy periodically for any changes.
              Changes to this Privacy Policy are effective when they are posted
              on this page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a href="mailto:privacy@vchat.app" className="text-purple-600 underline underline-offset-2 hover:text-purple-800">
                privacy@vchat.app
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-400">
          © {new Date().getFullYear()} VChat. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
