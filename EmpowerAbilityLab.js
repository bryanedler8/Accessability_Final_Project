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
            
            communityBtn.addEventListener('click', function() {
                if (communityContent.style.display === 'block') {
                    communityContent.style.display = 'none';
                } else {
                    communityContent.style.display = 'block';
                }
            });
            
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
        document.addEventListener('DOMContentLoaded', function() {
            // Get all navigation links
            const navLinks = document.querySelectorAll('.nav-link');
            
            // Add click event listeners to all navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
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
            window.addEventListener('popstate', function() {
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
            
            
            
            modalClose.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                modal.setAttribute('aria-hidden', 'true');
                communityBtn.focus(); // Return focus to the button that opened the modal
            });
            
            // Close modal when clicking outside content
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    modal.setAttribute('aria-hidden', 'true');
                    communityBtn.focus();
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    modal.setAttribute('aria-hidden', 'true');
                    communityBtn.focus();
                }
            });
            
            // Form validation and submission
            const scheduleForm = document.getElementById('schedule-form');
            const successMessage = document.getElementById('success-message');
            
            scheduleForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset errors and success message
                document.querySelectorAll('.error').forEach(error => {
                    error.style.display = 'none';
                });
                successMessage.style.display = 'none';
                
                let isValid = true;
                
                // Validate business name
                const businessName = document.getElementById('business-name');
                if (!businessName.value.trim()) {
                    document.getElementById('business-name-error').style.display = 'block';
                    isValid = false;
                    businessName.focus();
                }
                
                // Validate email
                const email = document.getElementById('email');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email.value.trim() || !emailRegex.test(email.value)) {
                    document.getElementById('email-error').style.display = 'block';
                    isValid = false;
                    if (isValid) email.focus();
                }
                
                // Validate phone (if provided)
                const phone = document.getElementById('phone');
                const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
                if (phone.value.trim() && !phoneRegex.test(phone.value)) {
                    document.getElementById('phone-error').style.display = 'block';
                    isValid = false;
                    if (isValid) phone.focus();
                }
                
                // Validate at least one topic is selected
                const topics = document.querySelectorAll('input[name="topic"]:checked');
                if (topics.length === 0) {
                    document.getElementById('topic-error').style.display = 'block';
                    isValid = false;
                }
                
                if (isValid) {
                    // In a real application, you would send the form data to a server here
                    successMessage.style.display = 'block';
                    scheduleForm.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                    
                    // Focus on success message for screen readers
                    successMessage.focus();
                }
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