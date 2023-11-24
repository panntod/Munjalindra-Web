function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function initCounterAnimation() {
    const valueDisplays = document.querySelectorAll('.num');
    const duration = 2000;

    valueDisplays.forEach((valueDisplay) => {
        let animationStarted = false;

        function startCounterAnimation() {
            if (!animationStarted && isElementInViewport(valueDisplay)) {
                animationStarted = true;
                const endValue = parseInt(valueDisplay.getAttribute('data-val'));
                let startTime;

                function updateCounter(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const progress = timestamp - startTime;
                    if (progress < duration) {
                        const value = Math.floor((progress / duration) * endValue);
                        valueDisplay.textContent = value;
                        requestAnimationFrame(updateCounter);
                    } else {
                        valueDisplay.textContent = endValue;
                    }
                }

                requestAnimationFrame(updateCounter);
            }
        }

        window.addEventListener('scroll', startCounterAnimation);
        startCounterAnimation(); 
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("scrollToTop");
    const navLinks = document.querySelectorAll(".navbar-nav a");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const hamburger = document.querySelector(".hamburger");
  
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
          // Check if viewport is mobile (Bootstrap lg breakpoint)
          navbarToggler.click();
        }
      });
    });
  
    window.addEventListener("scroll", () => {
      if (window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
        navbarToggler.click(); // Tutup navbar jika sedang terbuka pada saat scroll
      }
    });
  
    function toggleButtonVisibility() {
      if (window.scrollY > 50) {
        button.style.display = "block";
      } else {
        button.style.display = "none";
      }
    }
  
    function toggleInnerHTML() {
      const ariaExpandedValue = navbarToggler.getAttribute("aria-expanded");
      if (ariaExpandedValue === "true") {
        hamburger.innerHTML = "x"; // Ubah inner HTML jika navbar aktif
      } else {
        hamburger.innerHTML = "&#8801;"; // Kembalikan inner HTML jika navbar tidak aktif
      }
    }
  
    navbarToggler.addEventListener("click", () => {
      toggleInnerHTML();
    });
  
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    window.addEventListener("scroll", toggleButtonVisibility);
  });

initCounterAnimation();
AOS.init();