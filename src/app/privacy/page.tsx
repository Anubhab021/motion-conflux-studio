import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata(
  "Privacy Policy",
  "Privacy policy for Motion Conflux Studio website.",
  "/privacy"
);

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fill out our contact form</li>
            <li>Subscribe to our newsletter</li>
            <li>Communicate with us</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Respond to your inquiries</li>
            <li>Improve our services</li>
            <li>Send you updates about our work</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:hello@motion-conflux-studio.com" className="text-blue-600 hover:underline">
              hello@motion-conflux-studio.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
