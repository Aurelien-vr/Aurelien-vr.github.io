let socialBar = document.querySelector('.socialBar');

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    console.log(entry.isIntersecting);
    if (entry.isIntersecting) {
      socialBar.classList.add('visible');
    } else {
      socialBar.classList.remove('visible');
      socialBar.style.opacity = 0;
      socialBar.style.left = '20%';
    }
});
});
observer.observe(socialBar, { threshold: 0.5 });
