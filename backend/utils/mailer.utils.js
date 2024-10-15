import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
configDotenv();

const transporter = nodemailer.createTransport({
  service: 'gmail',  
  auth: {
    user: "dvar66501@gmail.com",
    pass: "xtqhbgafuccsaicr", 
  },
});

export async function sendVerifyEmail(email,data) {
  try {
    
    const info = await transporter.sendMail({
      from: '"Deepak" <dvar66501@gmail.com>', 
      to: email, 
      subject: data.subject, 
     html:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
        }
        .email-header {
            text-align: center;
            padding: 10px 0;
            background-color: #4CAF50;
            color: #ffffff;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .email-body {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        }
        .email-body h1 {
            font-size: 24px;
        }
        .email-body p {
            line-height: 1.6;
        }
        .token-box {
            background-color: #f8f9fa;
            padding: 15px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
            border-radius: 5px;
        }
        .email-footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            padding: 10px 0;
            border-top: 1px solid #e0e0e0;
        }
        .verify-button {
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            font-size: 18px;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            <h2>Email Verification</h2>
        </div>

        <!-- Email Body -->
        <div class="email-body">
            <h1>Hello,</h1>
            <p>Thank you for registering on our platform. To complete your registration, please use the following verification token:</p>

            <!-- Verification Token Box -->
            <div class="token-box">${data.token}</div>

            <p>If you did not request this, please ignore this email.</p>
           

        <!-- Email Footer -->
        <div class="email-footer">
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
    });

    console.log("Message sent: %s", info.messageId);
    return 1;
  } catch (error) {
    console.error("Error sending email:", error);
    return 0;
  }
}
export async function sendWelcomeEmail(data) {
    try {
      
      const info = await transporter.sendMail({
        from: '"Deepak" <dvar66501@gmail.com>', 
        to: data.email, 
        subject: "Email Verification", 
        html:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Basic Auth</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
        }
        .email-header {
            text-align: center;
            padding: 10px 0;
            background-color: #4CAF50;
            color: #ffffff;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .email-body {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        }
        .email-body h1 {
            font-size: 24px;
            color: #333;
        }
        .email-body p {
            line-height: 1.6;
            margin: 10px 0;
        }
        .email-body a {
            text-decoration: none;
            color: #4CAF50;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 18px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .email-footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            padding: 10px 0;
            border-top: 1px solid #e0e0e0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            <h2>Welcome to Basic Auth</h2>
        </div>

        <!-- Email Body -->
        <div class="email-body">
            <h1>Hello ${data.name},</h1>
            <p>Email successfully verified</p>
            <p>We are thrilled to have you on board with <strong>Basic Auth</strong>! Thank you for joining us and becoming part of our community.</p>
            
            <p>At Basic Auth, we are dedicated to providing a secure and seamless experience. Explore our platform to discover all the amazing features that will enhance your journey.</p>

            <p>If you ever have any questions or need assistance, don't hesitate to reach out to our support team. We're here to help you!</p>

            <!-- CTA Button -->
            

            <p>We hope you enjoy your time with us. Let’s build something amazing together!</p>

            <p>Best regards,<br>The Basic Auth Team</p>
        </div>

        <!-- Email Footer -->
        <div class="email-footer">
            <p>If you have any questions, feel free to contact our support team at support@basicauth.com.</p>
            <p>&copy; 2024 Basic Auth. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `
      });
  
      console.log("Message sent: %s", info.messageId);
      return 1;
    } catch (error) {
      console.error("Error sending email:", error);
      return 0;
    }}
export async function sendForgotPasswordEmail(data) {
        try {
          
          const info = await transporter.sendMail({
            from: '"Deepak" <dvar66501@gmail.com>', 
            to: data.email, 
            subject: "Password Reset", 
            html:`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .header {
            background-color: #28a745; /* Green header */
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333333;
            font-size: 22px;
        }
        p {
            font-size: 16px;
            color: #555555;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            color: #ffffff;
            background-color: #28a745; /* Green button */
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #218838; /* Darker green on hover */
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #888888;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
       Password Reset Request
    </div>
    <div class="container">
        <h1>Hello ${data.name},</h1>
        <p>We received a request to reset the password for your account on <strong>Basic Auth</strong>. If you made this request, click the button below to reset your password:</p>
        <a href="${data.reseturi}" class="button">Reset Password</a>
        <p>If you didn't request a password reset, please ignore this email or contact support if you have any concerns.</p>
        <p>Thanks,</p>
        <p>The Basic Auth Team</p>
        <div class="footer">
            <p>If the button doesn't work, copy and paste the following link into your browser:</p>
            <p>${data.reseturi}</p>
        </div>
    </div>
</body>
</html>
      `
 });
  console.log("Message sent: %s", info.messageId);
      return 1;
      } catch (error) {
       console.error("Error sending email:", error);
       return 0;
     }}
    
export async function sendResetPasswordEmail(data) {
    try {
        const info = await transporter.sendMail({
        from: '"Deepak" <dvar66501@gmail.com>', 
        to: data.email, 
        subject: "Password Reset", 
        html:`
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Success</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .header {
            background-color: #28a745; /* Green header */
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333333;
            font-size: 22px;
        }
        p {
            font-size: 16px;
            color: #555555;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #888888;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        Password Reset Successful
    </div>
    <div class="container">
        <h2>Congratulations!</h2>
        <p>Hello ${data.name},</p>
        <p>Your password has been successfully reset. You can now log in to your account using your new password.</p>
        <p>If you have any questions or need assistance, please feel free to reach out to our support team.</p>
        <p>Thank you for being a valued member of <strong>Basic Auth</strong>!</p>
        <p>Best regards,</p>
        <p>The Basic Auth Team</p>
        <div class="footer">
            <p>If you did not make this change, please contact support immediately.</p>
        </div>
    </div>
</body>
</html>

`});
     console.log("Message sent: %s", info.messageId);
        return 1;
        } catch (error) {
        console.error("Error sending email:", error);
         return 0;
     }}
       

export default {sendVerifyEmail,sendWelcomeEmail};
