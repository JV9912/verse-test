setTimeout(function () {
    var divToDelete = document.getElementById("gallery-sub-col");
    divToDelete.remove();
}, 3000);



// Function to handle the removal of the target element
function handleRemoval(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
            const removedNodes = Array.from(mutation.removedNodes);
            if (removedNodes.some(node => node.id === 'gallery-sub-col')) {
                const displayer = document.querySelector(".carousel2-container");

                // Use setTimeout to add and remove 'appear' class
                setTimeout(() => {
                    displayer.classList.remove("hidden");
                    displayer.classList.add("appear");
                }, 10); // Adjust the delay (in milliseconds) as needed

                // After the animation ends, remove the 'appear' class
                displayer.addEventListener('animationend', () => {
                    displayer.classList.remove("appear");
                }, { once: true });
            }
        }
    }
}



// Rest of your code remains the same
const targetNode = document.getElementById('gallery-col');
const observer = new MutationObserver(handleRemoval);
observer.observe(targetNode, { childList: true });


let skipAnimation = false; // Flag to track whether to skip the animation

// Add a click event listener to the document
document.addEventListener('click', function () {
    skipAnimation = true; // Set the flag to skip animation
    // Remove the element immediately
    const divToDelete = document.getElementById("gallery-sub-col");
    if (divToDelete) {
        divToDelete.remove();
    }
});

// Modify your existing setTimeout function to check the skipAnimation flag
setTimeout(function () {
    if (!skipAnimation) {
        var divToDelete = document.getElementById("gallery-sub-col");
        if (divToDelete) {
            divToDelete.remove();
        }
    }
}, 5000);




