"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import axios from 'axios';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const Navbar = ({ onSearch }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const pathName = usePathname();

  const itemsMenu = []

  if (pathName !== '/') { // Only show the 'Home' button if not on the home page
    itemsMenu.push({
      label: 'Home',
      icon: 'pi pi-home',
      command: () => router.push('/'),
    });
  }

  const start = (
    <span
      style={{
        cursor: 'pointer',
        fontWeight: 'bold',
        color: '#000',
        fontSize: '1.5rem',
      }}
      onClick={() => router.push('/')}
    >
      BookAtlas
    </span>
  );

  const end = (
    <div 
        className="p-inputgroup" 
    >
      <InputText
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
      <Button icon="pi pi-search" onClick={(e) => onSearch(searchQuery)} style={{ color: '#000' }}/>
    </div>
  );

//   if (onSearch === undefined) {
//     return (
//       <div 
//           style={{ paddingLeft: '2rem', margin: '0', marginRight : "2rem" }}
//           className='animate-fade-in'
//       >
//         <Menubar start={start}/>
//       </div>
//     );
//   }

  return (
    <div 
        style={{ paddingLeft: '2rem', margin: '0', marginRight : "2rem" }}
        className='animate-fade-in'
    >
      <Menubar model={itemsMenu} start={start} end={end}/>
    </div>
  );
};



export default Navbar;