// Global variables
/* Start store initial footer state */
let footer = null;
let isMobileFooterCreated = false;
/* Ends store initial footer state */

/* 
Utility to generate images adopted for screen size starts here
It takes image class and custom atribute data tag and
produces generic implementation of <picture> element 
with alternative source for relaibility and adopted media size
to serve correct image for correct type of device
*/
function handleResize() {
  if (!isMobileFooterCreated) {
    copyFooterSectionInMemory();
  }

  // Store Media Query constants
  const mobileQuery = "(max-width: 575.98px)";
  const tabletQuery = "(min-width: 576px) and (max-width: 991.98px)";
  const desktopQuery = "(min-width: 992px)";

  // Store Media Folder constants
  const mobilePath = "assets/images/mobile/";
  const tabletPath = "assets/images/mobile/";
  const desktopPath = "assets/images/desktop/";

  // Match current device width
  const mediaQueryMobile = window.matchMedia(mobileQuery);
  const mediaQueryTablet = window.matchMedia(tabletQuery);
  const mediaQueryDesktop = window.matchMedia(desktopQuery);

  // Get elements with class name 'box'
  const images = document.getElementsByClassName("responsive-img");

  // Check if there images found for processing
  const isResponsiveImagesFound = images.length > 0;

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

  // Handle resize of elements besides images
  if (mediaQueryMobile.matches) {
    createMobileFooter();
  } else if (mediaQueryTablet.matches) {
    if (isMobileFooterCreated) {
      restoreFooterState(footer);
    }
  } else if (mediaQueryDesktop.matches) {
    if (isMobileFooterCreated) {
      restoreFooterState(footer);
    }
  }

  // Generates HTML for responsive images according to device width with fall back types similar to this:

  /* 
    <picture class="responsive-img" data-image-src="avalanche-logo" data-image-types="svg,png" data-image-section="header">
        <source srcset="assets/images/mobile/header/avalanche-logo.png" media="(min-width: 576px) and (max-width: 991.98px)" type="image/png">
        <source srcset="assets/images/mobile/header/avalanche-logo.svg" media="(min-width: 576px) and (max-width: 991.98px)" type="image/svg">          
        <img alt="Avalanche cyber news logotype" src="assets/images/mobile/header/avalanche-logo.svg">
    </picture>
  */
  function assignSourceAccordingDeviceWidth(image, deviceType, sourcePath) {
    // First, remove previous source tags
    clearUnusedSources(image);

    // Collect required data from data atribute
    const imagePath = image.getAttribute("data-image-src");
    const imageTypes =
      image.getAttribute("data-image-types")?.split(",") ?? null;
    const section = image.getAttribute("data-image-section");

    // Check if data collected to prevent unexpected errors
    const isDataCollectedFromElement =
      !!imagePath && Array.isArray(imageTypes) && !!section;

    if (isDataCollectedFromElement) {
      // Create source options based on provided types
      imageTypes.map((type) => {
        const sourceElement = document.createElement("source");
        const imageSource = `${sourcePath}${section}/${imagePath}.${type}`;

        sourceElement.srcset = imageSource;
        sourceElement.media = deviceType;
        sourceElement.type = `image/${type}`;

        image.prepend(sourceElement);
      });
    }
  }

  // Removes sources generated on previous resize event cycle
  function clearUnusedSources(image) {
    const usedSourceElements = image.getElementsByTagName("source");
    const isUnusedSourcesExist = usedSourceElements.length > 0;

    // Check if source tags has to be removed
    if (isUnusedSourcesExist) {
      const children = image.children;

      //This iteration has top be in reverse order. Othervise it will skip 1 source tag
      for (let i = children.length - 1; i >= 0; i--) {
        // Removes only source tags
        if (children[i].nodeName.toLowerCase() === "source") {
          image.removeChild(children[i]);
        }
      }
    }
  }

  //This code reorders footer node for mobile view
  function createMobileFooter() {
    // Store references to all nodes to be moved
    const elementsToManipulate = {
      newsletterForm: document.querySelector(".footer-newsletter"),
      footerPartners: document.querySelector(".footer-partners"),
      footerPolicies: document.querySelector(".footer-policies"),
      newsletterText: document.getElementById("newsletter"),
      logoSection: document.getElementById("logo-section"),
    };

    // Store new insertion references where modes will be moved
    const insertionReferences = {
      newsletterText: elementsToManipulate.logoSection.childNodes[2],
      newsletterForm: elementsToManipulate.logoSection.childNodes[3],
      footerPartners: elementsToManipulate.logoSection.childNodes[3],
      footerPolicies: elementsToManipulate.logoSection.childNodes[6],
    };

    // Node moving function
    const insertElement = (element, reference) => {
      elementsToManipulate.logoSection.insertBefore(element, reference);
    };

    // Move nodes to the new positions
    insertElement(
      elementsToManipulate.newsletterText,
      insertionReferences.newsletterText
    );
    insertElement(
      elementsToManipulate.newsletterForm,
      insertionReferences.newsletterForm
    );
    insertElement(
      elementsToManipulate.footerPartners,
      insertionReferences.footerPartners
    );
    insertElement(
      elementsToManipulate.footerPolicies,
      insertionReferences.footerPolicies
    );

    // Check if footer state was modified
    isMobileFooterCreated = true;
  }

  function restoreFooterState(fragment) {
    // Find the existing <footer> element
    const footerSection = document.getElementById("footer");
    let documentBody;

    // Check if footer is found for safety
    if (footerSection) {
      documentBody = footerSection.parentNode;

      documentBody.removeChild(footerSection);
    }

    if (documentBody && footerSection) {
      documentBody.appendChild(fragment.cloneNode(true)); // Restore the copied element
    }

    // Update mobile footer flag to initial state
    isMobileFooterCreated = false;
  }

  // Make a copy of footer HTML section to store it's state
  function copyFooterSectionInMemory() {
    const footerSection = document.getElementById("footer");

    if (footerSection) {
      footer = footerSection.cloneNode(true); // Clone with children
    }
  }
}

// Fires image source option generation on resize event
addEventListener("resize", () => {
  handleResize();
});

// Fires image source option generation after page loaded to match initial device width
addEventListener("DOMContentLoaded", () => {
  handleResize();
});
/* 
Utility to generate images adopted for screen size ends here
*/

/* 
Static cursor for headers handler starts here
This code creates style for headers accross entire website
*/
// Get elements with class name 'box'
const spanElements = document.getElementsByClassName("static-cursor");

for (const spanElement of spanElements) {
  // Create a text node
  const textNode = document.createTextNode("| ");
  // Append the text node to the <span> element
  spanElement.appendChild(textNode);
}
/* 
Static cursor for headers handler ends here
*/
