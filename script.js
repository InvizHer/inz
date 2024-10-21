//Navbar functionality
function openNav() {
    document.getElementById("mySidebar").style.left = "0";
    
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.left = "-720px";
  }

  // display sticky header when scroll
  document.addEventListener('DOMContentLoaded', function() {
    const greetingMessage = document.getElementById('greeting-message');

    const now = new Date();
    const hours = now.getHours();

    let greetingText = '';

    if (hours >= 5 && hours < 12) {
        greetingText = "Good Morning, I'm";
    } else if (hours >= 12 && hours < 17) {
        greetingText = "Good Afternoon, I'm";
    } else if (hours >= 17 && hours < 20) {
        greetingText = "Good Evening, I'm";
    } else {
        greetingText = "Good Night, I'm";
    }

    greetingMessage.textContent = greetingText;
});