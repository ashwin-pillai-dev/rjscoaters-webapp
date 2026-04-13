'use client';
import { Navbar } from 'flowbite-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function DefaultNavbar() {
    const pathname = usePathname();

    return (
        <div className='container mx-auto my-0 no-print'>
            <Navbar fluid={true} rounded={true} >
              <Navbar.Brand href="/" className="flex flex-col items-center">
    {/* The image and text are now stacked vertically and centered */}
    <Image 
        height={500} 
        width={130} 
        className="h-32 max-w-full rounded-lg object-contain" 
        src="/rjs-logo.png" 
        alt="RJS Logo" 
    />
    <b className="mt-1 text-sm leading-none">RJS</b>
</Navbar.Brand>
                <Navbar.Toggle />
                
                <Navbar.Collapse className='text-base'>
                    <Navbar.Link active={pathname == '/'} href="/">
                        <p className={`transition-colors duration-200 text-base ${pathname == "/" ? 'text-[#FF6A00] font-bold' : 'text-gray-900 hover:text-[#FF6A00]'}`}>
                            Home
                        </p>
                    </Navbar.Link>
                    
                    <Navbar.Link href="/About" active={pathname == "/About"}>
                        <p className={`transition-colors duration-200 text-base ${pathname == "/About" ? 'text-[#FF6A00] font-bold' : 'text-gray-900 hover:text-[#FF6A00]'}`}>
                            About us
                        </p>
                    </Navbar.Link>
                    <Navbar.Link href="/services" active={pathname == "/services"}>
                        <p className={`transition-colors duration-200 text-base ${pathname == "/services" ? 'text-[#FF6A00] font-bold' : 'text-gray-900 hover:text-[#FF6A00]'}`}>
                            Services
                        </p>
                    </Navbar.Link>
                    
                    <Navbar.Link active={pathname == "/Blog"} href="/Blog" >
                        <p className={`transition-colors duration-200 text-base ${pathname == "/Blog" ? 'text-[#FF6A00] font-bold' : 'text-gray-900 hover:text-[#FF6A00]'}`}>
                            History
                        </p>
                    </Navbar.Link>
                    
                    <Navbar.Link href="/Contact" active={pathname == "/Contact"}>
                        <p className={`transition-colors duration-200 text-base ${pathname == "/Contact" ? 'text-[#FF6A00] font-bold' : 'text-gray-900 hover:text-[#FF6A00]'}`}>
                            Contact
                        </p>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}