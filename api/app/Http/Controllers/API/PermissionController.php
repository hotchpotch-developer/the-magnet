<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use DB;

class PermissionController extends Controller
{
    /**
     * Create Role
     * 
     * @author Vishal Soni  
     * @package Permission
     * @param Request $request
     * @return JSON
     */

    public function createRole(Request $request) {
        try {
            $rule = [
                'role_name' => 'required|unique:roles,name'
            ];

            if ($errors = isValidatorFails($request, $rule)) return $errors;

            DB::beginTransaction();
            $role = new Role;

            $role->name = $request->role_name;
            $role->save();

            DB::commit();

            return jsonResponse(status: true, success: __('message.create', ['Role']));

        } catch (\Throwable $th) {
            DB::rollBack();
            return catchResponse(method: __METHOD__, exception: $th);
        }
    }

    /**
     * Edit Role
     * 
     * @author Vishal Soni  
     * @package Permission
     * @param Request $request
     * @return JSON
     */

    public function editRole(Request $request) {
        try {
            $rule = [
                'role_name' => 'required|unique:roles,name'
            ];

            if ($errors = isValidatorFails($request, $rule)) return $errors;

            DB::beginTransaction();
            $role = Role::where('id', $request->id)->first();

            $role->name = $request->role_name;
            $role->save();

            DB::commit();

            return jsonResponse(status: true, success: __('message.update', ['Role']));

        } catch (\Throwable $th) {
            DB::rollBack();
            return catchResponse(method: __METHOD__, exception: $th);
        }
    }

    /**
     * Delete Role
     * 
     * @author Vishal Soni  
     * @package Permission
     * @param Request $request
     * @return JSON
     */

     public function deleteRole(Request $request) {
        try {

            DB::beginTransaction();

            Role::where('id', $request->id)->delete();

            DB::commit();

            return jsonResponse(status: true, success: __('message.delete', ['Role']));

        } catch (\Throwable $th) {
            DB::rollBack();
            return catchResponse(method: __METHOD__, exception: $th);
        }
    }
}
