document.addEventListener("DOMContentLoaded", function () {
    // Fetch the navbar and inject it into the container
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.getElementById("navbar-container");
            if (navbarContainer) {
                navbarContainer.innerHTML = data;

                // After the navbar is injected, set the active link
                const navLinks = document.querySelectorAll("nav ul li a");

                // Function to highlight the active link
                function setActiveLink() {
                    const currentPage = window.location.pathname.split("/").pop(); // Get current page
                    navLinks.forEach(link => {
                        link.classList.remove("selected"); // Remove active class
                        if (link.getAttribute("href") === currentPage) {
                            link.classList.add("selected"); // Add active class to current page
                        }
                    });
                }

                // Set the active link on page load
                setActiveLink();

                // Add click event to update active link on navigation
                navLinks.forEach(link => {
                    link.addEventListener("click", function () {
                        navLinks.forEach(link => link.classList.remove("selected"));
                        this.classList.add("selected");
                    });
                });
            } else {
                console.error("Navbar container not found");
            }
        })
        .catch(error => console.error("Error loading navbar:", error));

    // Inject footer into the container
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById("footer-container");
            if (footerContainer) {
                footerContainer.innerHTML = data;
            } else {
                console.error("Footer container not found");
            }
        })
        .catch(error => console.error("Error loading footer:", error));
});

// Resize event listener to switch layout based on zoom
window.addEventListener("resize", function () {
    const container = document.querySelector(".container");
    const leftColumnParagraph = document.querySelector(".left-column p");
    if (container && leftColumnParagraph) {
        let zoomLevel = Math.round(window.devicePixelRatio * 100); // Get zoom level as percentage

        // Handle layout change based on zoom (flex-direction)
        if (zoomLevel > 200) {
            // When zoomed in too much, switch to column layout
            container.style.flexDirection = "column";
        } else {
            // Otherwise, keep the default two-column layout
            container.style.flexDirection = "row";
        }
    } else {
        console.error("Container or left column paragraph not found");
    }
});

// Trigger resize event on page load to apply the correct layout
window.dispatchEvent(new Event("resize"));
