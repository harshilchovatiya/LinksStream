document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-btn');
    const body = document.body;

    // Function to show the popup and disable scrolling
    function showPopup() {
        popup.style.display = 'flex';
        body.style.overflow = 'hidden'; // Disable scrolling
    }

    // Function to hide the popup and enable scrolling
    function hidePopup() {
        popup.style.display = 'none';
        body.style.overflow = ''; // Enable scrolling
    }

    // Show the popup on page load
    showPopup();

    // Close the popup when the close button is clicked
    closeBtn.addEventListener('click', function() {
        hidePopup();
    });

    // Optionally close the popup when clicking outside the popup content
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            hidePopup();
        }
    });
});
