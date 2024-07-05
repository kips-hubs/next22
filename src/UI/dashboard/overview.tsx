import React from 'react';
import Link from 'next/link';
import { LockClosedIcon, ArrowRightIcon, KeyIcon, ShieldCheckIcon, BookOpenIcon } from '@heroicons/react/24/outline';

interface AlgorithmData {
    shortName: string;
    name: string;
    keyBits: string;
    securityLevel: string;
}

interface CardEncProps {
    algorithms: AlgorithmData[];
}

const CardEnc: React.FC<CardEncProps> = ({ algorithms }) => {
    return (
        <>
            {algorithms.map((algo, index) => (
                <Link key={index} href={`#${algo.shortName}`}>
                    <div className='cursor-pointer border-solid border-2 rounded-2xl border-slate-600 hover:border-slate-400 mb-10 px-5 py-4 text-gray-700 ease-linear duration-200'>
                        <div className='flex justify-between border-solid border-b-[1px] pb-3 border-slate-700 '>
                            <LockClosedIcon className='w-6 h-6' />
                            <div className='inline font-bold text-xl pl-3 border-solid border-l-[1px] border-slate-700 align-middle'>
                                {algo.shortName}
                            </div>
                            <ArrowRightIcon className='w-6 h-6' />
                        </div>
                        <div className='my-3 font-semibold text-center'>
                            {algo.name}
                        </div>
                        <div className='font-semibold'>
                            <div className='mb-2 flex justify-between'>
                                <KeyIcon className='w-6 h-6' />
                                <span className='align-middle'>
                                    {algo.keyBits}
                                </span>
                            </div>
                            <div className='mb-2 flex justify-between'>
                                <ShieldCheckIcon className='w-6 h-6' />
                                <span className='align-middle'>
                                    {algo.securityLevel}
                                </span>
                            </div>
                            <div className='mb-2 flex justify-between'>
                                <BookOpenIcon className='w-6 h-6 ' />
                                <span className='align-middle'>Asymmetric</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default CardEnc;