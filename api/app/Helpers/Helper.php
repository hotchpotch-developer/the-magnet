<?php

use Illuminate\Support\Facades\Log;

if(!function_exists('jsonResponse')){

    function jsonResponse($status, $data = NULL, $success = NULL, $error = NULL, $errors = NULL) {

        return response()->json(["status" => $status, "data" => $data, "success" => $success, "error" => $error, "errors" => $errors]);      

    }

}

if(!function_exists('catchResponse')) {
    function catchResponse($method, $exception){
        \Log::error($method . ' Please check issue on line no '. $exception->getLine() .', error is '. $exception->getMessage());
        return jsonResponse(500, '',__('message.error.500'));
    }
}

?>