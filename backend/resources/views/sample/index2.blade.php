<!doctype html>
<html lang="ja">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Signaling test</title>
</head>
<body>
<h1>Hand Signaling 2016</h1>

{{--<button id="start_video_btn" type="button">Start Video</button>--}}
{{--<button id="stop_video_btn" type="button">Stop Video</button>--}}
{{--&nbsp;--}}
<button id="connect_btn" type="button">Connect</button>
<button id="hangup_btn" type="button">Hang Up</button>

<div>
{{--    <audio id="local_media" autoplay style="width: 160px; height: 120px; border: 1px solid black;"></audio>--}}
{{--    <audio id="remote_media" autoplay style="width: 160px; height: 120px; border: 1px solid black;"></audio>--}}
    <video id="local_media" autoplay style="width: 240px; height: 180px; border: 1px solid black;"></video>
    <video id="remote_media" autoplay style="width: 240px; height: 180px; border: 1px solid black;"></video>
</div>

</body>

<script src="{{mix('js/app.js')}}"></script>
</html>
