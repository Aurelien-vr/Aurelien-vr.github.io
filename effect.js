const page = document.getElementById("Home");
const socialBar = document.querySelector(".socialBar");

const objOptions = {
    root: null,
    threshold: 0.4,
    rootMargin: "-100px",
};

const sectionObserver = new IntersectionObserver(callBackFunction, objOptions);
sectionObserver.observe(page);

function callBackFunction(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        socialBar.classList.remove("hidden");
    } else {
        socialBar.classList.add("hidden");
    }
}
