/* 
Utility to generate images adopted for screen size
takes image class and custom atribute data tag and
produces generic implementation of <picture> element 
with alternative source for relaibility and adopted media size
to serve correct image for correct type of device

WHY?
To reduce code duplication from HTML. To show that I am able to manipulate DOM.
Hope you will like it)
*/

// Store Media Query constants
const mobileQuery = '(max-width: 576px)';
const tabletQuery = '(min-width: 576px) and (max-width: 991px)';
const desktopQuery = '(min-width: 992px)';

// Store Media Folder constants
const mobilePath = 'assets/images/mobile/';
const tabletPath = 'assets/images/mobile/';
const desktopPath = 'assets/images/desktop/';

// Match current device width
const mediaQueryMobile = window.matchMedia(mobileQuery);
const mediaQueryTablet = window.matchMedia(tabletQuery);
const mediaQueryDesktop = window.matchMedia(desktopQuery);

// Get elements with class name 'box'
const images = document.getElementsByClassName('responsive-img');

// Check if there images found for processing
const isResponsiveImagesFound = images.length > 0

// Loop through the collection if images found on the page
if (isResponsiveImagesFound) {
    for (const image of images) {
        if (mediaQueryMobile.matches) {
            assignSourceAccordingDeviceWidth(image, mobileQuery, mobilePath);
        } else if (mediaQueryTablet.matches) {
            assignSourceAccordingDeviceWidth(image, tabletQuery, tabletPath);
        } else if (mediaQueryDesktop.matches) {
            assignSourceAccordingDeviceWidth(image, desktopQuery, desktopPath);
        } else {
            // Desktop scenario used as a default fallback case
            assignSourceAccordingDeviceWidth(image, desktopQuery, desktopPath);
        }
    }
}

// Generates HTML for responsive images according to device width with fall back types similar to this:

/* 
<source srcset="assets/images/mobile/header/avalanche-logo.svg" media="(max-width: 576px)">
<source srcset="assets/images/mobile/header/avalanche-logo.svg" media="(min-width: 576px) and (max-width: 991px)">
<source srcset="assets/images/desktop/header/avalanche-logo.svg" media="(min-width: 992px)">
<source srcset="assets/images/desktop/header/avalanche-logo.svg" type="image/svg">
<source srcset="assets/images/desktop/header/avalanche-logo.png" type="image/png">
<img alt="Avalanche cyber news logotype" src="assets/images/desktop/header/avalanche-logo.svg"></img> 
*/

function assignSourceAccordingDeviceWidth(image, deviceType, sourcePath) {
    const imagePath = image.getAttribute('data-image-src');
    const imageTypes = image.getAttribute('data-image-types')?.split(',') ?? null;
    const section = image.getAttribute('data-image-section');
    const imageAlt = image.getAttribute('data-image-alt');

    const isDataCollectedFromElement = !!imagePath && Array.isArray(imageTypes) && !!section && !!imageAlt;

    if (isDataCollectedFromElement) {
        const sourceElement = document.createElement('source');
        sourceElement.media = deviceType;

        imageTypes.map(type => {
            const sourceElement = document.createElement('source');
            const imageSource = `${sourcePath}${section}/${imagePath}.${type}`
            sourceElement.srcset = imageSource;
            sourceElement.type = `image/${type}`;
            image.appendChild(sourceElement);
        })
    }
}

