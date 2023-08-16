/* 
Helpers to handle drag or slide behavior starts here
*/
const horisontalSections = document.querySelectorAll(".page-horisontal-section");

let isDragging = false;
let startPos = 0;
let prevMouseX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function dragStart(event) {
    if (event.type === 'touchstart') {
        startPos = event.touches[0].clientX;
    } else {
        startPos = event.clientX;
        event.preventDefault();
    }
    prevMouseX = startPos; // Set initial previous mouse X position
    isDragging = true;
}

function drag(event) {
    if (isDragging) {
        const currentPosition = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;

        // Check if mouse moved left, right otherwise
        if (currentPosition < prevMouseX) {
            console.log('Mouse moved left');
        } else {
            console.log('Mouse moved right');
        }

        prevMouseX = currentPosition;
    }
}

function dragEnd() {
    if (isDragging) {
        prevTranslate = currentTranslate;
        isDragging = false;
    }
}
/* 
Helpers to handle drag or slide behavior ends here
*/

/* 
Utility to handle screen resize behavior starts here
*/
function handleResizeForMainPageHorisontalSection() {


    // Handle resize of .page-horisontal-section
    if (mediaQueryMobile.matches) {
        addMobileClassToHorisontalSectionNavLinks(horisontalSections, drag, dragStart, dragEnd);
    } else {
        removeMobileClassFromHorisontalSectionNavLinks(horisontalSections, drag, dragStart, dragEnd);
    }

    /*
     Code responsible for .page-horisontal-section starts here 
     */
    //This code creates mobile view for main page .page-horisontal-section
    function addMobileClassToHorisontalSectionNavLinks(horisontalSections, drag, dragStart, dragEnd) {
        for (const horisontalSection of horisontalSections) {
            const navLinks = horisontalSection.querySelector(".nav-links");

            // Start draging
            navLinks.addEventListener('mousedown', dragStart);
            navLinks.addEventListener('touchstart', dragStart);
            // Draging in process
            navLinks.addEventListener('mousemove', drag);
            navLinks.addEventListener('touchmove', drag);
            // Dragging ends 
            navLinks.addEventListener('mouseup', dragEnd);
            navLinks.addEventListener('touchend', dragEnd);
            // Dragging ends
            navLinks.addEventListener('mouseleave', dragEnd);
            navLinks.addEventListener('touchcancel', dragEnd);
        }
    }

    function removeMobileClassFromHorisontalSectionNavLinks(horisontalSections, drag, dragStart, dragEnd) {
        for (const horisontalSection of horisontalSections) {
            const navLinks = horisontalSection.querySelector(".nav-links");
            // Start draging
            navLinks.removeEventListener('mousedown', dragStart);
            navLinks.removeEventListener('touchstart', dragStart);
            // Draging in process
            navLinks.removeEventListener('mousemove', drag);
            navLinks.removeEventListener('touchmove', drag);
            // Dragging ends 
            navLinks.removeEventListener('mouseup', dragEnd);
            navLinks.removeEventListener('touchend', dragEnd);
            // Dragging ends
            navLinks.removeEventListener('mouseleave', dragEnd);
            navLinks.removeEventListener('touchcancel', dragEnd);
        }
    }
    /*
   Code responsible for .page-horisontal-section starts here 
   */
}

// Fires image source option generation on resize event
addEventListener("resize", () => {
    handleResizeForMainPageHorisontalSection();
});

// Fires image source option generation after page loaded to match initial device width
addEventListener("DOMContentLoaded", () => {
    handleResizeForMainPageHorisontalSection();
});
/* 
Utility to handle screen resize behavior ends here 
*/