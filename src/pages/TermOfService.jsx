import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-500">Terms of Service</h1>
          <p className="text-gray-300 mt-4 text-lg">Please read our terms and conditions carefully before using GFTTREASURE services.</p>
        </div>

        {/* Terms of Service Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">Acceptance of Terms</h2>
            <p className="text-lg text-gray-300">By accessing or using GFTTREASURE, you agree to comply with and be bound by these Terms of Service. If you do not agree with these terms, please refrain from using our services.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">Use of Services</h2>
            <p className="text-lg text-gray-300">You are granted a limited, non-transferable license to use GFTTREASURE's services, subject to these terms. You may not misuse our platform or use it for illegal activities.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">Account Responsibility</h2>
            <p className="text-lg text-gray-300">You are responsible for maintaining the confidentiality of your account information and all activities under your account. Notify us immediately if you suspect unauthorized access to your account.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">Limitation of Liability</h2>
            <p className="text-lg text-gray-300">GFTTREASURE is not liable for any direct, indirect, incidental, or consequential damages arising from your use or inability to use our services.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">Changes to Terms</h2>
            <p className="text-lg text-gray-300">We may update these Terms of Service at any time. The updated terms will be posted on our website. By continuing to use the services after the changes, you accept the updated terms.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">Governing Law</h2>
            <p className="text-lg text-gray-300">These terms are governed by the laws of the jurisdiction in which GFTTREASURE operates. Any disputes will be resolved in the appropriate courts of that jurisdiction.</p>
          </section>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-pink-500 mb-4">Contact Us</h3>
          <p className="text-lg text-gray-300">
            If you have any questions about these Terms of Service, please contact us at <span className="text-pink-500">support@gfttreasure.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
