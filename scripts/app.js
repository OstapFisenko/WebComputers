const scrollContent = document.querySelector('.scroll');

scrollContent.addEventListener('scroll', () => {
    scrollContent.style.setProperty('--scrollTop', `${scrollContent.scrollTop}px`)
}, {passive: true});

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

ScrollSmoother.create({
    wrapper: '.wraper',
    content: '.contents'
});