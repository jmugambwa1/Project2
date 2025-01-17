<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'author_id',
        'description',
        'price',
        'year',
	'genre_id',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }

    public function jsonSerialize(): mixed
    {
	return [
	    'id' => intval($this->id),
	    'name' => $this->name,
	    'description' => $this->description,
	    'author' => $this->author->name,
	    'genre' => ($this->genre ? $this->genre->name : ''),
	    'price' => number_format($this->price, 2),
	    'year' => intval($this->year),
	    'image' => asset('images/' . $this->image),
	];
    }


}

