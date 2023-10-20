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

initCounterAnimation();
AOS.init();