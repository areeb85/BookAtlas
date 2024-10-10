"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../globals.css';

const Navbar = ({ onSearch }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false); // New state to control search visibility on small screens
  
  const pathName = usePathname();

    // Toggle search bar visibility on small screens
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  // Responsive Search Button (shown on small screens)
  const smallScreenSearchButton = (
    <Button
      icon="pi pi-search"
      className="p-button-rounded p-button-text"
      onClick={toggleSearch}
      style={{ color: '#000' }}
      aria-label="Open Search"
    />
  );

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
        onKeyDown={(e) => e.key === 'Enter' && onSearch(searchQuery)}
        placeholder="Search..."
        className='hide-on-small-screen'
      />
      <Button icon="pi pi-search" 
        onClick={(e) => onSearch(searchQuery)} 
        style={{ color: '#000' }}
        />
    </div>
  );




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