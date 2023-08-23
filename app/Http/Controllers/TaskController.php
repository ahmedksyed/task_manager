<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        session(['active_user_slug' => $request->active_user_slug]);
        $active_user_name = str_replace("-", " ", $request->active_user_slug);

        $active_user = DB::table('users')
            ->join('departments', 'departments.id', '=', 'users.department_id')
            ->join('designations', 'designations.id', '=', 'users.designation_id')
            ->select('users.*', 'departments.name as department_name', 'designations.name as designation_name', )
            ->where('users.name', 'LIKE', '%' . $active_user_name . '%')
            ->first();

        if (isset($active_user->manager_id) && !empty($active_user->manager_id)) {
            $mgrOfActUsr = DB::table('users')
                ->where('id', $active_user->manager_id)
                ->first();
            $active_user->manager_name = $mgrOfActUsr->name;
        } else {
            $active_user->manager_name = '';
        }



        session(['manager_id' => $active_user->id]);
        // session(['manager_readable_name' => $manager_name]);

        $users = DB::table('users')
            ->where('manager_id', $active_user->id)
            // ->orWhere('id', $manager->id)
            ->get();

        if (count($users) > 0) {
            $active_user->is_manager = 1;
            session(['is_manager' => 1]);
        } else {
            $active_user->is_manager = 0;
            session(['is_manager' => 0]);
        }
        // dd(count($users));

        // echo'<pre>';print_r($users);die;

        $query = DB::table('tasks')
            ->join('projects', 'projects.id', '=', 'tasks.project_id')
            ->join('users', 'users.id', '=', 'tasks.user_id')
            ->orderBy('tasks.assigned_on', 'desc')
            ->select('tasks.id', 'tasks.name as task', 'tasks.assigned_on', 'tasks.started_on', 'tasks.closed_on', 'tasks.created_at', 'tasks.status', 'projects.name as project', 'projects.id as project_id', 'users.name as assignedTo', 'users.id as assignedTo_id', 'tasks.priority');

        // exit('request employee'.$request->employee.'end');
        if (isset($request->employee) && !empty($request->employee)) {
            $employee = $request->employee;

            // ->whereIn('tasks.user_id', $user_ids)
            $query->where('tasks.user_id', $employee);
        } elseif (!count($users)) {

            $employee = $active_user->id;
            $query->where('tasks.user_id', $employee);
        } else {
            foreach ($users as $user) {
                $user_ids[] = $user->id;
            }

            $query->whereIn('tasks.user_id', $user_ids);
        }

        $tasks = $query->get();


        // $tasks=array();
        foreach ($tasks as $task) {
            // $task->assignedOn = \Carbon\Carbon::make($task->assignedOn)->timestamp; 
            $task->assigned_on = date('D, d M', strtotime($task->assigned_on));
            $task->started_on = date('D, d M', strtotime($task->started_on));
            $task->closed_on = date('D, d M', strtotime($task->closed_on));
            $task->created_at = date('D, d M', strtotime($task->created_at));
        }

        // dd($tasks);

        $projects = DB::table('projects')
            ->get();


        $data = compact('tasks', 'projects', 'users', 'active_user');


        return view('index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    //     $users = DB::table('users')
    //         // ->whereNotNull('manager_id')
    //         ->where('manager_id', session('manager_id'))
    //         ->orWhere('id', session('manager_id'))
    //         ->get();

    //     $projects = DB::table('projects')
    //         ->get();


    //     $data = compact('users', 'projects');

    //     return view('create', $data);
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $task = new Task;
        $task->name = $request->name;
        $task->user_id = $request->user_id;
        $task->project_id = $request->project_id;
        $task->assigned_on = $request->user_id ? now() : null;
        $task->priority = $request->priority;
        // $task->status = $request->status;
        $response = $task->save();

        if (!$response) {
            App::abort(500, 'Error');
        }
        // return redirect('/tasks/' . session('active_user_slug') . '/')->with('success', 'Task Has Been inserted');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    // public function show(Task $task)
    // {
    //     $task_id = request()->segment(2);
    //     $task = DB::table('tasks')
    //         ->join('projects', 'projects.id', '=', 'tasks.project_id')
    //         ->join('users', 'users.id', '=', 'tasks.user_id')
    //         ->select('tasks.*', 'projects.name as project_name', 'users.name as user_name')
    //         ->where('tasks.id', $task_id)
    //         ->first();

    //     return view('show', ['task' => $task]);
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    // public function edit(Task $task)
    // public function edit(Request $request)
    // {
    //     $task_id = request()->segment(3);
    //     $task = DB::table('tasks')
    //         ->join('projects', 'projects.id', '=', 'tasks.project_id')
    //         ->join('users', 'users.id', '=', 'tasks.user_id')
    //         ->select('tasks.*', 'projects.name as project_name', 'users.name as user_name')
    //         ->where('tasks.id', $task_id)
    //         ->first();

    //     // $users = DB::table('users')
    //     //     ->whereNotNull('manager_id')
    //     //     ->orWhere('id', session('manager_id'))
    //     //     ->get();

    //     $users = DB::table('users')
    //         // ->whereNotNull('manager_id')
    //         ->where('manager_id', session('manager_id'))
    //         ->orWhere('id', session('manager_id'))
    //         ->get();

    //     $projects = DB::table('projects')
    //         ->get();


    //     $data = compact('task', 'users', 'projects');

    //     return view('edit', $data);
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        // $task->name = $request->name;
        // $task->user_id = $request->user_id;
        // $task->project_id = $request->project_id;
        // $task->assigned_on = $request->user_id ? now() : null;
        // $task->priority = $request->priority;
        // $task->status = $request->status;

        $response = DB::table('tasks')
            ->where('id', $request->id)
            ->update([
                'name' => $request->name,
                'user_id' => $request->user_id,
                'project_id' => $request->project_id,
                'assigned_on' => $request->user_id ? now() : null,
                'closed_on' => $request->status ? now() : null,
                'priority' => $request->priority,
                'status' => $request->status,
            ]);


        // $response = $task->save();

        if (!$response) {
            App::abort(500, 'Error');
        }
        // return redirect('tasks')->with('success', 'Task Has Been updated');
        // return redirect('/tasks/' . session('active_user_slug') . '/')->with('success', 'Task Has Been updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Task $task)
    {
        // $response = $task->delete();
        $response = DB::table('tasks')->where('id', $request->id)->delete();

        if (!$response) {
            App::abort(500, 'Error');
        }
        // return redirect('tasks')->with('success', 'Task Has Been deleted successfully');
        // return redirect('/tasks/' . session('active_user_slug') . '/')->with('success', 'Task Has Been deleted successfully');
    }

    public function change_status(Request $request)
    {

        // $active_user_name = str_replace("-", " ", session('active_user_slug'));

        // $active_user = DB::table('users')
        //     ->join('departments', 'departments.id', '=', 'users.department_id')
        //     ->join('designations', 'designations.id', '=', 'users.designation_id')
        //     ->select('users.*', 'departments.name as department_name', 'designations.name as designation_name', )
        //     ->where('users.name', 'LIKE', '%' . $active_user_name . '%')
        //     ->first();

        // $is_manager = session('is_manager');
        $is_manager = $request->is_manager;
        $date = now();
        // dd($request->status);
        if ($request->status == 0 || $request->status === 'null') {
            $status = 1;
            $response = DB::table('tasks')
                ->where('id', $request->id)
                ->update([
                    'started_on' => $date,
                    'status' => $status,
                ]);
        }
        // dd($active_user->is_manager);
        // if ($is_manager) {
        elseif ($request->status == 1) {
            if ($is_manager) {
                $status = 2;
                $response = DB::table('tasks')
                    ->where('id', $request->id)
                    ->update([
                        'closed_on' => $date,
                        'status' => $status,
                    ]);
            }
        } else {
            if ($is_manager) {
                $status = 0;
                $response = DB::table('tasks')
                    ->where('id', $request->id)
                    ->update([
                        'assigned_on' => $date,
                        'status' => $status,
                    ]);
            }
        }
        // }
        $response = array();
        $response['date'] = date('D, d M', strtotime($date));
        $response['status'] = $status;
        echo json_encode($response);
        // $response = $task->save();

        // if (!$response) {
        //     App::abort(500, 'Error');
        // }
        // return redirect('tasks')->with('success', 'Task Has Been updated');
        // return redirect('/tasks/' . session('active_user_slug') . '/')->with('success', 'Task status Has Been updated');
    }

    // public function get_url()
    // {
    //     echo '/tasks/' . session('active_user_slug') . '/';
    // }
}