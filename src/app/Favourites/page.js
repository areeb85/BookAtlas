"use client"; // Directive indicating that this component should be rendered on the client-side

import Navbar from "../components/Navbar/page";
import BooksGrid from "../Books/page";
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from 'next-auth/react'; // To get the OAuth token

const Favorites = () => {
  const [books, setBooks] = useState([]); // Stores the list of favorite books
  const [loading, setLoading] = useState(false); // Tracks whether the API call is in progress
  const { data: session, status } = useSession(); // Get session data and status
  const [totalRecords, setTotalRecords] = useState(0); // Total number of records
  const [first, setFirst] = useState(0); // The first record index
  const [rows, setRows] = useState(5); // Number of records per page
  const [pagesCache, setPagesCache] = useState({}); // Cache for storing paginated data

  // Function to load cache from local storage
  const loadDataFromLocalStorage = () => {
    const cachedPages = localStorage.getItem('favoriteBooksCache');
    const fetchedRecords = window.localStorage.getItem("totalRecords");
    if (cachedPages) {
      setPagesCache(JSON.parse(cachedPages));
    }
    if (fetchedRecords) {
      setTotalRecords(fetchedRecords);
    }
  };

  // Function to store cache in local storage
  const saveCacheToLocalStorage = (newCache) => {
    localStorage.setItem('favoriteBooksCache', JSON.stringify(newCache));
  };

  const saveTotalRecordsToLocalStorage = (totalRecords) => { 
    window.localStorage.setItem("totalRecords", totalRecords);
  }

  // Load data from local storage when the component mounts
  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  // Load first page data when the pages cache is available.
  useEffect(() => {
    // Fetch the first page of favorite books when the session is available
    if (status === 'authenticated' && session.accessToken) {
      if (pagesCache[first]) {
        // If the first page is already cached, use it
        setBooks(pagesCache[first]);
      } else {
        // Otherwise, fetch the first page
        fetchFavoriteBooks(first, rows);
      }
    }
  }, [session, status, pagesCache]);

  // Function to fetch favorite books for a specific page
  const fetchFavoriteBooks = async (startIndex, maxResults) => {
    if (!session || !session.accessToken) {
      console.error('User is not authenticated.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/volumes?startIndex=${startIndex}&maxResults=${maxResults}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`, // Use OAuth access token
          },
        }
      );

      const fetchedBooks = response.data.items || [];
      setBooks(fetchedBooks);
      setTotalRecords(response.data.totalItems || 0); // Set total record count
      saveTotalRecordsToLocalStorage(response.data.totalItems || 0); // Save total record count to local storage
      setPagesCache((prevCache) => {
        const updatedCache = { ...prevCache, [startIndex]: fetchedBooks };
        saveCacheToLocalStorage(updatedCache); // Save updated cache to local storage
        return updatedCache;
      });
    } catch (error) {
      console.error('Error fetching favorite books:', error);
    } finally {
      setLoading(false);
    }
  };

  


  /**
   * Handles page change events for the BooksGrid component.
   * Fetches books for the requested page and updates the state accordingly.
   * @param {Object} event - Event object containing `first` and `rows` for pagination.
   */
  const handlePageChange = (event) => {
    const { first, rows } = event; // Get pagination parameters

    setFirst(first); // Set the current page index
    setRows(rows); // Set the number of rows per page

    // If the data for this page is cached, use it
    if (pagesCache[first]) {
      setBooks(pagesCache[first]);
      return;
    }

    // If no cached data, fetch the books from the API
    fetchFavoriteBooks(first, rows);
  };


  return (
    <div className="animate-fade-in">
      <Navbar />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <ProgressSpinner />
        </div>
      ) : books.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
          <i className="pi pi-heart search-icon bounce" style={{ fontSize: '4rem', color: '#FF6347' }}></i>
          <span style={{ marginTop: '1rem', fontWeight: 'normal' }}>No favorite books found.</span>
        </div>
      ) : (
        <div className="animate-fade-in">
          <BooksGrid 
            books={books} 
            fetching={loading}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            first={first}
            rows={rows}
          />
        </div>
      )}
    </div>
  );
};

export default Favorites;
