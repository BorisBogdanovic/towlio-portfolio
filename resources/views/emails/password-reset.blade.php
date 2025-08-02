<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0" />
  <title>Password Reset</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />

  <style>
    html, body, p, h1 {
      margin: 0;
      padding: 0;
      font-size: 100%;
    }
    body {
      background-color: #000;
      font-family: 'Inter', sans-serif;
    }
    table {
      border-spacing: 0;
    }
    .email-heading {
      color: #344054;
      font-size: 20px;
      font-weight: 500;
      line-height: 20px;
    }
    .email-paragraph {
      color: #344054;
      font-size: 14px;
      font-weight: 400;
      line-height: 140%;
    }
    .email-link {
      color: #21409A;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      text-decoration: underline;
      margin-left: 16px;
      display: block;
      max-width: 470px;
      overflow-wrap: break-word;
      hyphens: manual;
    }
    .mb-32 {
      margin-bottom: 32px;
    }
    .button {
      display: inline-block;
      background-color: #21409A;
      color: white !important;
      padding: 12px 24px;
      border-radius: 4px;
      font-weight: 500;
      text-decoration: none;
      margin-top: 16px;
    }
  </style>
</head>
<body>
<center>
  <div>
    <table style="max-width: 740px; width: 100%; margin: 50px 0;">
      <thead>
        <tr>
          <td style="background-color: #F9FAFB; height: 94px; padding: 10px;">
            <div style="padding: 32px;">
              <img height="40" src="https://rkxgxhniyyxsdxniswfk.supabase.co/storage/v1/object/public/images/logo.svg" alt="Logo" />
            </div>
          </td>
        </tr>
      </thead>
      <tbody style="background-color: #fff;">
        <tr>
          <td style="padding: 48px 56px;">
            <h1 class="email-heading mb-32">Password Reset Request</h1>
            <p class="email-paragraph mb-32">
              Hello, {{$user->name}} {{$user->last_name}},
            </p>
            <p class="email-paragraph mb-32">
              We received a request to reset your password. Click the button below to set a new password. If you did not request this, please ignore this email.
            </p>

            <a href="{{$url}}" class="button">Reset Password</a>

            <p class="email-paragraph mb-32" style="margin-top: 32px;">
              Or copy and paste the following link into your browser:
            </p>

            <div style="border:1px solid #D0D5DD; border-radius: 4px; padding: 16px; max-width: 470px;">
              <a href="{{$url}}" class="email-link">{{$url}}</a>
            </div>

            <p class="email-paragraph" style="margin-top: 32px;">
              Kind regards,<br />
              Towlio Team
            </p>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td style="background-color: #F9FAFB; height: 94px; padding: 10px;">
            <div style="padding: 32px; color: #98A2B3; font-size: 14px; font-weight: 500; line-height: 20px;">
              <p>Slavke Djurdjevic 4</p>
              <p>35000 Jagodina</p>
              <p>Serbia</p>
              <p>Tel: +381 11 1111 111, 1111 111</p>
              <p>Fax: +381 11 1111 222</p>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</center>
</body>
</html>
