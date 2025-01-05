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

/* Förger för alla böcker */
const bookColor: string [] = [
    'background: linear-gradient(to right, #83a4d4, #b6fbff)',
    'background: linear-gradient(to right, #FDFC47, #24FE41)',
    'background: linear-gradient(to right, #70e1f5, #ffd194)',
    'background: linear-gradient(to right, #556270, #FF6B6B)',
    'background: linear-gradient(to right, #9D50BB, #6E48AA)',
    'background: linear-gradient(to right, #FF4E50, #F9D423)',
    'background: linear-gradient(to right, #B3FFAB, #12FFF7)',
    'background: linear-gradient(to right, #F0C27B, #4B1248)'
]
const currentBook = document.querySelector('.current-book') as HTMLElement;

const baseURL: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';

/* Variabel för att lagra böckerna */
let booksData: Book[] = [];

/* Hämta all bokdata och spara den */
const fetchData = async (): Promise<void> => {
    try {
        const response = await fetch(`${baseURL}`);

        if (!response.ok) {
            throw new Error (`Error: ${response.status}`);
        }

        const data: Book[] = await response.json(); 
        booksData = data;
        
        /* Koppla klickhändelser */
        bookClickEvents();
        
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

/* Funktion för att lyssna på klickhändelser på alla böcker */
const bookClickEvents = (): void => {
    const books = document.querySelectorAll('.book');

    books.forEach(book => {
        book.addEventListener('click', (event) => {
            const target = event.currentTarget as HTMLElement;
            const bookId = parseInt(target.id.replace('book-', '')); 

            const selectedBook = booksData.find(book => book.id === bookId);
            /* Uppdaterar min overlay */
            if (selectedBook) {
                updateOverlay(selectedBook); 
            }
        })
    })
}

const updateOverlay = (book: Book): void => {
    const overlayTitle = document.querySelector('.overlay-content .book-title h1') as HTMLHeadingElement;
    const overlayAuthor = document.querySelector('.overlay-content .book-title h5') as HTMLHeadingElement;
    const overlayDescription = document.querySelector('.overlay-content .book-title p') as HTMLParagraphElement;
    const overlayDetails = document.querySelectorAll('.overlay-content .book-details h5') as NodeList;

    const currentBook = document.querySelector(".current-book") as HTMLElement;
    const clickedBookElement = document.getElementById(`book-${book.id}`) as HTMLElement;

    /* Uppdatera textinnehåll i overlay */
    if (overlayTitle && overlayAuthor && overlayDescription && overlayDetails) {
        overlayTitle.textContent = book.title;
        overlayAuthor.textContent = `By ${book.author}`;
        overlayDescription.textContent = book.plot;

        overlayDetails[0].textContent = `Audience: ${book.audience}`;
        overlayDetails[1].textContent = `${book.pages ? book.pages : 'Unknown'}`;
        overlayDetails[2].textContent = `${book.year}`;
        overlayDetails[3].textContent = book.publisher;
    } 

    if (clickedBookElement) {
        const bookTitleElement = document.querySelector("h2") as HTMLHeadElement;
        const bookAuthorElement = document.querySelector(".author") as HTMLParagraphElement;

        if (bookTitleElement && bookAuthorElement) {
            bookTitleElement.textContent = book.title; 
            bookAuthorElement.textContent = book.author; 
        }
    }

    /* Overlaybok får rätt färg */
    const colorIndex: number = (book.id - 1);
    currentBook?.setAttribute('style', bookColor[colorIndex]);

    /* Visa overlayen */
    const overlayWrapper = document.querySelector('.overlay-wrapper') as HTMLDivElement;
    const btn = document.querySelector('.button') as HTMLButtonElement;
    if (overlayWrapper) {
        overlayWrapper.style.display = 'block';

        /* Klickar ner overlay */
        btn.addEventListener('click', () => {
            overlayWrapper.style.display = 'none';
        })
    } 
}

/* Anropar fetchData för att hämta alla böcker när sidan laddas */
fetchData();