<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">

    <style>
        html, body , p, h1 {
            margin: 0;
            padding: 0;
            font-size: 100%;
        }
        body{
            background-color:#000;
            font-family: 'Inter', sans-serif;
        }
        table{
            border-spacing:0;
        }

        .email-heading{
            color: #344054;
            font-size: 20px;
            font-family: Inter;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
        }

        .email-paragraph{
            color: #344054;
            font-size: 14px;
            font-family: Inter;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
        }

        .email-link{
            color: #21409A;
            font-size: 14px;
            font-family: Inter;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            text-decoration-line: underline;
            margin-left: 16px; display: block;
            max-width:470px;
            overflow-wrap: break-word;
            hyphens: manual;
        }
        .mb-32{
            margin-bottom: 32px;
        }
    </style>
</head>
<body>
<center>
    <div>
    
        <table style="max-width: 740px; width: 100%; margin: 50px 0">
            <thead>
            
            <tr style="">
                <td style="background-color: #F9FAFB; height: 94px; padding: 10px;">
                    <div style="padding:32px">
                        
                       <img height="40px" src="https://rkxgxhniyyxsdxniswfk.supabase.co/storage/v1/object/public/images/logo.svg" alt="Logo">
                    </div>
                </td>
            </tr>
            
            </thead>
            <tbody style="background-color: #fff">
    
            
            <tr>
                <td style="padding: 48px 56px;">
                    <h1 class="email-heading mb-32">Hello, {{$invite->name}} {{$invite->last_name}}</h1>
                    <p class="email-paragraph mb-32">You have been invited to join our platform. To complete your registration, please click the link below.</p>
                    <div>
                        <p class="email-paragraph">Registration link:</p>
                        <div class="mb-32" style="border:1px solid #D0D5DD; border-radius: 4px; padding: 16px; ">
                            <table>
                                <tr>
                                    <td>
                                        <img width="48" src="https://rkxgxhniyyxsdxniswfk.supabase.co/storage/v1/object/public/images//link.svg" alt="Link">
                                    </td>
                                    <td>
                                        <a href="{{$url}}" class="email-link">
                                            {{$url}}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                       <p class="email-paragraph">
    Kind regards,<br />Towlio Team
</p>

                    </div>
                </td>
            </tr>
            <!-- ./Email body content goes here -->
    
            </tbody>
            <tfooter>
                <!-- Email footer content goes here -->
                <tr style="">
                   <td style="background-color: #F9FAFB; height: 94px; padding: 10px;">
    <div style="padding:32px; color: #98A2B3;font-size: 14px; font-weight: 500; line-height: 20px;">
        <p class="paragraph">Slavke Djurdjevic 4</p>
        <p class="paragraph">35000 Jagodina</p>
        <p class="paragraph">Serbia</p>
        <p class="paragraph">Tel: +381 11 1111 111, 1111 111</p>
        <p class="paragraph">Fax: +381 11 1111 222</p>
    </div>
</td>
                </tr>
                <!-- ./Email footer content goes here -->
            </tfooter>
        </table>
    </div>
    <center>

</body>
</html>
