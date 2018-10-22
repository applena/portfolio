let $vid = $('#video');
let $pauseButton = $('#pause-button');

function vidFade() {
  $vid.addClass('stopfade');
}

$vid.on('ended', function(){
  $pauseButton.text('Play');
  vidFade();
});

$pauseButton.on('click', function() {
  $vid.toggleClass('stopfade');
  if ($vid.get(0).paused) {
    $vid.get(0).play();
    $pauseButton.text('Pause');
  } else {
    $vid.get(0).pause();
    $pauseButton.text('Play');
  }
});


// function checkWidth() {
//   let windowsize = $(window).width();
//   if (windowsize <= 960) {
//     $('.icon').removeClass('icon');
//     $('.icon').removeClass('fa-th');
//   }
// }
// checkWidth();
// $(window).resize(checkWidth);



