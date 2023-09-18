<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use DB;

class TeamController extends Controller
{
    /**
     * Create Team Member
     * 
     * @author Vishal Soni
     * @package Team
     * @param Request $request
     * @return JSON
     */

    public function createTeam(Request $request) {
        try {
            $rule = [
                'first_name' => 'required|alpha',
                'last_name' => 'required|alpha',
                'phone' => 'required|unique:users,phone',
                'email' => 'required|unique:users,email',
                'role' => 'required',
                'password' => 'required',
                'status' => 'required',
                'employee_id' => 'required|unique:users,emp_id'
            ];

            if($request->has('profile_image')){
                $rule = array_merge($rule, ['profile_image' => 'required|max:3000|mimes:jpeg,png,jpg']);
            }

            if ($errors = isValidatorFails($request, $rule)) return $errors;

            if($request->has('profile_image')){
                $profile_image = uploadFiles($request, 'profile_image', 'profile');
            }

            DB::beginTransaction();

            $team = new User;

            $team->emp_id = $request->employee_id;
            $team->first_name = $request->first_name;
            $team->last_name = $request->last_name;
            $team->phone = $request->phone;
            $team->email = $request->email;
            $team->role_id = $request->role;
            $team->password = Hash::make($request->password);
            $team->profile_image = isset($profile_image) ? $profile_image : NULL;

            $team->save();

            DB::commit();

            return jsonResponse(status: true, success: __('message.team.create'));

        } catch (\Throwable $th) {
            DB::rollBack();
            return catchResponse(method: __METHOD__, exception: $th);
        }
    }
}
