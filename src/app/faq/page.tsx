import React from 'react';
import Head from 'next/head';

export default function Page() {
  return (
    <div>
      <Head>
        <title>FAQ - SecureRotate</title>
      </Head>
      <header className="bg-gray-800 text-white py-4">
        <h1 className="text-center text-3xl">Frequently Asked Questions</h1>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What is SecureRotate?</h2>
          <p className="text-lg">SecureRotate is an advanced encryption solution that features automatic 24/7 key rotation to safeguard your data and private information.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How does the 24/7 key rotation work?</h2>
          <p className="text-lg">Our technology ensures that encryption keys are rotated automatically and continuously, providing an extra layer of security for your data.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How can I sign up for a demo session?</h2>
          <p className="text-lg">You can sign up for a free demo session by clicking the "Sign Up Now" button on our homepage and filling out the registration form.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Who can I contact for support?</h2>
          <p className="text-lg">If you need any support, please visit our Contact Us page and fill out the contact form, or email us at support@securerotate.com.</p>
        </section>
      </main>
    </div>
  );
};

