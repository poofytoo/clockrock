// Your client side JavaScript here
navigator.vibrate = navigator.vibrate ||
                  navigator.webkitVibrate ||
                  navigator.mozVibrate || 
                  navigator.msVibrate;

if (navigator.vibrate) {
  $('#test').text('we can vibrate');
  navigator.vibrate(500);
} else {
  $('#test').text('no vibration for you :-(');
}