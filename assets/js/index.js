/* 
Helpers to handle drag or slide behavior starts here
*/
const horisontalSections = document.querySelectorAll(".page-horisontal-section");

let isDragging = false;
let startPos = 0;
let prevMouseX = 0;
let sectionId;
const activeIndexes = [];
const directions = { left: false, right: false }

// Set initial active indexes
horisontalSections.forEach((_, index) => {
    activeIndexes[index] = 0;
});

// Event handler for start sliding/dragging
function indexController(direction) {
    for (const horisontalSection of horisontalSections) {
        // Count article elements in index
        let articleCount = 0;
        // Find the nav-links element within the section
        const articleLinks = horisontalSection.querySelectorAll('.page-horisontal-section-tile');
        // Get the section ID from the data attribute
        sectionId = horisontalSection.getAttribute('data-section-id');


        // Remove 'active' class from all <li> elements
        articleLinks.forEach((li, index) => {
            if (li.classList.contains('active')) {
                activeIndexes[sectionId] = index;
            };
            li.classList.remove('active');
            articleCount++;
        });


        sectionCurrentIndex = activeIndexes[sectionId];
        const isIndexExist = typeof sectionCurrentIndex === 'number' && !isNaN(sectionCurrentIndex) && sectionCurrentIndex !== undefined;

        if (isIndexExist) {
            if (direction.left) {
                activeIndexes[sectionId] = (activeIndexes[sectionId] - 1 + articleCount) % articleCount;
                setCurrentActiveIndex(activeIndexes[sectionId], articleLinks);
            } else {
                activeIndexes[sectionId] = (activeIndexes[sectionId] + 1) % articleCount;
                setCurrentActiveIndex(activeIndexes[sectionId], articleLinks);
            }
        }

        // Add 'active' class to the <li> element at the target index
        // articleLinks[targetIndex].classList.add('active');
    }
}

// Event handler for start sliding/dragging
function dragStart(event) {
    if (event.type === 'touchstart') {
        startPos = event.touches[0].clientX;
    } else {
        startPos = event.clientX;
        event.preventDefault();
    }
    // Set initial previous mouse X position
    prevMouseX = startPos;
    isDragging = true;
}

// Event handler for process of sliding/dragging
function drag(event) {
    if (isDragging) {
        // Get mouse position
        const currentPosition = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;

        // Set directions back to default
        directions.left = false;
        directions.right = false;

        // Check if mouse moved left, right otherwise
        if (currentPosition < prevMouseX) {
            directions.left = true;
            indexController(directions);
            console.log('Mouse moved left');
        } else {
            directions.right = true;
            indexController(directions)
            console.log('Mouse moved right');
        }

        prevMouseX = currentPosition;
    }
}

// Event handler for ending of sliding/dragging
function dragEnd() {
    if (isDragging) {
        isDragging = false;
    }
}

// Set current active index
function setCurrentActiveIndex(currentActiveIndex, articleLinks) {
    articleLinks.forEach((li, index) => {
        if (index === currentActiveIndex) {
            li.classList.add('active');
        };
    });
}

// Check if index exist to prevent out of range error

/* 
Helpers to handle drag or slide behavior ends here
*/

/* 
Utility to handle screen resize behavior of .page-horisontal-section starts here
*/
//  Makes sure that events are created only on mobile screens, othervise events removed
function handleResizeForMainPageHorisontalSection() {


    // Handle resize of .page-horisontal-section
    if (mediaQueryMobile.matches) {
        addEventListeners(horisontalSections, drag, dragStart, dragEnd);
    } else {
        removeEventListeners(horisontalSections, drag, dragStart, dragEnd);
    }

    // This code adds event listners to .nav-links
    function addEventListeners(horisontalSections, drag, dragStart, dragEnd) {
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

    // This code removes event listners to .nav-links
    function removeEventListeners(horisontalSections, drag, dragStart, dragEnd) {
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
}

// Fires resize handler on device resize
addEventListener("resize", () => {
    handleResizeForMainPageHorisontalSection();
});

// Fires resize handler after content loaded
addEventListener("DOMContentLoaded", () => {
    handleResizeForMainPageHorisontalSection();
});
/* 
Utility to handle screen resize behavior of .page-horisontal-section ends here
*/