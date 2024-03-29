const page1 = document.querySelector(".page1");
const navBar = document.querySelector("navbar");

const objOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: "-100px",
};

const sectionObserver = new IntersectionObserver(callBackFunction, objOptions);
sectionObserver.observe(page1);

function callBackFunction(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        navBar.classList.remove("hidden");
    } else {
        navBar.classList.add("hidden");
    }
}