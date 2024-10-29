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
        greetingText = "Good Evening, I'm";
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

//Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // User is scrolling down
            header.style.top = "-100px"; // Adjust as per your header height
        } else {
            // User is scrolling up
            header.style.top = "0";
        }
        lastScrollTop = scrollTop;
    });

/*=============== FILTERS TABS ===============*/

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".filters-button");
    const sections = document.querySelectorAll(".filters-container > div");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-target");

            // Toggle active button class
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Toggle sections visibility
            sections.forEach(section => {
                if (section.getAttribute("data-content") === target) {
                    section.classList.add("filters__active");
                    section.classList.remove("filter__inactive");
                } else {
                    section.classList.add("filter__inactive");
                    section.classList.remove("filters__active");
                }
            });
        });
    });
});

