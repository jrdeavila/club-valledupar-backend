<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800;900&display=swap" rel="stylesheet">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead

    {{-- <link rel="stylesheet" href="/build/assets/app-0d4d1725.css"> --}}
    {{-- <script type="module" src="/assets/app-450549a5.js"></script> --}}
</head>

<body class="font-sans antialiased">
    @inertia
    <script>
        // Bloquear el click derecho en todo el documento
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    </script>

</body>

</html>
