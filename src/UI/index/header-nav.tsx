'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';
const Links = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
];

export default function HeaderLinks() {
    const pathname = usePathname();
    return (
        <>
            {
                // mapping the links from the links list
                Links.map((link) => {
                    return (
                        <Link key={link.name}
                            href={link.href}
                            className={clsx('hover-underline',
                                { 'text-blue-500': pathname === link.href }
                            )} >
                            {link.name}
                        </Link>
                    );
                })
            }
        </>
    )
}