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
                let parent = document.getElementById("button-container");
                let buttons = parent.querySelectorAll("button");

                buttons.forEach(function (button, index) {
                    setTimeout(() => {
                        button.classList.add("appear");
                        button.addEventListener('animationend', () => {
                            button.classList.remove("appear");
                            button.style.display = "inline-block";
                        }, { once: true });
                    }, index * 1); // Apply 'appear' animation with staggered delay

                    setTimeout(() => {
                        button.classList.add("splash");
                        button.addEventListener('animationend', () => {
                            button.classList.remove("splash");
                        }, { once: true });
                    }, 500 + index * 100); // Apply 'splash' animation after 500ms delay
                });
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
}, 3000);




