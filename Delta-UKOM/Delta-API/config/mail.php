<?php

return [
    'driver' => env('MAIL_MAILER', 'smtp'),
    'host' => env('MAIL_HOST', 'smtp.mailtrap.io'),
    'port' => env('MAIL_PORT', 2525),
    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'purwaarda@gmail.com'),
        'name' => env('MAIL_FROM_NAME', 'purwaarda@gmail.com'),
    ],
    'encryption' => env('MAIL_ENCRYPTION', 'tls'),
    'username' => env('MAIL_USERNAME', 'purwaarda@gmail.com'),
    'password' => env('MAIL_PASSWORD'),
    'sendmail' => '/usr/sbin/sendmail -bs',
];