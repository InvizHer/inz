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

function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");

    if (sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        closeBtn.classList.add("hide");
        openBtn.classList.remove("hide");
    } else {
        sidebar.classList.add("open");
        openBtn.classList.add("hide");
        closeBtn.classList.remove("hide");
    }
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.categories-modal'),
    modalBtns = document.querySelectorAll('.categories-button'),
    modalClose = document.querySelectorAll('.categories-modal-close')

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((mb, i) => {
    mb.addEventListener('click', () => {
        modal(i);
    });
});

modalClose.forEach((mc) => {
    mc.addEventListener('click', () => {
        modalViews.forEach((mv) => {
            mv.classList.remove('active-modal');
        });
    });
});
