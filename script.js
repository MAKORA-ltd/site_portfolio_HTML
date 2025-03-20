// Smooth scrolling pour la navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation du formulaire
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', sendEmail);
}

// Initialiser EmailJS
(function() {
    emailjs.init("JskokwxLDp-0-mTu6"); // Vous devrez remplacer ceci par votre clé publique EmailJS
})();

// Fonction pour envoyer l'email
function sendEmail(event) {
    event.preventDefault();

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_email: 'enamkpetigo@gmail.com'
    };

    // Désactiver le bouton pendant l'envoi
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

    emailjs.send('service_wsnjuof', 'template_33g9w4f', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Afficher le message de succès
            document.getElementById('success-message').style.display = 'block';
            
            // Réinitialiser le formulaire
            document.getElementById('contact-form').reset();
            
            // Cacher le message de succès après 5 secondes
            setTimeout(() => {
                document.getElementById('success-message').style.display = 'none';
            }, 5000);
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            alert('Désolé, une erreur est survenue. Veuillez réessayer plus tard.');
        })
        .finally(function() {
            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        });

    return false;
}

// Barre de progression
const progressBar = document.querySelector('.progress-bar');
const backToTop = document.querySelector('#back-to-top');

window.addEventListener('scroll', () => {
    // Mise à jour de la barre de progression
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;

    // Affichage/masquage du bouton retour en haut
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Animation douce pour le retour en haut
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation des éléments au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.projet-card, .skill-tag, h2, p');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('fade-in-up');
        }
    });
};

// Lancement initial des animations
animateOnScroll();

// Animation au scroll
window.addEventListener('scroll', animateOnScroll);

// Navigation douce
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation au scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.projet');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Gestion de la modal CV
const cvButton = document.querySelector('.cv-float-button');
const cvModal = document.querySelector('.cv-modal');
const cvClose = document.querySelector('.cv-close');

cvButton.addEventListener('click', () => {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

cvClose.addEventListener('click', () => {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Fermer la modal en cliquant en dehors
cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
        cvModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Empêcher la fermeture en cliquant sur le contenu de la modal
cvModal.querySelector('.cv-modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});
