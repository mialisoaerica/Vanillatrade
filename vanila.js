

document.addEventListener("DOMContentLoaded", function () {

    /*PRELOADER Animation*/
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1200);
        });
    }


    /*Smooth Scroll*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (targetId.length > 1) {
                e.preventDefault();
                const target = document.querySelector(targetId);

                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });


    /* Animation Fade In au scroll*/
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Appliquer les animations aux éléments clés
    const animatedElements = [
        '.product-card',
        '.about-container > div',
        '.contact-box'
    ];

    animatedElements.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.transitionDelay = (index * 0.15) + 's';
            observer.observe(el);
        });
    });


    /*Scroll vers Contact*/
    window.scrollToContact = function () {
        const contact = document.getElementById("contact");
        if (contact) {
            window.scrollTo({
                top: contact.offsetTop - 80,
                behavior: "smooth"
            });
        }
    };


    /*Copier numéro*/
    window.copyToClipboard = function (number) {
        navigator.clipboard.writeText(number)
            .then(() => {
                const existingMessage = document.querySelector('.copy-feedback');
                if (existingMessage) {
                    existingMessage.remove();
                }

                const message = document.createElement("div");
                message.textContent = "Numéro copié ✓";
                message.classList.add("copy-feedback");

                document.body.appendChild(message);

                setTimeout(() => {
                    message.remove();
                }, 2500);
            })
            .catch(err => console.error("Erreur copie:", err));
    };


    /*Navbar dynamique*/
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });


    /*Menu Mobile Toggle */
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", () => {
            const isActive = navLinks.classList.toggle("active");
            hamburger.setAttribute('aria-expanded', isActive);
            hamburger.innerHTML = isActive
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }


    /* BACK TO TOP - Bouton retour en haut */
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(backToTop);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    /* Compteur animé pour les prix*/
    function animatePrice(element, targetPrice) {
        const duration = 1500;
        const startTime = performance.now();
        const startPrice = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentPrice = Math.floor(startPrice + (targetPrice - startPrice) * easeOut);
            element.textContent = currentPrice.toLocaleString() + '.000 Ar';

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Observer pour animer les prix quand ils deviennent visibles
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceEl = entry.target;
                const priceText = priceEl.textContent;
                const priceMatch = priceText.match(/(\d+)\.000 Ar/);

                if (priceMatch) {
                    const targetPrice = parseInt(priceMatch[1]);
                    priceEl.textContent = '0.000 Ar';
                    animatePrice(priceEl, targetPrice);
                }

                priceObserver.unobserve(priceEl);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.product-card .price').forEach(price => {
        priceObserver.observe(price);
    });


    /* Effet de surlignage au scroll*/
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener("scroll", () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

});

console.log("Vanilla Trade JS Loaded ✓");

