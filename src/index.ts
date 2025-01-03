// import { Book } from "../json";
interface Book {
    id:        number;
    title:     string;
    author:    string;
    publisher: string;
    year:      number;
    pages:     number | null;
    plot:      string;
    audience:  string;
    color:     string;
}

const baseURL: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';

const fetchData = async (): Promise<Book[]> => {
    try {
        const response = await fetch(`${baseURL}`);

        if (!response.ok) {
            throw new Error (`Error: ${response.status}`);
        }

        const books: Book [] = await response.json();
        console.log(books);
        return books;
        
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return[];
    }
}
fetchData();





