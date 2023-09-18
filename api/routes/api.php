<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\CommonController;
use App\Http\Controllers\API\TeamController;

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

    #Common
    Route::get('common-dropdown', [CommonController::class, 'commonDropDown']);

    Route::post('add-department', [CommonController::class, 'addDepartment']);
    Route::post('edit-department', [CommonController::class, 'editDepartment']);
    Route::get('delete-department/{id}', [CommonController::class, 'deleteDepartment']);
    Route::get('department-list', [CommonController::class, 'departmentList']);

    Route::post('add-industry', [CommonController::class, 'addIndustry']);
    Route::post('edit-industry', [CommonController::class, 'editIndustry']);
    Route::get('delete-industry/{id}', [CommonController::class, 'deleteIndustry']);
    Route::get('industry-list', [CommonController::class, 'industryList']);

    Route::post('add-location', [CommonController::class, 'addLocation']);
    Route::post('edit-location', [CommonController::class, 'editLocation']);
    Route::get('delete-location/{id}', [CommonController::class, 'deleteLocation']);
    Route::get('location-list', [CommonController::class, 'locationList']);





    #Auth
    Route::get('logout', [AuthController::class, 'logout']);

    #Permission
    Route::post('create-role', [PermissionController::class, 'createRole']);
    Route::post('edit-role', [PermissionController::class, 'editRole']);
    Route::get('delete-role/{id}', [PermissionController::class, 'deleteRole']);
    Route::get('role-list', [PermissionController::class, 'roleList']);

    Route::get('permission-list', [PermissionController::class, 'permissionList']);
    Route::post('create-permission', [PermissionController::class, 'createPermission']);
    Route::post('edit-permission', [PermissionController::class, 'editPermission']);
    Route::get('delete-permission/{id}', [PermissionController::class, 'deletePermission']);

    Route::post('assign-permission', [PermissionController::class, 'assignPermission']);

    #Teams
    Route::post('create-team', [TeamController::class, 'createTeam']);
    Route::post('edit-team', [TeamController::class, 'editTeam']);
    Route::get('team-list', [TeamController::class, 'teamList']);

});