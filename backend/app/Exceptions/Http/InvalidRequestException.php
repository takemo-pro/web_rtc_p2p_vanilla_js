<?php

namespace App\Exceptions\Http;

use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * リクエスト以外のグローバルバリデーションエラー
 */
class InvalidRequestException extends HttpException
{
    public function __construct(?string $message = '入力に誤りがあります', \Throwable $previous = null, array $headers = [], ?int $code = 0)
    {
        $statusCode = 422;
        parent::__construct($statusCode, $message, $previous, $headers, $code);
    }
}
