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
                    let currentPage = window.location.pathname.split("/").pop(); // Get current page
                    if (currentPage === "") {
                        currentPage = "index.html"; // Default to index.html if the path is root
                    }
                    navLinks.forEach(link => {
                        link.classList.remove("selected"); // Remove active class
                        if (link.getAttribute("href") === currentPage) {
                            link.classList.add("selected"); // Add active class to current page
                        }
                    });
                }

                // Function to dynamically load CSS
                function loadCSS(href) {
                    const existingLink = document.querySelector(`link[href="${href}"]`);
                    if (!existingLink) {
                        const link = document.createElement("link");
                        link.rel = "stylesheet";
                        link.href = href;
                        document.head.appendChild(link);
                    }
                }

                // Set the active link on page load
                setActiveLink();

                // Add click event to update active link on navigation
                navLinks.forEach(link => {
                    link.addEventListener("click", function (event) {
                        event.preventDefault(); // Prevent default link behavior
                        const url = this.getAttribute("href");

                        // Fetch the new page content
                        fetch(url)
                            .then(response => response.text())
                            .then(data => {
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(data, 'text/html');
                                const newContent = doc.querySelector('.right-column').innerHTML;
                                const contentContainer = document.querySelector('.right-column');
                                if (contentContainer) {
                                    contentContainer.innerHTML = newContent; // Inject new content
                                    window.history.pushState(null, "", url); // Update URL without refreshing
                                    setActiveLink(); // Update active link
                                } else {
                                    console.error("Content container not found");
                                }
                            })
                            .catch(error => console.error("Error loading page content:", error));
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