import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

function TermsPage() {
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
          Terms & Conditions
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Last updated: August 1, 2025
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using VChat ("the Service"), you agree to be bound
              by these Terms & Conditions. If you do not agree to all the terms
              and conditions of this agreement, you may not access or use the
              Service. These terms apply to all visitors, users, and others who
              access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              2. Description of Service
            </h2>
            <p>
              VChat is a real-time messaging platform that enables users to
              communicate through text messages and image sharing. The Service
              is provided "as is" and "as available" without any warranties of
              any kind, whether express or implied, including but not limited
              to implied warranties of merchantability, fitness for a
              particular purpose, or non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              3. User Accounts
            </h2>
            <p>
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms, which may result in
              immediate termination of your account on our Service. You are
              responsible for safeguarding the password that you use to access
              the Service and for any activities or actions under your
              password. You agree not to disclose your password to any third
              party.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              4. Acceptable Use
            </h2>
            <p className="mb-3">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 ml-2">
              <li>Transmit any unlawful, harassing, defamatory, or abusive content</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Interfere with or disrupt the Service or servers connected to the Service</li>
              <li>Attempt to gain unauthorized access to any portion of the Service</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Collect or store personal data about other users without their consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              5. Intellectual Property
            </h2>
            <p>
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of VChat and its
              licensors. The Service is protected by copyright, trademark, and
              other laws of both domestic and foreign countries. Our trademarks
              and trade dress may not be used in connection with any product or
              service without the prior written consent of VChat.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              6. User Content
            </h2>
            <p>
              You retain all rights to any content you submit, post, or display
              on or through the Service. By posting content, you grant us a
              non-exclusive, worldwide, royalty-free license to use, reproduce,
              and distribute such content solely in connection with operating
              and providing the Service. You represent and warrant that you own
              or have the necessary rights to the content you post.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              7. Termination
            </h2>
            <p>
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach the Terms. Upon termination,
              your right to use the Service will immediately cease. All
              provisions of the Terms which by their nature should survive
              termination shall survive, including ownership provisions,
              warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              8. Limitation of Liability
            </h2>
            <p>
              In no event shall VChat, nor its directors, employees, partners,
              agents, suppliers, or affiliates, be liable for any indirect,
              incidental, special, consequential, or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              9. Changes to Terms
            </h2>
            <p>
              We reserve the right, at our sole discretion, to modify or
              replace these Terms at any time. If a revision is material, we
              will try to provide at least 30 days' notice prior to any new
              terms taking effect. What constitutes a material change will be
              determined at our sole discretion. By continuing to access or use
              our Service after those revisions become effective, you agree to
              be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:support@vchat.app" className="text-purple-600 underline underline-offset-2 hover:text-purple-800">
                support@vchat.app
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

export default TermsPage;
