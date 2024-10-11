'use client'; // Directive to indicate that this component should be rendered on the client-side


import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../BookDetails.module.css';
import Navbar from '@/app/components/Navbar';


/**
 * BookDetails component renders detailed information about a selected book.
 * It extracts the `book` details from the URL query parameter, decodes it, and displays it in a formatted layout.
 */
const BookDetails = () => {
  const searchParams = useSearchParams(); // Hook to retrieve URL query parameters
  const [book, setBook] = useState(null);


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

  if (!book) return <div>Loading book details...</div>;

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
      </div>
    </div>
    </>
  );
};

export default BookDetails;
