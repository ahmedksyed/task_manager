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

        session(['manager_name' => $request->manager_name]);
        $manager_name = str_replace("-", " ", $request->manager_name);

        $manager = DB::table('users')
            ->join('departments', 'departments.id', '=', 'users.department_id')
            ->join('designations', 'designations.id', '=', 'users.designation_id')
            ->select('users.*', 'departments.name as department_name', 'designations.name as designation_name', )
            ->where('users.name', 'LIKE', '%' . $manager_name . '%')
            ->first();

        if (isset($manager->manager_id) && !empty($manager->manager_id)) {
            $my_manager = DB::table('users')
                ->where('id', $manager->manager_id)
                ->first();
            $manager->manager_name = $my_manager->name;
        } else {
            $manager->manager_name = '';
        }



        session(['manager_id' => $manager->id]);
        // session(['manager_readable_name' => $manager_name]);

        $users = DB::table('users')
            ->where('manager_id', $manager->id)
            ->orWhere('id', $manager->id)
            ->get();

        $query = DB::table('tasks')
            ->join('projects', 'projects.id', '=', 'tasks.project_id')
            ->join('users', 'users.id', '=', 'tasks.user_id')
            ->orderBy('tasks.assigned_on', 'desc')
            ->select('tasks.id', 'tasks.name as task', 'tasks.assigned_on as assignedOn', 'tasks.status', 'projects.name as project', 'projects.id as project_id', 'users.name as assignedTo', 'users.id as assignedTo_id', 'tasks.priority');

        if (isset($request->employee) && !empty($request->employee)) {
            $employee = $request->employee;

            // ->whereIn('tasks.user_id', $user_ids)
            $query->where('tasks.user_id', $employee);
        } else {
            // $employee = $manager->id;
            foreach ($users as $user) {
                $user_ids[] = $user->id;
            }

            $query->whereIn('tasks.user_id', $user_ids);
            // ->where('tasks.user_id', $employee)
        }
        $tasks = $query->get();


        // $tasks=array();
        foreach ($tasks as $task) {
            // $task->assignedOn = \Carbon\Carbon::make($task->assignedOn)->timestamp; 
            $task->assignedOn = date('D, d M', strtotime($task->assignedOn));
        }

        // dd($tasks);

        $projects = DB::table('projects')
            ->get();


        $data = compact('tasks', 'projects', 'users', 'manager');


        return view('index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = DB::table('users')
            // ->whereNotNull('manager_id')
            ->where('manager_id', session('manager_id'))
            ->orWhere('id', session('manager_id'))
            ->get();

        $projects = DB::table('projects')
            ->get();


        $data = compact('users', 'projects');

        return view('create', $data);
    }

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
        return redirect('/tasks/' . session('manager_name') . '/')->with('success', 'Task Has Been inserted');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        $task_id = request()->segment(2);
        $task = DB::table('tasks')
            ->join('projects', 'projects.id', '=', 'tasks.project_id')
            ->join('users', 'users.id', '=', 'tasks.user_id')
            ->select('tasks.*', 'projects.name as project_name', 'users.name as user_name')
            ->where('tasks.id', $task_id)
            ->first();

        return view('show', ['task' => $task]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    // public function edit(Task $task)
    public function edit(Request $request)
    {
        $task_id = request()->segment(3);
        $task = DB::table('tasks')
            ->join('projects', 'projects.id', '=', 'tasks.project_id')
            ->join('users', 'users.id', '=', 'tasks.user_id')
            ->select('tasks.*', 'projects.name as project_name', 'users.name as user_name')
            ->where('tasks.id', $task_id)
            ->first();

        // $users = DB::table('users')
        //     ->whereNotNull('manager_id')
        //     ->orWhere('id', session('manager_id'))
        //     ->get();

        $users = DB::table('users')
            // ->whereNotNull('manager_id')
            ->where('manager_id', session('manager_id'))
            ->orWhere('id', session('manager_id'))
            ->get();

        $projects = DB::table('projects')
            ->get();


        $data = compact('task', 'users', 'projects');

        return view('edit', $data);
    }

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
        return redirect('/tasks/' . session('manager_name') . '/')->with('success', 'Task Has Been updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Task $task)
    {

        echo $request->id;
        exit;
        // echo "hii php ";
        // $response = $task->delete();
        // $response = DB::table('tasks')->where('id', $request->id)->delete();

        // if (!$response) {
        //     App::abort(500, 'Error');
        // }
        // return redirect('tasks')->with('success', 'Task Has Been deleted successfully');
        // return redirect('/tasks/' . session('manager_name') . '/')->with('success', 'Task Has Been deleted successfully');
    }

    public function get_url()
    {
        echo '/tasks/' . session('manager_name') . '/';
    }
}