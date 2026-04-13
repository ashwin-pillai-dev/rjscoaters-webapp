'use client';

import { Footer } from 'flowbite-react';

export default function DefaultFooter() {
  return (
    <Footer container className='mx-auto my-0' >
      <Footer.Copyright
        by="Ayurarogyam"
        href="#"
        year={2022}
      />
      <Footer.LinkGroup>
        <Footer.Link href="/About">
          About
        </Footer.Link>
        <Footer.Link href="#">
          Privacy Policy
        </Footer.Link>
        <Footer.Link href="#">
          Licensing
        </Footer.Link>
        <Footer.Link href="/Contact">
          Contact
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  )
}


