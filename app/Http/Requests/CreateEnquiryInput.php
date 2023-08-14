<?php
// app/Http/Requests/EnquiryInput.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateEnquiryInput extends FormRequest
{
    public function rules()
    {
        return [
            'operator_id' => 'required|uuid',
            'property_id' => 'required|string',
            'room_id' => 'required|string',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:10000',
            'contact_number' => 'required|string|max:20',
        ];
    }
}

