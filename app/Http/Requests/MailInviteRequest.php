<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MailInviteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
       return [
    'email' => ['required', 'email', 'unique:users,email'],
    'token' => ['sometimes', 'string'], 
    'last_name' => ['required', 'string', 'max:50'], 
    'name' => ['required', 'string', 'max:50'],      
    'phone' => ['required', 'string', 'regex:/^\+?[0-9\-\s]{6,20}$/'],
];
    }
}
