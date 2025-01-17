
import { useEffect, useState } from "react";
import '../css/loader.css';

const topBooks = [
    {
        "id": 9,
        "name": "When the Butterflies Leave",
        "description": "Damn i had not put a description for this . i guess now it has.. lol",
        "author": "Jana Versile",
        "genre": "Fantasy",
        "price": "9.00",
        "year": 2024,
        "image": "http://localhost/images/678407b80b8c2.webp"
    },
    {
        "id": 5,
        "name": "Little Squirrel",
        "description": "Little Squirrel is a heartfelt exploration of love, regret, and longing. It delves into the emotional aftermath of a relationship tested by separation and the presence of another. Through vivid metaphors and raw vulnerability, the narrator wrestles with feelings of jealousy, sorrow, and self-reflection, yearning to mend the bond they once shared.\r\n\r\nThe \"little squirrel\" becomes a poignant symbol of the beloved—both a source of joy and pain—capturing the complexity of human emotions in love. The poem contemplates the transformative power of trust, loyalty, and forgiveness while grappling with the torment of past mistakes. It is a poignant reminder that love, though beautiful, requires effort and understanding to flourish.\r\n\r\nWith its evocative imagery and introspective tone, Little Squirrel resonates deeply, offering a glimpse into the fragile yet enduring nature of love.",
        "author": "kheza joel",
        "genre": "Non-Fiction",
        "price": "2.00",
        "year": 2023,
        "image": "http://localhost/images/67783652c8921.webp"
    },
    {
        "id": 7,
        "name": "Whispers in the Night",
        "description": "Also this never had a description iam such a big pussy. how could i miss that",
        "author": "Jana Versile",
        "genre": "Biography",
        "price": "1.99",
        "year": 2023,
        "image": "http://localhost/images/678408b72638d.webp"
    }
];


 
const selectedBook = {
    "id": 5,
    "name": "Little Squirrel",
    "description": "Little Squirrel is a heartfelt exploration of love, regret, and longing. It delves into the emotional aftermath of a relationship tested by separation and the presence of another. Through vivid metaphors and raw vulnerability, the narrator wrestles with feelings of jealousy, sorrow, and self-reflection, yearning to mend the bond they once shared.\r\n\r\nThe \"little squirrel\" becomes a poignant symbol of the beloved—both a source of joy and pain—capturing the complexity of human emotions in love. The poem contemplates the transformative power of trust, loyalty, and forgiveness while grappling with the torment of past mistakes. It is a poignant reminder that love, though beautiful, requires effort and understanding to flourish.\r\n\r\nWith its evocative imagery and introspective tone, Little Squirrel resonates deeply, offering a glimpse into the fragile yet enduring nature of love.",
    "author": "kheza joel",
    "genre": "Non-Fiction",
    "price": "2.00",
    "year": 2023,
    "image": "http://localhost/images/67783652c8921.webp"
};


 
const relatedBooks = [
    {
        "id": 7,
        "name": "Whispers in the Night",
        "description": "Also this never had a description iam such a big pussy. how could i miss that",
        "author": "Jana Versile",
        "genre": "Biography",
        "price": "1.99",
        "year": 2023,
        "image": "http://localhost/images"
    },
    {
        "id": 2,
        "name": "Find Her",
        "description": "oh my GOD this is so terrifying its so Horror",
        "author": "Jana Versile",
        "genre": "Fiction",
        "price": "23.21",
        "year": 2023,
        "image": "http://localhost/images/67718901e50c9.jpg"
    },
    {
        "id": 6,
        "name": "Feast Upon The Rich",
        "description": "Everything so Crazy damn what be this oooo oh my God i cant believe this",
        "author": "kheza joel",
        "genre": "Fiction",
        "price": "4.98",
        "year": 2024,
        "image": "http://localhost/images/6778376ff3157.webp"
    }
];







// Main application component 
export default function App() { 
    const [selectedBookID, setSelectedBookID] = useState(null); 
 
    // function to store Book ID in state 
    function handleBookSelection(bookID) { 
        setSelectedBookID(bookID); 
    } 
 
    // function to clear Book ID from state 
    function handleGoingBack() { 
        setSelectedBookID(null); 
    } 
 
    return ( 
        <> 
            <Header /> 
            <main className="mb-8 px-2 md:container md:mx-auto"> 
                { 
                selectedBookID 
                ? <BookPage 
                    selectedBookID={selectedBookID} 
                    handleBookSelection={handleBookSelection} 
                    handleGoingBack={handleGoingBack} 
                /> 
                : <Homepage handleBookSelection={handleBookSelection} /> 
                } 
            </main> 
            <Footer /> 
        </> 
    ) 
} 



// Header and Footer components - structural components without processing or data 
function Header() { 
    return ( 
        <header className="bg-green-500 mb-8 py-2 sticky top-0"> 
            <div className="px-2 py-2 font-serif text-green-50 text-xl leading-6 
md:container md:mx-auto"> 
                Project 2 
            </div> 
        </header> 
    ) 
} 

function Footer() { 
    return ( 
        <footer className="bg-neutral-300 mt-8"> 
            <div className="py-8 md:container md:mx-auto px-2"> 
                Joel Mugambwa, VeA, 2025 
            </div> 
        </footer> 
    ) 
}  

// Homepage- loads data from API and displays top books 
function Homepage({ handleBookSelection }) {
    const [topBooks, setTopBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(function () { 
	async function fetchTopBooks() { 
	    try {
		setIsLoading(true);
		setError(null);
		const response = await fetch('http://localhost/data/get-top-books'); 

		if (!response.ok) { 
                    throw new Error("Error while loading data. Please reload page!"); 
        	}

		const data = await response.json(); 
		console.log('top books fetched', data); 
		setTopBooks(data); 
	    } catch (error) { 
		setError(error.message);
	    } finally {
		setIsLoading(false);
	    }
	}
	fetchTopBooks(); 
    }, []);
  
    return ( 
        <> 
            {isLoading && <Loader />}
	    {error && <ErrorMessage msg={error} />} 
            {!isLoading && !error && ( 
                topBooks.map((book, index) => ( 
                    <TopBookView
		      book={book} 
                      key={book.id} 
                      index={index} 
                      handleBookSelection={handleBookSelection}
		    /> 
                )) 
            )} 
        </> 
    ) 
} 


// Top Book View - displays books on Homepage 
function TopBookView({ book, index, handleBookSelection }) { 
    return ( 
        <div className="bg-neutral-100 rounded-lg mb-8 py-8 flex flex-wrap md:flex-row"> 
            <div className= 
                {`order-2 px-12 md:basis-1/2  
                    ${ index % 2 === 1 ? "md:order-1 md:text-right" : ""} 
                `} 
            > 
                <p className="mb-4 text-3xl leading-8 font-light text-neutral-900"> 
                    {book.name} 
                </p> 
                <p className="mb-4 text-xl leading-7 font-light text-neutral-900 mb-4"> 
                    { (book.description.split(' ').slice(0, 16).join(' ')) + '...' } 
                </p> 
                <SeeMoreBtn  
                    bookID={book.id}  
                    handleBookSelection={handleBookSelection} 
                /> 
            </div> 
            <div className= 
                {`order-1 md:basis-1/2 ${ index % 2 === 1 ? "md:order-2" : ""}`} 
            > 
                <img  
                    src={ book.image }  
                    alt={ book.name }  
                    className="p-1 rounded-md border border-neutral-200 w-2/4 aspect-auto 
mx-auto" /> 
            </div> 
        </div> 
    ) 
} 


// See More Button 
function SeeMoreBtn({ bookID, handleBookSelection}) {
    return ( 
	<button 
	    className="inline-block rounded-full py-2 px-4 bg-sky-500 hover:bg
sky-400 text-sky-50 cursor-pointer" 
	    onClick={() => handleBookSelection(bookID)} 
	>See more</button> 
    ) 
} 


// Book page component- structural component that contains parts of the book page 
function BookPage({ selectedBookID, handleBookSelection, handleGoingBack }) { 
    return ( 
	<> 
	    <SelectedBookView 
		selectedBookID={selectedBookID} 
		handleGoingBack={handleGoingBack} 
	    /> 
	    <RelatedBookSection 
		selectedBookID={selectedBookID} 
		handleBookSelection={handleBookSelection} 
	    /> 
	</> 
    ) 
}


// Selected Book View - displays selected book details 
function SelectedBookView({ selectedBookID, handleGoingBack }) { 
    const [selectedBook, setSelectedBook] = useState({}); 
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 
 
    useEffect(() => { 
        async function fetchSelectedBook() { 
            try { 
                setIsLoading(true); 
                setError(null); 
                const response = await fetch('http://localhost/data/get-book/' + selectedBookID); 
                if (!response.ok) { 
                    throw new Error("Error while loading data. Please reload the page!"); 
                } 
                const data = await response.json(); 
                setSelectedBook(data); 
            } catch (error) { 
                setError(error.message); 
            } finally { 
                setIsLoading(false); 
            } 
        } 
        fetchSelectedBook(); 
    }, [selectedBookID]); 
 
    return ( 
        <> 
            {isLoading && <Loader />} 
            {error && <ErrorMessage msg={error} />} 
            {!isLoading && !error && ( 
                <> 
                    <div className="rounded-lg flex flex-wrap md:flex-row"> 
                        <div className="order-2 md:order-1 md:pt-12 md:basis-1/2"> 
                            <h1 className="text-3xl leading-8 font-light text-neutral-900 mb-2"> 
                                {selectedBook.name} 
                            </h1> 
                            <p className="text-xl leading-7 font-light text-neutral-900 mb-2"> 
                                {selectedBook.author} 
                            </p> 
                            <p className="text-xl leading-7 font-light text-neutral-900 mb-4"> 
                                {selectedBook.description} 
                            </p> 
                            <dl className="mb-4 md:flex md:flex-wrap md:flex-row"> 
                                <dt className="font-bold md:basis-1/4"> 
                                    Published 
                                </dt> 
                                <dd className="mb-2 md:basis-3/4"> 
                                    {selectedBook.year} 
                                </dd> 
 
                                <dt className="font-bold md:basis-1/4"> 
                                    Price 
                                </dt> 
                                <dd className="mb-2 md:basis-3/4"> 
                                    &euro; {selectedBook.price} 
                                </dd> 
 
                                <dt className="font-bold md:basis-1/4"> 
                                    Genre 
                                </dt> 
                                <dd className="mb-2 md:basis-3/4"> 
                                    {selectedBook.genre} 
                                </dd> 
                            </dl> 
                        </div> 
                        <div className="order-1 md:order-2 md:pt-12 md:px-12 md:basis-1/2"> 
                            <img 
                                src={selectedBook.image} 
                                alt={selectedBook.name} 
                                className="p-1 rounded-md border border-neutral-200 mx-auto" 
                            /> 
                        </div> 
                    </div> 
                    <div className="mb-12 flex flex-wrap"> 
                        <GoBackBtn handleGoingBack={handleGoingBack} /> 
                    </div> 
                </> 
            )} 
        </> 
    ); 
} 

  



// Go Back Button 
function GoBackBtn({ handleGoingBack }) { 
    return ( 
        <button 
            className="inline-block rounded-full py-2 px-4 bg-neutral-500 
hover:bg-neutral-400 text-neutral-50 cursor-pointer" 
            onClick={handleGoingBack} 
        >Back</button> 
    ) 
}


// Related Book Section
function RelatedBookSection({ selectedBookID, handleBookSelection }) {
    const [relatedBooks, setRelatedBooks] = useState([]); // State for related books data
    const [isLoading, setIsLoading] = useState(false);    // State for loading
    const [error, setError] = useState(null);             // State for error

    useEffect(() => {
        async function fetchRelatedBooks() {
            try {
                setIsLoading(true); // Start loading
                setError(null);     // Reset error
                const response = await fetch(`http://localhost/data/get-related-books/${selectedBookID}`);
                
                if (!response.ok) {
                    throw new Error("Error while loading related books. Please try again!");
                }

                const data = await response.json();
                console.log(`Related books for ${selectedBookID} fetched:`, data);
                setRelatedBooks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false); // Stop loading
            }
        }

        if (selectedBookID) {
            fetchRelatedBooks(); // Fetch data when selectedBookID changes
        }
    }, [selectedBookID]);

    return (
        <>
            <div className="flex flex-wrap">
                <h2 className="text-3xl leading-8 font-light text-neutral-900 mb-4">
                    Similar Books
                </h2>
            </div>

            {isLoading && <Loader />}          {/* Show loader while fetching */}
            {error && <ErrorMessage msg={error} />} {/* Show error message */}
            
            {!isLoading && !error && (
                <div className="flex flex-wrap md:flex-row md:space-x-4 md:flex-nowrap">
                    {relatedBooks.map(book => (
                        <RelatedBookView
                            book={book}
                            key={book.id}
                            handleBookSelection={handleBookSelection}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
 


// Related Book View
function RelatedBookView({ book, handleBookSelection }) {
  return (
    <div className="rounded-lg mb-4 flex-grow md:w-[30%]">

      <img
  	src={book.image}
  	alt={book.name}
  	className="w-full h-[250px] object-cover rounded-lg"
      />

      <div className="p-4">
        <h3 className="text-xl leading-7 font-light text-neutral-900 mb-4">
          {book.name}
        </h3>
        <SeeMoreBtn
          bookID={book.id}
          handleBookSelection={handleBookSelection}
        />
      </div>
    </div>
  );
}

// Loader and Error Message components 
function Loader() { 
    return ( 
	<div className="my-12 px-2 md:container md:mx-auto text-center clear-both"> 
	    <div className="loader"></div>
	</div> 
    ) 
} 
function ErrorMessage({ msg }) { 
    return ( 
	<div className="md:container md:mx-auto bg-red-300 my-8 p-2"> 
	    <p className="text-black">{ msg }</p> 
	</div> 
    ) 
}