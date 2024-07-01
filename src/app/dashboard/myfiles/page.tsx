import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

async function fetchBooks() {
  const res = await fetch('http://localhost:3000/api/books');
  if (!res.ok) {
      throw new Error('Failed to fetch books');
  }
  return res.json();
}

export default async function Home() {
  try {
      const data = await fetchBooks();
      const books = data.works;

      return (
          <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Books</h1>
              <ul className="list-disc pl-6 space-y-2">
                  {books.map((book: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
                      <li key={book.id} className="text-lg">
                          {book.name}
                      </li>
                  ))}
              </ul>
          </div>
      );
  } catch (error) {
      console.error('Error:', error);
      return <div className="p-6 text-red-500">Error loading books</div>;
  }
}