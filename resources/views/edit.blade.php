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
        <h2>Update a Task</h2>

        <form method="post" action="{{ route('tasks.update', $task->id) }}">
            @csrf
            @method('PUT')
            <input type="hidden" name="id" value="{{ $task->id }}">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputEmail4">Task Name</label>
                    <input type="text" class="form-control" id="inputName4" placeholder="Task Name" name="name"
                        value="{{ $task->name }}" required>
                </div>

                <div class="form-group col-md-6">
                    <label for="inputAssign">Assigned To</label>
                    <select id="inputAssign" class="form-control" name="user_id" required>
                        @foreach ($users as $user)
                            <option value="{{ $user->id }}" {{ $user->id === $task->user_id ? 'selected' : '' }}>
                                {{ $user->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group col-md-6">
                    <label for="inputProject">Project</label>
                    <select id="inputProject" class="form-control" name="project_id" required>
                        @foreach ($projects as $project)
                            <option value="{{ $project->id }}"
                                {{ $project->id === $task->project_id ? 'selected' : '' }}>{{ $project->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group col-md-6">
                    <label for="inputPriority">Priority</label>
                    <select id="inputPriority" class="form-control" name="priority" required>
                        <option value="0" {{ !$task->priority ? 'selected' : '' }}>Not High</option>
                        <option value="1" {{ $task->priority ? 'selected' : '' }}>High</option>
                    </select>
                </div>

                <div class="form-group col-md-6">
                    <label for="inputStatus">Status</label>
                    <select id="inputStatus" class="form-control" name="status" required>
                        <option value="0" {{ !$task->status ? 'selected' : '' }}>Pending</option>
                        <option value="1" {{ $task->status ? 'selected' : '' }}>Done</option>
                    </select>
                </div>


            </div>
            <div class="container">
                <button type="submit" class="btn btn-primary">Update Task</button>
            </div>
        </form>

    </div>


</body>

</html>
