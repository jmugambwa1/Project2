<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Project 2 - {{ $title }}</title>
    <meta name="description" content="Web Technologies Project 2">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            @if(Auth::check())
                <li class="nav-item">
                    <a class="nav-link" href="/authors">Authors</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/logout">Logout</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/books">Books</a>
                </li>
            @else
                <li class="nav-item">
                    <a class="nav-link" href="/login">Authenticate</a>
                </li>
            @endif
        </ul>
    </div>
  </nav>


    <main class="container">
         <div class="row">
            <div class="col">
                @yield('content') <!-- Dynamic Content -->
            </div>
        </div>
    </main>
    <footer class="text-bg-dark mt-3">
        <div class="container">
            <div class="row py-5">
                <div class="col text-center">
                    Joel Mugambwa, 2024
                </div>
            </div>
        </div>
    </footer>
    <script src="/js/admin.js"></script>
</body>
</html>



