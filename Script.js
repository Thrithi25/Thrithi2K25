// Set the date we're counting down to
var countDownDate = new Date("March 20, 2025 10:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.querySelector(".Timer-Style").innerHTML = days + "d " + hours + "h " 
  + minutes + "m " + seconds + "s ";
  
  if (distance < 0) {
    clearInterval(x);
    document.querySelector(".Timer-Style").innerHTML = "EXPIRED";
  }
}, 1000);
