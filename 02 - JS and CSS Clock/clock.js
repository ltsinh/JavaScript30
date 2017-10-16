'use strict';
(function() {

  var clock = {

    element: document.querySelector('#clock'),
    seconds: 0,
    minutes: 0,
    hours: 0,

    /**
     * Initialize the clock on page load
     */
    init: function() {

      /**
       * Get DOM elements and create clock hand objects
       */
      clock.hands = {
        second: clock.element.querySelector('#second-hand'),
        minute: clock.element.querySelector('#minute-hand'),
        hour: clock.element.querySelector('#hour-hand'),  
      };

      this.update( new Date() );

      /* the hands start out invisible, so they don't 'jump' into
         position on page load. Thus, we need to make them visible */
      for( var hand in this.hands ) {
        this.hands[hand].style.display = 'block';
      }
    },

    /**
     * Callback to update the clock each second
     */
    update: function( time ) {

      this.seconds = time.getSeconds();
      this.minutes = time.getMinutes();
      this.hours = time.getHours();
      
      this.setSecondHand();
      this.setMinuteHand();
      this.setHourHand();
    },

    /**
     * Set the seconds hand
     */
    setSecondHand: function() {
      const degrees = this.seconds / 60 * 360;
      this.rotateHand( this.hands.second, degrees );
    },

    /**
     * Set the minutes hand
     */
    setMinuteHand: function() {
      const degrees = ( this.minutes + this.seconds / 60 ) / 60 * 360;
      this.rotateHand( this.hands.minute, degrees );
    },

    /**
     * Set the hours hand
     */
    setHourHand: function() {
      const degrees = ( this.hours + this.minutes / 60 + this.seconds / 3600 ) / 12 * 360;
      this.rotateHand( this.hands.hour, degrees );
    },

    /**
     * Rotate a clock hand by a given amount
     */
    rotateHand: function( hand, degrees ) {
      degrees += 90;
      hand.style.transform = `rotate(${degrees}deg)`;
    },
  };

  clock.init();
  setInterval( () => clock.update( new Date ), 1000 );
})(); // end: scope funciton