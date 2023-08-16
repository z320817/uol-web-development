/* 
Utility to handle screen resize behavior starts here
*/
function handleResizeForMainPageHorisontalSection() {

    // Handle resize of .page-horisontal-section
    if (mediaQueryMobile.matches) {
        createMobileMainPageHorisontalSection()
    } else if (mediaQueryTablet.matches) {

    } else if (mediaQueryDesktop.matches) {

    }

    /*
     Code responsible for .page-horisontal-section starts here 
     */
    //This code creates mobile view for main page .page-horisontal-section
    function createMobileMainPageHorisontalSection() {
        const horisontalSections = document.querySelectorAll(".page-horisontal-section");

        for (let i = 0; i < horisontalSections.length; i++) {
            console.log(horisontalSections[i])
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