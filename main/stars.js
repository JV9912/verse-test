document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < 500; i++) {
        let star = document.createElement("div");
        star.className = "star";
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.left = `${Math.random() * window.innerWidth}px`;
        let size = Math.random() * 2.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${1 + Math.random()}s`;
        document.body.appendChild(star);
    }

    setInterval(createShootingStar, 10000);
    setInterval(randomizeNebulaSpeed, 15000);
});


function createShootingStar() {
    let shootingStar = document.createElement("div");
    shootingStar.className = "shooting-star";
    shootingStar.style.left = `${Math.random() * window.innerWidth}px`;
    shootingStar.style.top = `0`;

    let streak = document.createElement("div");
    streak.className = "streak";
    shootingStar.appendChild(streak);

    document.body.appendChild(shootingStar);

    setTimeout(() => {
        shootingStar.remove();
    }, 1500);
}
