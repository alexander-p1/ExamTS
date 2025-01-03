import { Book } from "./json.ts";

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



