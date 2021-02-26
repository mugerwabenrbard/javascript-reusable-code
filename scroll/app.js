// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.querySelector('#date');
date.textContent = new Date().getFullYear();
// ********** close links ************
const togglebtn = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');
const linkscontainer = document.querySelector('.links-container');

togglebtn.addEventListener('click',()=>{
    const linkscontainerHeight = linkscontainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;

    if (linkscontainerHeight === 0) {
        linkscontainer.style.height = `${linksHeight}px`;
    }else{
        linkscontainer.style.height = 0;
    }
});
// ********** fixed navbar ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll',()=>{
    const scrollHeight = window.pageYOffset;
    const navbarHeight = navbar.getBoundingClientRect().height;

    if (scrollHeight > navbarHeight) {
        navbar.classList.add('fixed-nav');
    }else{
        navbar.classList.remove('fixed-nav');

    }

    if (scrollHeight > 500) {
        topLink.classList.add('show-link');
    } else {
        topLink.classList.remove('show-link');

    }
});
// ********** smooth scroll ************
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link)=>{
    link.addEventListener('click', (e)=>{
        e.preventDefault();

        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);

        // calculate the heights
        const linkscontainerHeight = linkscontainer.getBoundingClientRect().height;
        const navbarHeight = navbar.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains('fixed-nav')
        let position = element.offsetTop-navbarHeight;

        if (!fixedNav) {
            position = position-navbarHeight;
        }

        if (navbarHeight >82) {
            position = position + linkscontainerHeight;
        }
        window.scrollTo({
            left:0,top:position,
        });
        linkscontainer.style.height = 0;
    })
})
// select links
