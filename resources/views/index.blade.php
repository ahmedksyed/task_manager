<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    {{-- <link href="styles/index.css" rel="stylesheet" /> --}}
    <link href="{{ asset('css/index.css') }}" rel="stylesheet" />
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous" />
    <!-- Font -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Datatable -->
    <link href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css" rel="stylesheet" />
    <!-- <link
      href="https://cdn.datatables.net/datetime/1.5.1/css/dataTables.dateTime.min.css"
      rel="stylesheet"
    /> -->
    <title>Task Manager</title>
</head>

<body onload="updateIntialData()">


    <!--Add new task modal-->
    <div class="modal fade" id="addNewModal" tabindex="-1" aria-labelledby="addNewModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addNewModalLabel">Add New Task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form onsubmit="return false" id="taskform" task-id="Hello" method="POST">

                        <div class="mb-3">
                            <label for="task_project" class="form-label">Project : </label>

                            <select id="task_project" name="project_id" class="form-select" required aria-label="Default select example">
                                <option value="" disabled selected>Project Name</option>
                                @foreach ($projects as $project)
                                <option value="{{ $project->id }}">{{ $project->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="task_title" class="form-label">Task : </label>
                            <input type="text" class="form-control" id="task_title" placeholder="Task name" name="name" required />
                        </div>

                        <div class="mb-3">
                            <label for="task_assigned_to" class="form-label">Assign to :
                            </label>
                            <select id="task_assigned_to" name="user_id" class="form-select" required aria-label="Default select example">
                                <option value="" disabled selected>Employee Name</option>
                                @foreach ($users as $user)
                                <option value="{{ $user->id }}">{{ $user->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <!-- <div class="mb-3">
                <label for="task_assigned_on" class="form-label"
                  >Assigned On:</label
                >
                <input
                  type="datetime-local"
                  class="form-control"
                  id="task_assigned_on"
                  name="task_assigned_on"
                />
              </div> -->

                        <div class="mb-3">
                            <label for="priority" class="form-label">Priority : </label>
                            <select id="priority" name="priority" class="form-select" aria-label="Default select example" required>
                                <option value="1">High</option>
                                <option value="0" selected>Medium</option>
                            </select>
                        </div>

                        <div class="mb-3" id="status_group">
                            <label class="mb-1">Status : </label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="status" id="1" />
                                <label class="form-check-label" for="1"> Completed </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="status" id="0" checked />
                                <label class="form-check-label" for="0">
                                    Not Completed
                                </label>
                            </div>
                        </div>

                        <!-- <div class="mb-3">
                <label for="task_desc" class="form-label"
                  >Task Description :
                </label>
                <textarea class="form-control" id="task_desc" placeholder="Describe your Task..." rows="4" required></textarea>
              </div> -->

                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" onclick="saveTask()" id="updatetask">
                            Update
                        </button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" onclick="handleSubmit()" id="savetask">
                            Save
                        </button>
                    </form>
                </div>
                <div class="modal-footer"></div>
            </div>
        </div>
    </div>

    <!--show task modal-->
    <div class="modal fade" id="showTaskModal" tabindex="-1" aria-labelledby="showTaskModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="showTaskModalLabel">Task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body show_task_content">...</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!--Nav Bar-->
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="#">
                <i class="fa-solid fa-note-sticky"></i> Task Manager
            </a>

            <div class="collapse navbar-collapse" id="navbarScroll">
                <!-- <ul class="nav-bar nav me-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
          </ul> -->
            </div>
        </div>
    </nav>

    <!--main body-->
    <div class="container">
        <!-- profile -->
        <section class="mt-4">
            <div class="profile_details">
                <div class="name">
                    <span>Name: </span>
                    <h1 class="d-inline-block" id="user_name">{{ $manager->name }}</h1>
                </div>

                <div class="designation">
                    <span>Designation: </span>
                    <p class="d-inline-block" id="user_designation">
                        {{ $manager->designation_name }}
                    </p>
                </div>

                <div class="department">
                    <span>Department: </span>
                    <p class="d-inline-block" id="user_department">{{ $manager->department_name }}</p>
                </div>

                <div class="manager">
                    <span>Manager: </span>
                    <p class="d-inline-block" id="user_manager">{{ $manager->manager_name }}</p>
                </div>
            </div>
        </section>

        <!--Tasks Section-->
        <section class="">
            <!-- Add task -->
            <div class="border-top mt-5">
                <div class="mt-5 d-flex align-items-center g-5">
                    <h2 class="d-inline-block fs-2">Employee :</h2>
                    <div class="d-inline-block px-3">
                        <!-- <div class="dropdown" id="selectedEmployee">
                <button
                  class="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Girish
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  <li><a class="dropdown-item active" href="#">Girish</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#">Jwala</a></li>
                  <li><a class="dropdown-item" href="#">Sunil</a></li>
                  <li><a class="dropdown-item" href="#">Sagar</a></li>
                  <li><a class="dropdown-item" href="#">Shiva</a></li>
                </ul>
              </div> -->
                        <input type="hidden" id="app_url" name="app_url" value="{{  url('tasks/'.session('manager_name').'/') }}">
                        <select class="form-select" aria-label="Default select example" id="selectedEmployee">
                            <option value="0" selected>All</option>
                            @foreach ($users as $user)
                            <option value="{{ $user->id }}" {{ $user->id == request()->employee ? 'selected' : '' }}>{{ $user->name }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="d-flex flex-row align-items-center justify-content-between mt-2">
                    <h2 class="d-block" style="display: none !important;">
                        Tasks of
                        <span id="selectedEmployeeTitle"> Girish</span>
                    </h2>
                    <div>
                        <!-- <button
                class="btn btn-primary d-inline"
                type=""
                onclick="myTasks()"
                data-bs-toggle="button"
                style="outline: none"
              >
                My Tasks
              </button> -->
                        <button class="btn btn-primary d-inline" type="submit" data-bs-toggle="modal" data-bs-target="#addNewModal" onclick="reRenderData() ">
                            <i class="fa-solid fa-plus"></i>
                            Add new Task
                        </button>
                    </div>
                </div>
            </div>
            <!--Task Contents-->
            <div class="mt-2" id="tasks">
                <table id="tasktable" class="display" style="width: 100%">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Priority</th>
                            <th>Project</th>
                            <th>Task</th>
                            <!-- <th>Assigned To</th> -->
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tfoot>
                        <tr>
                            <th>Date</th>
                            <th>Priority</th>
                            <th>Project</th>
                            <th>Task</th>
                            <!-- <th>Assigned To</th> -->
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    </div>

    <!--Scripts-->
    <!-- Jquery -->
    <script src="https://code.jquery.com/jquery-3.7.0.js"></script>
    <!-- js -->
    {{-- <script src="scripts/index.js"></script> --}}
    <script>
    // var tasklist = [{
    //         id: "123",
    //         project: "Asign",
    //         task: "Pdf update",
    //         assignedOn: "1692184282172",
    //         priority: 1,
    //         status: true,
    //         assignedTo: "Sagar",
    //     },

    //     {
    //         id: "456",
    //         project: "Camel",
    //         task: "Emailers",
    //         assignedOn: "1692184282172",
    //         priority: 0,
    //         status: false,
    //         assignedTo: "Sunil",
    //     },
    //     {
    //         id: "789",
    //         project: "TaskManager",
    //         task: "Frontend update",
    //         assignedOn: "1692184282172",
    //         priority: 0,
    //         status: false,
    //         assignedTo: "Shiva",
    //     },
    // ];

    // console.log(tasklist);

    var tasklist = @json($tasks);
    // console.log(tasklist);

    let tasklistTemp;
    let Sagartasks = [{
        id: "789",
        project: "Camel",
        task: "Frontend update",
        assignedOn: "1692184282172",
        priority: 0,
        status: false,
        assignedTo: "Sagar",
    }, ];
    </script>
    <script src="{{ asset('js/index.js') }}"></script>
    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous">
    </script>
    <!-- Datatable -->
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>
    <!-- <script src="https://cdn.datatables.net/datetime/1.5.1/js/dataTables.dateTime.min.js"></script>  -->
</body>

</html>