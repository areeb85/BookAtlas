"use client"; // Directive indicating that this component should be rendered on the client-side

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



/**
 * Navbar component that displays a navigation bar with a search input.
 * It accepts `onSearch` as a prop, which is a callback function provided by the 
 * parent component (in this case, the main `App` page in the root directory).
 * This callback is used to handle search functionality when the search button is clicked or 'Enter' is pressed.
 */
const Navbar = ({ onSearch }) => {
  const router = useRouter(); // Hook for navigation actions
  const [searchQuery, setSearchQuery] = useState(''); // State for storing the current search query

  const pathName = usePathname(); // Get the current pathname of the route

  // Define an array to hold menu items
  const itemsMenu = [];
  // Conditionally add 'Home' button to the menu if not on the home page
  if (pathName !== '/') { 
    itemsMenu.push({
      label: 'Home', 
      icon: 'pi pi-home', 
      command: () => router.push('/'), // Command to navigate to the home page
    });
  }

  // Define the left section of the menu, which acts as a clickable title
  const start = (
    <span
      style={{
        cursor: 'pointer', // Cursor changes to a pointer to indicate clickable element
        fontWeight: 'bold',
        color: '#000',
        fontSize: '1.5rem',
      }}
      onClick={() => router.push('/')} 
    >
      BookAtlas
    </span>
  );

  // Define the right section of the menu, which contains the search input and button
  const end = (
    <div 
      className="p-inputgroup" 
    >
      <InputText
        value={searchQuery} // Value of the input field bound to the `searchQuery` state
        onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
        onKeyDown={(e) => e.key === 'Enter' && onSearch(searchQuery)} // Trigger search when 'Enter' is pressed
        placeholder="Search..." 
      />
      <Button 
        icon="pi pi-search" 
        onClick={(e) => onSearch(searchQuery)} // Trigger search on button click 
        style={{ color: '#000' }} 
      />
    </div>
  );

  return (
    <div 
      style={{ paddingLeft: '2rem', margin: '0', marginRight: '2rem' }} 
      className='animate-fade-in' // Custom class for animation
    >
      <Menubar model={itemsMenu} start={start} end={end}/> {/* PrimeReact Menubar component */}
    </div>
  );
};

export default Navbar;
