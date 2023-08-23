// Global variables
/* Start store initial footer state */
let featuredSection = null;
let isFeaturedSectionCreated = false;
/* Ends store initial footer state */

/* 
Utility to build featured section for mobile view starts here
*/
//  Checks if on mobile width section is featured and builds it, restores desktop othervise
function handleFeaturedSectionBehavior() {
  // Create featured section copy on page load
  if (!isFeaturedSectionCreated) {
    copyFeaturedSectionInMemory();
  }

  if (mediaQueryMobile.matches) {
    // Handle mobile width behavior and creates featured setion if not created previously
    if (!isFeaturedSectionCreated) {
      createMobileFeaturedSection();
    }
  } else {
    // Handle desktop width behavior and restores back original featured section
    if (isFeaturedSectionCreated) {
      restoreDesktopFeaturedSection(featuredSection);
    }
  }

  // Make a copy of #featured-section HTML to store it's state
  function copyFeaturedSectionInMemory() {
    const featuredSectionFound = document.getElementById("featured-section");

    if (featuredSectionFound && !featuredSection) {
      featuredSection = featuredSectionFound.cloneNode(true); // Clone with children
    }
  }

  // Creates mobile featured section
  function createMobileFeaturedSection() {
    // Find and remove all previous featured section content
    const featuredSectionElement = document.getElementById("featured-section");

    while (featuredSectionElement.firstChild) {
      featuredSectionElement.removeChild(featuredSectionElement.firstChild);
    }

    // Create new featured section content
    // Create the main div with class 'featured'
    const featuredDiv = document.createElement("div");
    featuredDiv.classList.add("featured");

    // Create the h3 element with class 'featured-page-header'
    const h3Element = document.createElement("h3");
    h3Element.classList.add("featured-page-header");
    h3Element.textContent = "| Featured";

    // Create link to the featured article
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", "../articles/protecting-sensitive-data.html");

    // Create the picture element with classes 'responsive-img'
    // for compatability with shared.js responsive image utility
    const pictureElement = document.createElement("picture");
    pictureElement.classList.add("responsive-img");

    pictureElement.setAttribute("data-image-src", "protecting-sensitive-data");
    pictureElement.setAttribute("data-image-types", "jpg");
    pictureElement.setAttribute("data-image-section", "content/articles");

    // Default featured image for picture element
    const imgElement = document.createElement("img");
    imgElement.alt = "Article image";
    imgElement.src =
      "../assets/images/mobile/content/articles/protecting-sensitive-data.jpg";
    imgElement.classList.add("featured-section-image");

    pictureElement.appendChild(imgElement);

    // Create the h5 element with class 'featured-page-title'
    const h5Element = document.createElement("h5");
    h5Element.classList.add("featured-page-title");
    h5Element.textContent = "Protecting Sensitive Data";

    // Wrap article with link to the featured article
    linkElement.appendChild(pictureElement);
    linkElement.appendChild(h5Element);

    // Append the elements to create mobile featured section
    featuredDiv.appendChild(h3Element);
    featuredDiv.appendChild(linkElement);

    // Append the 'featured' div to the #featured-section element
    featuredSectionElement.appendChild(featuredDiv);

    // Mark as created
    isFeaturedSectionCreated = true;
  }

  // Restores desktop featured section
  function restoreDesktopFeaturedSection(fragment) {
    // Find the existing featured section element
    const featuredSectionElement = document.getElementById("featured-section");
    let documentBody = featuredSectionElement.parentNode;

    // Check if featured section element is found for safety
    if (featuredSectionElement) {
      // Remove mobile featured section element version
      documentBody.removeChild(featuredSectionElement);
    }

    // Restore the copied featured section element
    documentBody.appendChild(fragment.cloneNode(true));

    // Mark as not created
    isFeaturedSectionCreated = false;
  }
}

// Handles resize behavior
addEventListener("resize", () => {
  handleFeaturedSectionBehavior();
});

// Handles initial content load behavior
addEventListener("DOMContentLoaded", () => {
  handleFeaturedSectionBehavior();
});
/* 
Utility to build featured section for mobile view ends here
*/
