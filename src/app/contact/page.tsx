import React from 'react';
import Head from 'next/head';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Contact Us - SecureRotate</title>
      </Head>
      <header className="bg-gray-800 text-white py-4">
        <h1 className="text-center text-3xl">Contact Us</h1>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-4">If you have any questions or need further information, please don't hesitate to contact us.</p>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg">Name:</label>
              <input type="text" id="name" name="name" required className="w-full p-2 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-lg">Email:</label>
              <input type="email" id="email" name="email" required className="w-full p-2 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label htmlFor="message" className="block text-lg">Message:</label>
              <textarea id="message" name="message" required className="w-full p-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
};

