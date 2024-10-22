'use client'; // Directive to indicate that this component should be rendered on the client-side


import { useSearchParams} from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../BookDetails.module.css';
import Navbar from '@/app/components/Navbar/page';
import { useSession } from 'next-auth/react';
import { Button } from 'primereact/button';
import axios  from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';

/**
 * BookDetails component renders detailed information about a selected book.
 * It extracts the `book` details from the URL query parameter, decodes it, and displays it in a formatted layout.
 */
const BookDetails = () => {
  const searchParams = useSearchParams(); // Hook to retrieve URL query parameters
  const [book, setBook] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false); // Tracks if the book is favorited
  const [loading, setLoading] = useState(false); // Tracks loading state for the button
  const {data : session, status} = useSession();

  /**
   * Effect to parse and set the book details from the `book` query parameter.
   * It runs whenever `searchParams` changes, which typically occurs during navigation or URL updates.
   */
  useEffect(() => {
    const encodedBook = searchParams.get('book'); // Retrieve the `book` query parameter
    if (encodedBook) {
      try {
        const decodedBook = JSON.parse(decodeURIComponent(encodedBook)); // Decode and parse the book object
        setBook(decodedBook);
      } catch (error) {
        console.error('Error parsing book details:', error);
      }
    }
  }, [searchParams]);



  /**
   * Function to handle adding a book to the user's favorites using the Google Books API.
   */
  const handleAddToFavorites = async () => {
    if (!session) {
      console.error('User is not authenticated or book is unavailable.');
      return;
    }

    setLoading(true);

    try {
      const volumeId = book.id;
      // Google Books API request to add the book to the "Favorites" shelf (shelf ID: 0)
      const response = await axios.post(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/addVolume?volumeId=${volumeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`, // Use OAuth access token
          },
        }
      );

      if (response.status === 200) { // 204 No Content means the request was successful
        setIsFavorited(true); // Mark the book as favorited
      } else {
        console.error('Failed to add book to favorites:', response);
      }
    } catch (error) {
      console.error('Error adding book to favorites:', error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };


  if (!book) {
    return (
      <div 
        style={{display : "flex", justifyContent: "center", alignItems: "center", height: '80vh'}}
      >
        <ProgressSpinner/>
      </div>
    )
  };

  return (
    <>
    <Navbar />
    <div 
      className={styles.container}
    >
      
      <div className={styles.bookDetails}>
        
        <div className={styles.coverColumn}>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || '/assets/placeholder.png'}
            alt={book.volumeInfo.title}
            className={styles.coverImage}
          />
        </div>
        
        <div className={styles.infoColumn}>
          <h1 className={styles.bookTitle}>{book.volumeInfo.title}</h1>
          <h3 className={styles.bookAuthor}>By: {book.volumeInfo.authors?.join(', ')}</h3>
          <p className={styles.bookDescription}><strong>Publisher:</strong> {book.volumeInfo.publisher}</p>
          <p className={styles.bookDescription}><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</p>
          <p className={styles.bookDescription}><strong>Page Count:</strong> {book.volumeInfo.pageCount}</p>
          <p className={styles.bookDescription}><strong>Description:</strong> {book.volumeInfo.description || 'No description available'}</p>
        </div>
        {/* Add to Favorites Button */}
        {status === 'authenticated' && (
          <div className={`${styles.fullWidthButton}`}>
            <Button
              label={isFavorited ? 'Added to Favorites' : 'Add to Favorites'}
              icon={isFavorited ? 'pi pi-check' : 'pi pi-heart'}
              className={`p-button-${isFavorited ? 'success' : 'primary'}`}
              style={{width: "100%"}}
              onClick={handleAddToFavorites}
              disabled={isFavorited || loading}
              loading={loading}
            />
          </div>
          
        )}
        
      </div>
    </div>
    </>
  );
};

export default BookDetails;
