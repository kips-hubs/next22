'use client'
import Image from 'next/image';
import React from 'react';
import "./globals.css";
import { lusitana } from '@/ui/fonts/fonts';
import HeaderLinks from '@/ui/index/header-nav';
import SRLogo from '@/ui/logo/SRLogo';
import Link from 'next/link';


export default function Page() {
  return (
    <main className='flex min-h-screen flex-col p-6'>

      <div className="flex flex-col px-4 pt-6">
        <div className="flex shadow-md p-4">
          <div className="flex items-center">
            <div className="ml-16 md:block hidden"><SRLogo /></div>
          </div>
          <div className="flex-grow flex justify-end items-end py-4 px-12">
            <nav className="mr-8">
              <ul className="flex space-x-4">
                <HeaderLinks />
              </ul>
            </nav>
            <div className="mr-8">
              <Link className="bg-black text-white py-2 px-4 rounded" href={'/auth/signin'}>Log in</Link>
            </div> 
          </div>
        </div>

        <div className="mt-4 flex flex-col grow gap-4 md:flex-row px-12">
          
          <section className="flex flex-col justify-center gap-6 p-6 bg-blue-50 md:w-1/2">
            <h1 className={`${lusitana.className} text-4xl font-bold`}>Revolutionize Your Data Security</h1>
            <p className="text-lg">
              Ensure the highest level of protection with our advanced encryption solutions. Our <span className="font-semibold text-blue-500 text-xl">SecureRotate</span> technology, featuring automatic 24/7 key rotation, safeguards your data and private information seamlessly. Sign up today to experience our cutting-edge encryption algorithm and receive a FREE DEMO SESSION!
            </p>

            <div className="flex space-x-4 mb-8">
              <Link className="bg-black text-white py-2 px-6 rounded" href={'/auth/register'}>Sign Up</Link>
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
            <Image src="/pad.png" alt="Security Image" width={1000} height={600} className="object-cover" />
          </section>
        </div>
      </div>
    </main>

  );
}
