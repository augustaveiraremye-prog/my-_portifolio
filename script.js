// Initialize EmailJS with your public key
(function(){
    emailjs.init("LA5nWcDnOASVRv-Qh"); // Your EmailJS public key
    console.log("EmailJS initialized");
})();

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});

// Form submission with EmailJS
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_email: 'augustaveiraremye@gmail.com'
    };

    console.log("Sending email with data:", templateParams);

    // Send email using EmailJS
    emailjs.send('service_6u9s56e', 'template_pmex2fq', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('✅ Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            console.log('FAILED...', error);
            console.log('Error details:', JSON.stringify(error));
            console.log('Full error:', error);
            
            // More specific error message
            let errorMessage = 'Sorry, there was an error sending your message. ';
            let detailedError = '';
            
            if (error.status) {
                detailedError = `\n\nError Code: ${error.status}`;
            }
            
            if (error.text) {
                detailedError += `\nError Details: ${error.text}`;
            }
            
            if (error.text && error.text.includes('Invalid template')) {
                errorMessage += 'The email template is not configured correctly.' + detailedError;
            } else if (error.text && error.text.includes('User ID')) {
                errorMessage += 'Email service configuration error.' + detailedError;
            } else if (error.text && error.text.includes('Invalid')) {
                errorMessage += 'Configuration error. Please check your EmailJS settings.' + detailedError;
            } else {
                errorMessage += 'Please try again later or contact me directly at augustaveiraremye@gmail.com' + detailedError;
            }
            
            alert(errorMessage);
            
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// Simple animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
animateElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});
