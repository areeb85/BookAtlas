"use client";

import Navbar from "./components/Navbar";

import BooksGrid from "./books/page";
import { ProgressSpinner } from 'primereact/progressspinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useState, useEffect } from "react";
import axios, { all } from "axios";
import { InputText } from "primereact/inputtext";



const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [allRecordsFetched, setAllRecordsFetched] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [pagesCache, setPagesCache] = useState({});


  useEffect(() => {
    const cachedBooks = localStorage.getItem('books');
    const cachedQuery = localStorage.getItem('currentQuery');
    const cachedPagesCache = localStorage.getItem('pagesCache');
    const cachedTotalRecords = localStorage.getItem('totalRecords');

    // Restore cached data if available
    if (cachedBooks && cachedQuery && cachedPagesCache && cachedTotalRecords) {
      console.log("Cache", cachedPagesCache);
      setBooks(JSON.parse(cachedBooks));
      setCurrentQuery(cachedQuery);
      setPagesCache(JSON.parse(cachedPagesCache));
      setTotalRecords(Number(cachedTotalRecords));
    }
  }, []);

  // 2. Save to cache whenever books, pagesCache, or currentQuery changes
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('books', JSON.stringify(books));
      localStorage.setItem('currentQuery', currentQuery);
      localStorage.setItem('pagesCache', JSON.stringify(pagesCache));
      localStorage.setItem('totalRecords', totalRecords.toString());
    }
  }, [books, currentQuery, pagesCache, totalRecords]);

  

  const handleSearchResults = async (searchQuery) => {
    if (searchQuery !== currentQuery) {
      setPagesCache({});
    }

    setBooks([]); // Clear any previous search results
    setLoading(true); // Show spinner before the API call starts
    setAllRecordsFetched(false); // Reset the state for new search
    setCurrentQuery(searchQuery); // Save the current search query
    setFirst(0);

    try {
      // Start fetching books in batches
      const response = await fetchBooks(searchQuery, 0, rows);
      setBooks(response.items || []);
      setTotalRecords(response.totalItems || 0);

      setPagesCache((prevCache) => 
        ({ ...prevCache, 0: response.items || [] 
      }));

      if (response.items && response.items.length >= response.totalItems) {
        setAllRecordsFetched(true); // Set the flag when all records are fetched
      }

    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false); 
    }
  };


  const handlePageChange = async (event) => {
    const { first, rows } = event; // Get pagination parameters from the event
    

    setFirst(first); // Set the current page index
    setRows(rows); // Set the number of rows per page

    if (pagesCache[first]) {
      setBooks(pagesCache[first]);
      return;
    }

    setLoading(true); // Show loading spinner when fetching new page
    try {
      // Use the stored `currentQuery` for subsequent page changes
      const response = await fetchBooks(currentQuery, first, rows);
      console.log("Response for Pagination:", response);

      const newBooks = response.items || []
      setBooks(newBooks); // Update the books state with the new page's data

      setPagesCache((prevCache) => ({
        ...prevCache,
        [first] : newBooks,
      }));

    } catch (error) {
      console.error("Error fetching books for page change:", error);
    } finally {
      setLoading(false); // Hide spinner after the fetch is complete
    }
  };


  const fetchBooks = async (query, startIndex, rows) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&startIndex=${startIndex}&maxResults=${rows}&key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    console.log("response, ", response.data);
    return response.data;
  };


  return (
    <div className="animate-fade-in">
      <Navbar onSearch={handleSearchResults} />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <ProgressSpinner />
        </div>
      ) : books.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
          {/* PrimeReact Search Icon */}
          <i className="pi pi-search search-icon bounce" style={{ fontSize: '4rem', color: '#6366F1' }}></i>
          <span style={{ marginTop: '1rem', fontWeight: 'normal' }}>Start searching using the search bar above</span>
        </div>
      ) : (
        <div className="animate-fade-in">
          <BooksGrid 
            books={books} 
            fetching={loading}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            first = {first}
            rows={rows}
          />
        </div>
      )}
    </div>
  );
};

export default App;