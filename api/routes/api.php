<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PermissionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function() {
    
    #Get User Info
    Route::get('get-auth-user-info', [AuthController::class, 'getAuthUserInfo']);

    #Logout
    Route::get('logout', [AuthController::class, 'logout']);

    #Permission
    Route::post('create-role', [PermissionController::class, 'createRole']);
    Route::post('edit-role', [PermissionController::class, 'editRole']);
    Route::get('delete-role/{id}', [PermissionController::class, 'deleteRole']);
    Route::get('role-list', [PermissionController::class, 'roleList']);

    Route::get('permission-list', [PermissionController::class, 'permissionList']);

});