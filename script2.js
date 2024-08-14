document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.element');

    elements.forEach(element => {
        element.addEventListener('click', function(event) {
            event.preventDefault();
            const atomicNumber = this.getAttribute('data-atomic-number');
            // Store atomic number in local storage
            localStorage.setItem('atomicNumber', atomicNumber);
            // Redirect to output2.html
            window.location.href = 'output2.html';
        });
    });
});

function filterElements(className) {
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        if (element.parentElement.classList.contains(className)) {
            element.parentElement.style.display = '';
        } else {
            element.parentElement.style.display = 'none';
        }
    });
}
