skrollr.init();
var scrollFlag = false;
var scrollBetween = false;
var interval = null;

function scrollRepeat(polarity) {
  var scroll = $(window).scrollTop();
  var scrollto = scroll + 50 * polarity;
  if (scrollFlag && !scrollBetween) {
    scrollBetween = true;
    $("html, body").animate({scrollTop: scrollto}, 0);
  }
  scrollBetween = false;
}

$(function() {
  $('html, body, *').keydown(function(e) {
        if (e.which == 39 || e.which == 37) {
        if (!scrollFlag) {
          // alert("TRUE")
          scrollFlag = true;
          interval = setInterval(function(){ scrollRepeat(e.which - 38) }, 17);
        }
        e.preventDefault();
        }
    });
  $('html, body, *').keyup(function(e) {
        if (e.which == 39 || e.which == 37) {
          if (scrollFlag) {
            // alert("hey!");
            scrollFlag = false;
            clearInterval(interval);
          }
        e.preventDefault();
        }
    });

  $('.menu-button').on('click touch', function() {
    var loc = $(this).css("--scroll-location");
    window.scroll({
      top: loc, 
      left: 0, 
      behavior: 'smooth' 
    });
  })
});

$('.menu-button').hover(
  function() {
    $(this).css({"fill": "#fff", 
                 "position": "relative",
                 "left": ".5vh"})
    $(this).siblings("text").css("fill", "#3c3c44")
  },
  function() {
    $(this).css("fill", "#3c3c44")
    $(this).siblings("text").css("fill", "#fff")
});
