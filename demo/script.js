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


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve values from form fields
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Define the recipient, subject, and body content
    const recipient = "invizher@gmail.com";
    const subject = "I want to discuss about...";
    const body = `Name: ${name}\n\nMessage: ${message}`;

    // Create the mailto link
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the user's email client with the pre-filled email
    window.location.href = mailtoLink;
});


// Get elements
const progressBtn = document.querySelector('.progress-btn');
const progressPath = document.querySelector('.progress-circle-path');

// Calculate values
const pathLength = progressPath.getTotalLength();
progressPath.style.strokeDasharray = pathLength;
progressPath.style.strokeDashoffset = pathLength;

// Update progress and button visibility
function updateProgress() {
  // Calculate scroll progress (0 to 1)
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const progress = Math.min(scrolled / windowHeight, 1);
  
  // Update circle progress
  const dashoffset = pathLength - (progress * pathLength);
  progressPath.style.strokeDashoffset = dashoffset;
  
  // Show/hide button
  if (scrolled > window.innerHeight * 0.3) {
    progressBtn.classList.add('visible');
  } else {
    progressBtn.classList.remove('visible');
  }
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Event listeners
window.addEventListener('scroll', updateProgress);
progressBtn.addEventListener('click', scrollToTop);
