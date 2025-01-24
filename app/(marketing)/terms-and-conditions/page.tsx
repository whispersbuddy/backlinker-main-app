import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for Backlinker AI",
}

export default function TermsAndConditions() {
  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
      <p>Welcome to Backlinker AI! These Terms and Conditions (&quot;Terms&quot;) govern your use of our website and services. By accessing or using our website, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.</p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-4">2. Services</h2>
      <p>Backlinker AI provides digital PR and link-building services designed to enhance online visibility and authority. The specific details of our services will be outlined in individual contracts or agreements with our clients.</p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-4">3. Use of Our Website</h2>
      <p>You agree to use our website in accordance with these Terms and applicable laws and regulations. You must not:</p>
      <ul className="list-disc pl-6 mt-2">
        <li>Use our website in any way that causes, or may cause, damage to the website or impair its availability or accessibility.</li>
        <li>Use our website to engage in any unlawful, fraudulent, or harmful activity.</li>
        <li>Use our website to copy, store, host, transmit, send, use, publish, or distribute any material that consists of (or is linked to) any spyware, virus, worm, or other malicious software.</li>
      </ul>
      <p>We reserve the right to restrict access to areas of our website or the entire website at our discretion.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">4. Intellectual Property Rights</h2>
      <p>Unless otherwise stated, Backlinker AI owns the intellectual property rights in the website and its content. All these intellectual property rights are reserved. You may view, download, and print content from our website for your personal use, subject to the restrictions set out in these Terms.</p>
      <p>You must not:</p>
      <ul className="list-disc pl-6 mt-2">
        <li>Republish material from our website (including on another website).</li>
        <li>Sell, rent, or sub-license material from our website.</li>
        <li>Reproduce, duplicate, copy, or otherwise exploit material on our website for a commercial purpose.</li>
        <li>Edit or otherwise modify any material on our website.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">5. Limitation of Liability</h2>
      <p>While we strive to ensure that the information on our website is accurate and up-to-date, we do not warrant its completeness or accuracy. We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of, or inability to use, our website or services.</p>
      <p>By using Backlinker AI, you agree that we can pitch to reporters and publications on your behalf with AI Generated Quotes. These quotes will try to represent your business but please be advised that AI can hallucinate and make false claims about your business that are untrue.</p>
      <p>These quotes published in articles & magazines are not meant to be defamatory and we aren&apos;t liable for libel or slander. If you are unsatisfied with the quotes, please reach out to our team and we will promptly take action to reach out to the publication for a prompt takedown of your quote.</p>
      <p>We are not able to guarantee any quotes will be taken down once they are published on a 3rd party website. We will strive to not publish incorrect information about your business, however this is a result of letting a 3rd party do outreach on your behalf. If your name or business name is incorrectly spelled, please reach out to us and we can try to resolve the issue with the correct spelling.</p>
      <p>By agreeing to our service, you are inherently taking some risk that information published about your business may be inaccurate or misleading. We will try to avoid sensitive subjects and topics as a measure to ensure we don&apos;t misrepresent your business. Our total liability to you for any claim arising from or related to these Terms or our services shall be limited to the amount you paid us for those services.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">6. Third-Party Links</h2>
      <p>Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of these sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">7. Termination</h2>
      <p>We may terminate your access to our website or services at any time, without notice, for conduct that we believe violates these Terms or is harmful to our business interests, or for any other reason.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">8. Governing Law</h2>
      <p>These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from or relating to these Terms or your use of our website or services shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">9. Changes to These Terms</h2>
      <p>We may update these Terms from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page with an updated effective date. Your continued use of our website or services following the posting of changes constitutes your acceptance of those changes.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">10. Fulfillment Policies for Backlinker AI</h2>
      <p>At Backlinker AI, we aim to provide transparent and reliable service. Our fulfillment policies ensure a smooth experience for our clients:</p>
      <ul className="list-disc pl-6 mt-2">
        <li><strong>Pitching Policy:</strong> You can expect us to pitch to reporters via featured.com on your behalf using AI-generated quotes. We will send roughly 75-100+ pitches per month depending on the demand for your niche.</li>
        <li><strong>Refund Policy:</strong> Refunds are available under specific conditions, such as if services are not delivered as agreed. Contact us for eligibility.</li>
        <li><strong>Credit Policy:</strong> If you are unsatisfied will do a full credit on your account for any personas where we got less than 3+ DR 30+ backlinks. For clients who got 1-2 links, we will still be able to do a partial refund if necessary.</li>
        <li><strong>Delivery Policy:</strong> Our services are delivered digitally within the agreed timeframe, typically within the timeframe of the subscription. Regardless of the date you signed up, we will plan to send a report within the first 5 days of the new month. Every month, we will send out a custom report to you that details how many pitches we sent, what backlinks you got, and what quotes were selected to be written about but are not published yet.</li>
        <li><strong>Cancellation Policy:</strong> Clients can cancel ongoing services at any point. If a subscription is cancelled, the deliverables for that paid month will still be carried out. The plan will auto-renew every month on the same day you signed up. Reach out to the team if you need any help cancelling bennett @ backlinker.ai. We would like that you add a reason to help us understand why you are cancelling.</li>
      </ul>
      <p>Feel free to reach out for any clarification or support.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
      <p>If you have any questions or concerns about these Terms, please contact us at: Bennett @ Backlinker.AI</p>

      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  )
}