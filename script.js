// =====================
// MOBILE MENU
// =====================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// =====================
// ACTIVE NAV LINK
// =====================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNavLink();

// =====================
// SMOOTH SCROLL
// =====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// =====================
// SCROLL ANIMATION
// =====================

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.project-card, .certificate-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = '0.6s ease';
    observer.observe(el);
});

// =====================
// CERTIFICATE LIGHTBOX (FIXED)
// =====================

const certLightbox = document.getElementById('certLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const certCards = document.querySelectorAll('.certificate-card');

certCards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('.cert-image');
        if (!img) return;

        lightboxImage.src = img.src;
        certLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        certLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

certLightbox.addEventListener('click', e => {
    if (e.target === certLightbox) {
        certLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        certLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// =====================
// CONTACT FORM → EMAIL REDIRECT
// =====================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = contactForm.querySelector('input[placeholder="Your Name"]').value.trim();
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value.trim();
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Invalid email format.', 'error');
            return;
        }

        const mailto = `mailto:hassnaahaniifah@gmail.com
?subject=${encodeURIComponent(subject)}
&body=${encodeURIComponent(
`Nama: ${name}
Email: ${email}

Pesan:
${message}`
)}`;

        window.location.href = mailto;
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(msg, type) {
    if (!formMessage) return;
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}
