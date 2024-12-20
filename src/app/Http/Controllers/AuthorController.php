<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Routing\Controllers\HasMiddleware;

class AuthorController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            'auth',
        ];
    }

    public function list(): View
    {
        $items = Author::orderBy('name', 'asc')->get();

        return view(
            'author.list',
            [
                'title' => 'Authors',
                'items' => $items,
            ]
        );
    }

    // Show all authors in the index page
    public function index()
    {
        $authors = Author::all();
        return view('authors.index', compact('authors'));
    }

    // Show the form to create a new author
    public function showCreateForm(): View
    {
        return view('authors.create');
    }

    // Store a new author in the database
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'bio' => 'nullable',
        ]);

        Author::create($validated);

        return redirect()->route('authors.index')->with('success', 'Author created successfully!');
    }

    // Show the form to edit an author
    public function showEditForm(Author $author): View
    {
        return view('authors.edit', compact('author'));
    }

    // Update an author's information in the database
    public function update(Request $request, Author $author): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'bio' => 'nullable',
        ]);

        $author->update($validated);

        return redirect()->route('authors.index')->with('success', 'Author updated successfully!');
    }

    // Delete an author from the database
    public function destroy(Author $author): RedirectResponse
    {
        $author->delete();

        return redirect()->route('authors.index')->with('success', 'Author deleted successfully!');
    }

    // Display new Author form
    public function create(): View
    {
        return view('author.form', [
            'title' => 'Add new author',
            'author' => new Author(), // Pass an empty author instance
        ]);
    }

    // Create a new Author in the database
    public function put(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $author = new Author();
        $author->name = $validatedData['name'];
        $author->save();

        return redirect('/authors');
    }

    // Display Author editing form
    public function edit(Author $author): View
    {
        return view('author.form', [
            'title' => 'Edit author',
            'author' => $author,
        ]);
    }

    // Update existing Author data
    public function patch(Author $author, Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $author->name = $validatedData['name'];
        $author->save();

        return redirect('/authors');
    }

    // Delete Author
    public function delete(Author $author): RedirectResponse
    {
        $author->delete();
        return redirect('/authors');
    }
}

