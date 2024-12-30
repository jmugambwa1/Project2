<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
use App\Models\Book;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use App\Http\Requests\BookRequest;

class BookController extends Controller implements HasMiddleware
{
    // Call auth middleware
    public static function middleware(): array
    {
        return [
            'auth',
        ];
    }

    // Display all books
    public function list(): View
    {
        $items = Book::orderBy('name', 'asc')->get();
        return view('book.list', [
            'title' => 'Books',
            'items' => $items,
        ]);
    }

    // Display new book form
    public function create(): View
    {
        $authors = Author::orderBy('name', 'asc')->get();
        return view('book.form', [
            'title' => 'Add new book',
            'book' => new Book(),
            'authors' => $authors,
        ]);
    }

    // Validate and save Book data
    private function saveBookData(Book $book,BookRequest $request)
    {
        $validatedData = $request->validate();

        $book->fill($validatedData);
        $book->display = (bool) ($validatedData['display'] ?? false);

        if ($request->hasFile('image')) {
            // Here you can add code that deletes old image file when a new one is uploaded
            $uploadedFile = $request->file('image');
            $extension = $uploadedFile->clientExtension();
            $name = uniqid();
            $book->image = $uploadedFile->storePubliclyAs(
                '/',
                $name . '.' . $extension,
                'uploads'
            );
        }
        $book->save();
    }

    // Create a new book entry
    public function put(BookRequest $request): RedirectResponse
    {
        $book = new Book();
        $this->saveBookData($book, $request);
        return redirect('/books');
    }

    // Update book data
    public function patch(Book $book,BookRequest $request): RedirectResponse
    {
        $this->saveBookData($book, $request);
        return redirect('/books/update/' . $book->id);
    }

    // Display book edit form
    public function update(Book $book): View
    {
        $authors = Author::orderBy('name', 'asc')->get();
        return view('book.form', [
            'title' => 'Edit Book',
            'book' => $book,
            'authors' => $authors,
        ]);
    }

    // Delete a book
    public function delete(Book $book): RedirectResponse
    {
        if ($book->image) {
            unlink(storage_path('app/public/' . $book->image));
        }
        $book->delete();
        return redirect('/books');
    }
}

