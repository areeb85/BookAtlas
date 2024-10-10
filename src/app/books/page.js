import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../globals.css';

const BooksGrid = ({ books, fetching, totalRecords, onPageChange, first, rows }) => {
  const router = useRouter();
 

  const onBookSelect = (book) => {
    const encodedBookDetails = encodeURIComponent(JSON.stringify(book));
    router.push(`../BookDetails/${book.id}?book=${encodedBookDetails}`);
  };

  const onLazyLoad = (event) => {
    console.log("First value", event.first);
    console.log("Rows value, ", event.rows);
    onPageChange(event);
  };

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
      <DataTable
        value={books}
        selectionMode="single"
        onRowSelect={(e) => onBookSelect(e.data)}
        lazy // Enable lazy loading
        totalRecords={totalRecords} // Set the total records for the
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        rows={rows}
        rowsPerPageOptions={[5, 10, 20]}
        // totalRecords={books.length}
        first={first}
        onPage={onLazyLoad} // Use `onLazyLoad` to handle pagination
        tableStyle={{ minWidth: '600px' }}
        className="animate-fade-in"
        loading={fetching} // Show loading indicator if books are still being fetched
      >
        <Column body={coverTemplate} header="Cover" headerStyle={{ textAlign: 'center', width: '100px' }} bodyStyle={{ textAlign: 'center' }}></Column>
        <Column field="volumeInfo.title" header="Book Title" headerStyle={{ width: 'calc(100% - 100px)' }} bodyStyle={{ cursor: 'pointer' }}></Column>
      </DataTable>
    </div>
  );
};

export default BooksGrid;
