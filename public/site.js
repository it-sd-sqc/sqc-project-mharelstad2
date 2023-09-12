  function myFunction() {
   var element = document.getElementsByTagName('body')[0];   
   element.classList.toggle("dark-mode");
   document.getElementById("button").innerHTML="☀️";

   if (element.classList.contains("dark-mode")) {
    document.getElementById("button").innerHTML="☀️";
   } else 
    document.getElementById("button").innerHTML="🌙";
   
  }
