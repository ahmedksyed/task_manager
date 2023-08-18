<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/', function () {
    return redirect('/tasks');
});

// Route::resource('tasks', TaskController::class);


Route::get('tasks/create',[TaskController::class,'create'])->name('tasks.create');

Route::post('tasks/store',[TaskController::class,'store'])->name('tasks.store');
// Route::post('create',['as'=>'tasks.store','uses'=>'TaskController@store']);


Route::get('tasks/edit/{id}',[TaskController::class,'edit'])->name('tasks.edit');
// Route::get('tasks/edit/{id}',['as'=>'tasks.edit','uses'=>'TaskController@edit']);


Route::post('tasks/update',[TaskController::class,'update'])->name('tasks.update');
// Route::post('tasks/{id}',[TaskController::class,'update'])->name('tasks.update');
// Route::patch('tasks/{id}',['as'=>'tasks.update','uses'=>'TaskController@update']);

Route::post('tasks/delete',[TaskController::class,'destroy'])->name('tasks.destroy');
// Route::delete('tasks/{id}',[TaskController::class,'destroy'])->name('tasks.destroy');
// Route::delete('tasks/{id}',['as'=>'tasks.destroy','uses'=>'TaskController@destroy']);

Route::get('task/{id}',[TaskController::class,'show'])->name('tasks.view');
// Route::get('task/{id}',['as'=>'tasks.view','uses'=>'TaskController@view']);

// Route::get('tasks/{manager_name}',['as'=>'tasks.index','uses'=>'TaskController@index']);
// Route::get('tasks/{manager_name}',[TaskController::class,'index'])->name('tasks.index');

Route::get('tasks/{manager_name}/{employee?}',[TaskController::class,'index'])->name('tasks.index');
