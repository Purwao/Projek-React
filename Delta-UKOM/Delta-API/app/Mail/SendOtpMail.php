<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class SendOtpMail extends Mailable
{
    public $otp;
    public $email;
    public function __construct($otp, $email)
    {
        $this->otp = $otp;
        $this->email = $email;
    }

    public function build()
    {
        return $this->subject('Delta OTP Code')
                    ->view('emails.otp')
                    ->with(['otp' => $this->otp,'email' => $this->email]);
    }
}