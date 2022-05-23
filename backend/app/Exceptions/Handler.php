<?php

namespace App\Exceptions;

use App\Exceptions\Http\InvalidRequestException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (Throwable $e,Request $request) {
            if($request->is('api/*')){
                if($e instanceof NotFoundHttpException){
                    return response()->error($e);
                }

                if($e instanceof ValidationException){
                    return response()->validationError($e);
                }

                if($e instanceof InvalidRequestException){
                    return response()->json([
                        'message' => '入力に誤りがあります',
                        'errors' => [
                            'global' => $e->getMessage(),
                        ]
                    ],422);
                }

                if($e instanceof HttpExceptionInterface){
                    return response()->error($e);
                }

                return response()->error($e);
            }
        });
    }
}
