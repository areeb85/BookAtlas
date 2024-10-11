## Book Atlas

BookAtlas is a Next-JS and React based book search and management application that allows users to search for books using the Google Books API, view detailed information about each book, and navigate smoothly between pages without losing the current state. Pagination has been implemented as well which means the data is loaded in batches so as to maintain the User Experience. The application implements client-side caching and a responsive UI/UX design to provide a seamless user experience. Scroll all the way down to preview how the app looks like (youtube link)

### **Features**

- **Book Search**: Search for books by title using the Google Books API.
- **Responsive Grid Layout**: Displays book results in a paginated tabular layout.
- **Book Details Page**: View detailed information about each book in a separate details page.
- **State Management**: Uses local storage to cache search results and pagination states.
- **Seamless Navigation**: Implements smooth navigation between the books grid and the details page without page reloads.
- **Navbar with Conditional Elements**: The Navbar dynamically shows or hides menu items based on the current page.

### **Technologies Used**

- **React** with Next.js
- **PrimeReact** for UI Components
- **Axios** for API requests
- **Local Storage** for state persistence

### **Project Setup**

To get started with the project, follow these steps:

1. **Clone the Repository:**

   ```bash
      git clone <repository-url>
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd bookatlas
   ```

3. **Install Required Dependencies:**

   ```bash
   npm install
   ```

   **Dependencies:**

   - `react`
   - `next`
   - `primereact`
   - `primeicons`
   - `axios`

   Install the libraries using the following command:

   npm install primereact primeicons axios

4. **Create a `.env.local` File:**

   Create a `.env.local` file in the root of your project and add your own Google Books API key:

   NEXT_PUBLIC_API_KEY=YOUR_GOOGLE_BOOKS_API_KEY

   Replace `YOUR_GOOGLE_BOOKS_API_KEY` with your actual API key. You can get an API key from the [Google Cloud Console](https://console.cloud.google.com/).

### **Folder Structure**

```bash
    src/
    ├── app/
    │   ├── components/              # Reusable components like Navbar, BooksGrid, etc.
    │   ├── BookDetails/
    │   │   └── [id]/
    │   │       └── page.js          # Book Details Page for each book
    │   └── books/
    │       └── page.js              # Main Books table Page
    ├── public/
    │   └── assets/                  # Placeholder images and static assets
    ├── styles/
    │   └── globals.css              # Global styles for the application
    ├── .env.local                   # API keys for Google Books API
    └── README.md

```

### **How to Run the Project**

1. **Start the Development Server:**

   npm run dev

2. **Open the Application:**

   Open your browser and navigate to `http://localhost:3000` to view the application.

### **Environment Variables**

- **`NEXT_PUBLIC_API_KEY`**: Google Books API key for fetching book details.

### **Pages**

1. **Home Page:**  
   The main page of the application where users can search for books in the navbar.

2. **Books Grid:**  
   Displays the books in a tabular layout with pagination on the home page.

3. **Book Details Page:**  
   Shows detailed information about a selected book.

## Demo Video

Watch the full demonstration of the BookAtlas app in the video below:

[![Watch the video](https://img.youtube.com/vi/j0C5BGCHbWg/0.jpg)](https://youtu.be/j0C5BGCHbWg)

In this video, you will see how to search, view, and manage books seamlessly in the BookAtlas application.

### **Contact**

For any queries or issues, please reach out to:

- **Name:** Areeb Shahid
- **Email:** areeb@nus.edu.sg
