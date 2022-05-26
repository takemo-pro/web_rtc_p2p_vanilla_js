<?php

namespace App\Http\Requests\Api\Signaling;

use Illuminate\Foundation\Http\FormRequest;

class AnswerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'local_user_id' => 'required|exists:connection_units,id',
            'remote_user_id' => 'required|exists:connection_units,id',
            'sdp' => 'required|array',
        ];
    }
}
