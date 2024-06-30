'use client'
import Image from 'next/image';
import React from 'react';
import "./globals.css";
import { lusitana, modern } from '@/UI/fonts/fonts';


export default function Page() {
  return (
    <div className="flex flex-col px-4 pt-6">
      <main className="mt-4 flex flex-col grow gap-4 md:flex-row px-12">
        <section className="flex flex-col justify-center gap-6 p-6 bg-blue-50 md:w-1/2">
          <h1 className={`${lusitana.className} text-4xl font-bold`}>Revolutionize Your Data Security</h1>
          <p className="text-lg">
            Ensure the highest level of protection with our advanced encryption solutions. Our <span className="font-semibold text-blue-500 text-xl">SecureRotate</span> technology, featuring automatic 24/7 key rotation, safeguards your data and private information seamlessly. Sign up today to experience our cutting-edge encryption algorithm and receive a FREE DEMO SESSION!
          </p>

          <div className="flex space-x-4 mb-8">
            <button className="bg-black text-white py-2 px-6 rounded">Sign Up Now</button>
            <button className="bg-gray-200 text-black py-2 px-6 rounded">Learn More</button>
          </div>

          <div className="flex flex-wrap justify-center items-center space-x-6">
            <Image src="/members/emma.png" alt="Member 1" width={48} height={48} className="h-12 w-12 rounded-3xl" />
            <Image src="/members/dan.png" alt="Member 2" width={48} height={48} className="h-12 w-12 rounded-3xl" />
            <Image src="/members/quin.png" alt="Member 3" width={48} height={48} className="h-12 w-12 rounded-3xl" />
            <Image src="/members/robert.png" alt="Member 4" width={48} height={48} className="h-12 w-12 rounded-3xl" />
          </div>
        </section>

        <section className="hidden md:flex justify-center items-center md:w-1/2 p-6">
          <Image src="/pad.png" alt="Security Image" width={600} height={800} className="object-cover" />
        </section>
      </main>
    </div>
  );
}
