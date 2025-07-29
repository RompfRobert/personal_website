    const toggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme')
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // 1. Apply stored/system theme on load
    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    // 2. Toggle on click
    toggleBtn.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // Hamburger menu functionality
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle hamburger menu
    hamburgerToggle.addEventListener('click', () => {
        hamburgerToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerToggle.contains(e.target) && !navMenu.contains(e.target)) {
            hamburgerToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburgerToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Timeline expand/collapse for mobile experience
    function isMobile() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    function setupTimelineExpanders() {
        const timelineContents = document.querySelectorAll('.timeline-content');
        timelineContents.forEach(tc => {
            const instruction = tc.querySelector('.expand-instruction');
            if (!instruction) return;
            tc.classList.remove('expanded');
            instruction.style.display = isMobile() ? 'block' : 'none';
            // Only allow expand/collapse on mobile
            if (isMobile()) {
                tc.addEventListener('click', function handler(e) {
                    // Only expand if not already expanded and not clicking a link
                    if (!tc.classList.contains('expanded') && !e.target.closest('a')) {
                        tc.classList.add('expanded');
                        instruction.style.display = 'none';
                    } else if (tc.classList.contains('expanded') && !e.target.closest('a')) {
                        tc.classList.remove('expanded');
                        instruction.style.display = 'block';
                    }
                });
            }
        });
    }

    window.addEventListener('DOMContentLoaded', setupTimelineExpanders);
    window.addEventListener('resize', setupTimelineExpanders);