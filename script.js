// ── Navbar scroll style ───────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Hamburger / mobile drawer ─────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(el => {
    el.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileDrawer.classList.remove('open');
    });
});

// ── Menu tabs ─────────────────────────────────────────
document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
});

// ── Scroll reveal ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        // Stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const i = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        io.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => io.observe(el));

// ── Reservation form ──────────────────────────────────
document.getElementById('resBtn').addEventListener('click', () => {
    const name = document.getElementById('r-name').value.trim();
    const email = document.getElementById('r-email').value.trim();
    const date = document.getElementById('r-date').value;
    const time = document.getElementById('r-time').value;
    const guests = document.getElementById('r-guests').value;

    if (!name || !email || !date || !time || !guests) {
        alert('Please fill in all required fields before confirming.');
        return;
    }
    const btn = document.getElementById('resBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    setTimeout(() => {
        btn.style.display = 'none';
        document.getElementById('resSuccess').classList.add('show');
    }, 1500);
});

// ── Active nav highlight on scroll ───────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${current}`
            ? 'var(--gold)' : '';
    });
}, { passive: true });