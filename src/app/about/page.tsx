import React from 'react';
import Head from 'next/head';
import HeaderMenu from '@/ui/index/Menu';

export default function Page() {
  return (
    <div className="flex flex-col px-4 pt-6">
      <HeaderMenu />
      <header className="bg-gray-800 text-white py-4">
        <h1 className="text-center text-3xl">About Us</h1>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">At SecureRotate, our mission is to provide the highest level of protection with our advanced encryption solutions. Our technology ensures your data and private information are safeguarded seamlessly, 24/7.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-lg">We are a team of dedicated professionals committed to revolutionizing data security. With years of experience and a passion for innovation, we strive to bring the best encryption technology to our users.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg">Our SecureRotate technology features automatic key rotation, ensuring your data is always protected. We offer cutting-edge encryption algorithms and a user-friendly experience to meet all your security needs.</p>
        </section>
      </main>
    </div>
  );
};

