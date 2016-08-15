(function($){
  "use strict";

  var tapTimer,
    moved     = false,   // flag to know if the finger had moved while touched the device
    threshold = 250;     // ms

  //////////////////////
  // special events

  $.event.special.doubleTap = {
      setup    : setup,
        teardown : teardown,
        handler  : handler
  };

    $.event.special.tap = {
        setup    : setup,
        teardown : teardown,
        handler  : handler
    };

  //////////////////////
  // events methods

  function setup(data, namespaces){
      var elm = $(this);

    if( elm.data('tap_event') == true )
      return;

    elm.bind('touchend.tap', handler)
        .bind('touchmove.tap', function(){
        moved = true;
      }).data('tap_event', true);
  }

  function teardown(namespaces) {
        $(this).unbind('touchend.tap touchmove.tap');
    }

  function handler(event){
  console.log(event);
    if( moved ){ // reset
      moved = false;
      return false;
    }

    var elem    = event.target,
      $elem     = $(elem),
      lastTouch = $elem.data('lastTouch') || 0,
      now     = event.timeStamp,
      delta     = now - lastTouch;

    // double-tap condition
    if( delta > 20 && delta < threshold  ){
      clearTimeout(tapTimer);
      return $elem.data('lastTouch', 0).trigger('doubleTap');
    }
    else
      $elem.data('lastTouch', now);


    tapTimer = setTimeout(function(){
      $elem.trigger('tap');
    }, threshold);
  }

})(jQuery);