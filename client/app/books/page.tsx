"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBorrow = async (bookId: string) => {
    if (!user) return;
    try {
      await api.post(`/books/${bookId}/borrow`, { userId: user._id });
      fetchBooks();
      alert('Book borrowed successfully!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to borrow');
    }
  };

  const handleReturn = async (bookId: string) => {
    try {
      await api.post(`/books/${bookId}/return`);
      fetchBooks();
      alert('Book returned successfully!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to return');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Library Books</h1>
        {/* Admin or special user could add books here */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book: any) => (
          <div key={book._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-600 mb-4">by {book.author}</p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm ${book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {book.status}
              </div>
              {book.borrowedBy && (
                 <div className="mt-2 text-sm text-gray-500">
                    <p>Borrowed by: {book.borrowedBy.username}</p>
                    {book.dueDate && (
                      <p className={`font-medium ${new Date(book.dueDate) < new Date() ? 'text-red-600' : 'text-blue-600'}`}>
                        {(() => {
                          const due = new Date(book.dueDate);
                          const now = new Date();
                          const diffMs = due.getTime() - now.getTime();
                          
                          if (diffMs < 0) {
                            const daysOverdue = Math.ceil(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
                            const fine = daysOverdue * 5; // $5 per day
                            return `Overdue! Fine: $${fine}`;
                          }
                          
                          const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                          const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                          
                          return `Time Left: ${days}d ${hours}h`;
                        })()}
                      </p>
                    )}
                 </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
               {book.status === 'Available' ? (
                 <button 
                   onClick={() => handleBorrow(book._id)}
                   className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                 >
                   Borrow Book
                 </button>
               ) : (
                 book.borrowedBy?._id === user?._id && (
                   <button 
                     onClick={() => handleReturn(book._id)}
                     className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                   >
                     Return Book
                   </button>
                 )
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
