// Page titles configuration
const pageTitles = {
    'home': 'Home | Empower Ability Labs',
    'services': 'Services | Empower Ability Labs',
    'schedule': 'Schedule a Call | Empower Ability Labs'
};

// Screen reader announcements configuration
const srAnnouncements = {
    'home': 'Welcome to Empower Ability Labs!',
    'services': 'Our Services',
    'schedule': 'Schedule a Call'
};

// Function to update page title
function updatePageTitle(pageId) {
    document.title = pageTitles[pageId] || 'Empower Ability Labs';
}

// Function to announce to screen readers
function announceToScreenReader(message) {
    const announcementEl = document.getElementById('sr-announcement');
    announcementEl.textContent = message;
}

// Toggle community content on button click
const communityBtn = document.getElementById('community-btn');
const communityContent = document.getElementById('community-content');

communityBtn.addEventListener('click', function () {
    if (communityContent.style.display === 'block') {
        communityContent.style.display = 'none';
    } else {
        communityContent.style.display = 'block';
    }
});

const speakerCheckbox = document.getElementById('topic-invite');
const eventDetails = document.getElementById('event-details-group');
const eventTextarea = document.getElementById('event'); // id du textarea dans le groupe

if (speakerCheckbox && eventDetails) {
    // Initial state
    eventDetails.hidden = true;
    eventDetails.classList.remove('show');
    speakerCheckbox.setAttribute('aria-expanded', 'false');
    // Event listener for checkbox change
    speakerCheckbox.addEventListener('change', function () {
        const isChecked = this.checked;

        this.setAttribute('aria-expanded', isChecked ? 'true' : 'false');
        // Show or hide event details based on checkbox state
        if (isChecked) {
            eventDetails.hidden = false;
            eventDetails.classList.add('show');

            // Focus on the textarea when shown
            if (eventTextarea) {
                eventTextarea.focus();
            }
        } else {
            eventDetails.hidden = true;
            eventDetails.classList.remove('show');
        }
    });
}


        // Toggle community content on button click
            /* const communityBtn = document.getElementById('community-btn');
            const communityContent = document.getElementById('community-content');
            
            communityBtn.addEventListener('click', function() {
                if (communityContent.style.display === 'block') {
                    communityContent.style.display = 'none';
                } else {
                    communityContent.style.display = 'block';
                }
            }); */
            
            // Toggle event details form group based on checkbox selection
            const designCheckbox = document.getElementById('topic-invite');
            const eventDetailsGroup = document.getElementById('event-details-group');
            
            designCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    eventDetailsGroup.classList.add('show');
                } else {
                    eventDetailsGroup.classList.remove('show');
                }
            });
            

// SPA Navigation Logic
document.addEventListener('DOMContentLoaded', function () {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target view ID from the href attribute
            const targetId = this.getAttribute('href').substring(1);

            // Hide all views
            document.querySelectorAll('.view').forEach(view => {
                view.classList.remove('active');
            });

            // Show the target view
            const targetView = document.getElementById(`${targetId}-view`);
            targetView.classList.add('active');

            // Update active navigation link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Update page title
            updatePageTitle(targetId);

            // Announce to screen reader
            announceToScreenReader(srAnnouncements[targetId]);

            // Update URL hash without triggering page reload
            window.history.pushState(null, null, `#${targetId}`);

            const targetHeading = targetView.querySelector('h1');
            if (targetHeading) {
                targetHeading.setAttribute('tabindex', '-1');
                targetHeading.focus();
            }

            // Focus on main content for screen readers
            // document.getElementById('main-content').focus();
        });
    });



    // Handle browser back/forward buttons
    window.addEventListener('popstate', function () {
        const hash = window.location.hash.substring(1) || 'home';

        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show the target view
        document.getElementById(`${hash}-view`).classList.add('active');

        // Update active navigation link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${hash}`) {
                link.classList.add('active');
            }
        });

        // Update page title
        updatePageTitle(hash);
    });

    /*    // Modal functionality put it as  comments because modal is missing and this code causes errors and breaks the rest of the JS
                
<<<<<<< HEAD:EmpowerAbilityLab.js
       // Close modal when clicking outside content
        modal.addEventListener('click', function (e) {
                    if (e.target === modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        modal.setAttribute('aria-hidden', 'true');
                        communityBtn.focus();
                    }
                });
                
                // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
                    if (e.key === 'Escape' && modal.style.display === 'flex') {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        modal.setAttribute('aria-hidden', 'true');
                        communityBtn.focus();
                    }
                });
    */
    // Form validation and submission
    const scheduleForm = document.getElementById('schedule-form');
    const successMessage = document.getElementById('success-message');
    const errorSummary = document.getElementById('form-errors');
    const errorSummaryList = errorSummary.querySelector('ul');

    function addErrorToSummary(fieldId, message) {

        errorSummary.hidden = false;

        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + fieldId;
        link.textContent = message;

        link.addEventListener('click', function (e) {
            e.preventDefault();
            const field = document.getElementById(fieldId);
            if (field) {
                field.focus();
            }
        });

        li.appendChild(link);
        errorSummaryList.appendChild(li);
    }

    scheduleForm.addEventListener('submit', function (e) {
        e.preventDefault();
        document.querySelectorAll('.error').forEach(error => {
            error.style.display = 'none';
        });
        successMessage.style.display ='none';
        // Reset error summary
        errorSummaryList.innerHTML = '';
        errorSummary.hidden = true;

        let isValid = true;

        // Validate business name
        const businessName = document.getElementById('business-name');
        if (!businessName.value.trim()) {
            document.getElementById('business-name-error').style.display = 'block';
            addErrorToSummary('business-name', 'Please enter your business name.');
            isValid = false;
        }


        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            document.getElementById('email-error').style.display = 'block';
            addErrorToSummary('email', 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate phone (if provided) – 10 digits, tolerant with separators
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');

        if (phoneInput && phoneInput instanceof HTMLInputElement && phoneInput.value.trim()) {
           // Remove non-digit characters
            const digits = phoneInput.value.replace(/\D/g, '');

            if (digits.length !== 10) {
                if (phoneError) {
                    phoneError.style.display = 'block';
                }
                addErrorToSummary('phone', 'Please enter an 10-digit phone number.');
                isValid = false;
            }
        }

        // Validate at least one topic is selected
        const topics = document.querySelectorAll('input[name="topic"]:checked');
        if (topics.length === 0) {
            document.getElementById('topic-error').style.display = 'block';
            // Use the first checkbox id as the target
            addErrorToSummary('topic-awareness', 'Please select at least one topic.');
            isValid = false;
        }

        if (!isValid) {
            // Count how many errors we have
            const errorCount = errorSummaryList.querySelectorAll('li').length;
            let message;

            if (errorCount === 1) {
                message = 'There was 1 problem with your submission.';
            } else {
                message = `There were ${errorCount} problems with your submission.`;
            }

            // Announce this explicitly to screen readers
            announceToScreenReader(message);

            // Then move focus to the first error link (like Lab 7)
            const firstErrorLink = errorSummary.querySelector('a');
            if (firstErrorLink) {
                firstErrorLink.focus();
            } else {
                errorSummary.focus();
            }

            return;
        }

        // If everything is valid
        successMessage.style.display = 'block';
        scheduleForm.reset();
        successMessage.scrollIntoView({ behavior: 'smooth' });
        successMessage.focus();
    });

    // Set initial view based on URL hash
    const initialHash = window.location.hash.substring(1) || 'home';
    document.getElementById(`${initialHash}-view`).classList.add('active');

    // Update active navigation link for initial view
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${initialHash}`) {
            link.classList.add('active');
        }
    });

    // Set initial page title
    updatePageTitle(initialHash);
});