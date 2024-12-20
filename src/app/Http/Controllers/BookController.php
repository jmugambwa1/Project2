<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
use App\Models\Book;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;

class BookController extends Controller implements HasMiddleware
{
    // call auth middleware
    public static function middleware(): array
    {
        return [
            'auth',
        ];
    }

    // display all Books
    public function list(): View
    {
	$items = Book::orderBy('name', 'asc')->get();
	return view(
	    'book.list',
	    [
		'title' => 'Books',
		'items' => $items
	    ]
	);
    }

    // display new Book form
    public function create(): View
    {
	$authors = Author::orderBy('name', 'asc')->get();
	return view(
	    'book.form',
	    [
		'title' => 'Add new book',
		'book' => new Book(),
		'authors' => $authors,
	    ]
	);
    }

    // create new Book entry
    public function put(Request $request): RedirectResponse
    {
	$validatedData = $request->validate([
	    'name' => 'required|min:3|max:256',
	    'author_id' => 'required',
	    'description' => 'nullable',
	    'price' => 'nullable|numeric',
	    'year' => 'numeric',
	    'image' => 'nullable|image',
	    'display' => 'nullable',
	]);
	$book = new Book();
	$book->name = $validatedData['name'];
	$book->author_id = $validatedData['author_id'];
	$book->description = $validatedData['description'];
	$book->price = $validatedData['price'];
	$book->year = $validatedData['year'];
	$book->display = (bool) ($validatedData['display'] ?? false);
	$book->save();
	return redirect('/books');
    }

    // display Book edit form
    public function update(Book $book): View
    {
	$authors = Author::orderBy('name', 'asc')->get();
	return view(
	    'book.form',
	    [
		'title' => 'Rediget gramatu',
		'book' => $book,
		'authors' => $authors,
	    ]
	);
    }

    // update Book data
    public function patch(Book $book, Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
	    'name' => 'required|min:3|max:256',
	    'author_id' => 'required',
	    'description' => 'nullable',
	    'price' => 'nullable|numeric',
	    'year' => 'numeric',
	    'image' => 'nullable|image',
	    'display' => 'nullable',
	]);
	$book->name = $validatedData['name'];
	$book->author_id = $validatedData['author_id'];
	$book->description = $validatedData['description'];
	$book->price = $validatedData['price'];
	$book->year = $validatedData['year'];
	$book->display = (bool) ($validatedData['display'] ?? false);
	$book->save();
	return redirect('/books')->with('Book updated successfully!');
    }

    // delete Book
    public function delete(Book $book): RedirectResponse
    {
        // delete the image file too
	$book->delete();
	return redirect('/books');
    }
}
