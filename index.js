document.addEventListener("DOMContentLoaded", function () {
    function generateRandomValues(length) {
        let output = "";
        for (let index = 0; index < length; index++) {
            const x = Math.floor(Math.random() * ((window.innerWidth) + 1000));
            const y = Math.floor(Math.random() * ((window.innerHeight) + 1000));
            if (index < length - 1)
                output += `${x}px ${y}px #FFF , `;
            else
                output += `${x}px ${y}px #FFF`;
        }
        return output;
    }

    const values = generateRandomValues(4000);
    document.documentElement.style.setProperty('--star-shadow', values);
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".navbar li button");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            const target = this.querySelector("a").getAttribute("href");
            if (target) {
                window.location.href = target; // Navigate to the target URL
            }
        });
    });
});

const cursor = document.querySelector('.cursor')

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px'
    cursor.style.top = e.pageY + 'px'
})





