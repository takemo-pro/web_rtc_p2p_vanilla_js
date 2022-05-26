<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Voice Chat Room</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
{{--        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">--}}
        <link href="{{mix('css/app.css')}}" rel="stylesheet">
        <style>
            div.room{
                display: flex;

            }
            div#local_media_container{
                display: inline-flex;
                flex-direction: column;
                justify-content: start;
                text-align: start;
            }
            div#remote_media_container{
                display: inline-flex;
                flex-direction: column;
                justify-content: start;
                text-align: start;
            }
        </style>
    </head>
    <body >
        <div id="app">
            <div class="room">
                <div id="local_media_container">
                    <video id="local_media" style="background: black;" width="400" height="300"></video>

                    <input type="text" placeholder="Room Name" id="room_name">
                    <button id="create_room_btn">Create Room</button>

                    <input type="text" placeholder="Room Id" id="room_id">
                    <button id="join_room_btn">Join Room</button>
                    <button id="leave_btn">Leave</button>
                </div>

                <div id="remote_media_container"></div>
            </div>
            <div id="room_info">

            </div>
        </div>
    </body>
    <script src="{{mix('js/app.js')}}"></script>
</html>
