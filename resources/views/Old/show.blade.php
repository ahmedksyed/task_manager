<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    {{-- Bootsrap CSS --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

    {{-- jQuery JS --}}
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"
        integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>

    {{-- Bootsrap JS --}}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous">
    </script>
</head>

<body class="antialiased">
    <div class="container">
        <h1>Task Manager</h1>
        <h2>Tasks List</h2>

        <a href="tasks/create">
            <button type="button" class="btn btn-success">Create a task</button>
        </a>

        @if (session('status'))
            <div class="alert alert-success">
                {{ session('status') }}
            </div>
        @endif

        <table class="table table-striped table-bordered">
            <tbody>
                <tr>
                    <th>Task Name</th>
                    <td>{{ $task->name }}</td>
                </tr>
                <tr>
                    <th>Assigned To</th>
                    <td>{{ $task->user_name }}</td>
                </tr>
                <tr>
                    <th>Project Name</th>
                    <td>{{ $task->project_name }}</td>
                </tr>
                <tr>
                    <th>Assigned On</th>
                    <td>{{ $task->assigned_on }}</td>
                </tr>
                <tr>
                    <th>Priority</th>
                    <td>{{ $task->priority ? 'High' : 'Not High' }}</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{{ $task->status ? 'Done' : 'Pending' }}</td>
                </tr>
            </tbody>

        </table>


    </div>


</body>

</html>
