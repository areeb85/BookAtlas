import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../globals.css';


/**
 * BooksGrid component displays a list of books in a data table format.
 * Handles lazy loading, pagination, and navigation to book details page.
 * 
 * @param {Array} books - List of book objects to display in the table
 * @param {boolean} fetching - Boolean flag to show/hide loading spinner
 * @param {number} totalRecords - Total number of books matching the current search query
 * @param {function} onPageChange - Callback function to handle page changes
 * @param {number} first - Current index of the first row in the displayed page
 * @param {number} rows - Number of rows to display per page
 */

const BooksGrid = ({ books, fetching, totalRecords, onPageChange, first, rows }) => {
  const router = useRouter();
 
  /**
   * Function to handle book selection from the table.
   * Encodes the selected book details and navigates to the `BookDetails` page with the BookDetails page dynamically generated.
   * @param {Object} book - The selected book object
   */
  const onBookSelect = (book) => {
    const encodedBookDetails = encodeURIComponent(JSON.stringify(book));
    router.push(`../BookDetails/${book.id}?book=${encodedBookDetails}`);
  };

  /**
   * Function to handle lazy loading and pagination events from the DataTable.
   * Calls the `onPageChange` function with the event data.
   * @param {Object} event - The pagination event containing `first` and `rows`
   */
  const onLazyLoad = (event) => {
    onPageChange(event);
  };


  /**
   * Custom template function for rendering book cover images in the table.
   * Uses a placeholder image if no thumbnail is available.
   * @param {Object} book - The book object containing `volumeInfo` data
   * @returns JSX element representing the book cover image
   */
  const coverTemplate = (book) => {
    return (
      <img
        src={book.volumeInfo.imageLinks?.thumbnail || '/assets/placeholder.png'}
        alt={book.volumeInfo.title}
        style={{ width: '70px', height: '75px' }}
      />
    );
  };


  return (
    <div className="animate-fade-in" style={{ marginTop: '10px', padding: '0 2rem' }}>
      {/* PrimeReact DataTable component for displaying book data */}
      <DataTable
        value={books}
        selectionMode="single"
        onRowSelect={(e) => onBookSelect(e.data)}
        lazy // Enable lazy loading
        totalRecords={totalRecords} 
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        rows={rows}
        rowsPerPageOptions={[5, 10, 20]}
        first={first}
        onPage={onLazyLoad} 
        tableStyle={{ minWidth: '600px' }}
        className="animate-fade-in"
        loading={fetching} 
      >
        <Column body={coverTemplate} header="Cover" headerStyle={{ textAlign: 'center', width: '100px' }} bodyStyle={{ textAlign: 'center' }}></Column>
        <Column field="volumeInfo.title" header="Book Title" headerStyle={{ width: 'calc(100% - 100px)' }} bodyStyle={{ cursor: 'pointer' }}></Column>
      </DataTable>
    </div>
  );
};

export default BooksGrid;
