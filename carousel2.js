document.querySelectorAll(".carousel2").forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel2__item");
    const buttonsHtml = Array.from(items, () => {
        return `<span class="carousel2__button"></span>`;
    });

    carousel.insertAdjacentHTML(
        "beforeend",
        `
    <div class="carousel2__nav">
        ${buttonsHtml.join("")}
    </div>
    `
    );

    const buttons = carousel.querySelectorAll(".carousel2__button");

    function activateItem(index) {
        items.forEach((item) => item.classList.remove("carousel2__item--selected"));
        buttons.forEach((btn) => btn.classList.remove("carousel2__button--selected"));

        items[index].classList.add("carousel2__item--selected");
        buttons[index].classList.add("carousel2__button--selected");
    }

    buttons.forEach((button, i) => {
        button.addEventListener("click", () => {
            activateItem(i);
            resetAutoSlide();
        });
    });

    items[0].classList.add("carousel2__item--selected");
    buttons[0].classList.add("carousel2__button--selected");

    const prevButton = document.getElementById("prevButton2");
    const nextButton = document.getElementById("nextButton2");

    let currentIndex = 0;
    let autoSlideInterval;

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        activateItem(currentIndex);
        resetAutoSlide();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        activateItem(currentIndex);
        resetAutoSlide();
    });

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            activateItem(currentIndex);
        }, 3000);
    }

    resetAutoSlide();

    // Pause auto-slide when hovering over the carousel
    carousel.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval);
    });

    // Resume auto-slide when leaving the carousel
    carousel.addEventListener("mouseleave", resetAutoSlide);
});
