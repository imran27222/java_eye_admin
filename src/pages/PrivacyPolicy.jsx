import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-500">Privacy Policy</h1>
          <p className="text-gray-300 mt-4 text-lg">Protecting your privacy is our priority. Please review our privacy policy to understand how we collect, use, and safeguard your information.</p>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">Information Collection</h2>
            <p className="text-lg text-gray-300">We collect personal information such as your name, email address, and other details when you register on our website. This data helps us provide you with better services and ensure smooth interactions on our platform.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">How We Use Your Information</h2>
            <p className="text-lg text-gray-300">
              The information we collect is used to improve our services, send notifications, respond to customer service requests, and personalize your experience with GFT TREASURE. We will never share or sell your personal data to third parties without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">Data Security</h2>
            <p className="text-lg text-gray-300">We implement a variety of security measures to maintain the safety of your personal information. Our website uses secure encryption protocols to protect data during transmission.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">Cookies</h2>
            <p className="text-lg text-gray-300">We use cookies to enhance your user experience and collect data to improve our website's functionality. You can choose to disable cookies through your browser settings, but this may affect your experience on our site.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-pink-500 mb-4">Your Consent</h2>
            <p className="text-lg text-gray-300">By using our website, you consent to the collection and use of your personal data as described in this Privacy Policy. If you do not agree with our policy, please refrain from using our website.</p>
          </section>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-pink-500 mb-4">Contact Us</h3>
          <p className="text-lg text-gray-300">
            If you have any questions or concerns about this privacy policy, feel free to contact us at <span className="text-pink-500">support@gfttreasure.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
