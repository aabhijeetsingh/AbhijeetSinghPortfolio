/**
 * This script handles the dynamic functionality of the portfolio website.
 * It includes theme toggling, mobile navigation, smooth scrolling, form validation,
 * dynamic content population from data.js, and a chatbot feature.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get all the necessary DOM elements
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.querySelector('.mobile-nav-links');
    const closeBtn = document.getElementById('close-btn');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    // --- THEME TOGGLE --- //
    // Toggles between light and dark mode and saves the preference to local storage.
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggle.querySelector('.toggle-icon').textContent =
            body.classList.contains('dark-mode') ? '☀' : '☽';
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Loads the saved theme from local storage.
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.querySelector('.toggle-icon').textContent = '☀';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.querySelector('.toggle-icon').textContent = '☽';
    }

    // --- HAMBURGER MENU --- //
    // Opens the mobile navigation menu.
    hamburger.addEventListener('click', () => {
        mobileNav.classList.add('active');
        body.style.overflow = 'hidden';
    });

    // Closes the mobile navigation menu.
    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        body.style.overflow = '';
    });

    // Closes the mobile navigation menu when a link is clicked.
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // --- BACK TO TOP BUTTON --- //
    // Shows or hides the back to top button based on scroll position.
    window.addEventListener('scroll', () => {
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
    });

    // Scrolls to the top of the page when the back to top button is clicked.
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- SMOOTH SCROLLING --- //
    // Smoothly scrolls to the section when a navigation link is clicked.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetPosition = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- FORM VALIDATION --- //
    // Validates the contact form before submission.
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let isFormValid = true;
            inputs.forEach(input => {
                const errorElement = document.getElementById(`${input.id}-error`);
                if (input.value.trim() === '') {
                    if (errorElement) {
                        errorElement.textContent = 'This field is required.';
                        errorElement.style.display = 'block';
                    }
                    isFormValid = false;
                } else {
                    if (errorElement) {
                        errorElement.textContent = '';
                        errorElement.style.display = 'none';
                    }
                }
            });

            if (!isFormValid) {
                e.preventDefault();
            }
        });
    }

    // --- DYNAMIC DATA POPULATION --- //
    // Populates the website with data from the portfolio_data object.
    if (typeof portfolio_data !== 'undefined') {
        document.title = `${portfolio_data.name} - Portfolio`;
        document.getElementById('hero-name').textContent = portfolio_data.name;
        document.getElementById('hero-title-roles').textContent = portfolio_data.title_roles.join(' & ');
        
        const heroSocials = document.getElementById('hero-socials');
        portfolio_data.social_media.forEach(social => {
            const a = document.createElement('a');
            a.href = social.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.classList.add('social-icon', 'glass-effect');
            a.setAttribute('aria-label', social.name);
            a.innerHTML = `<i class="${social.icon}"></i>`;
            heroSocials.appendChild(a);
        });

        document.getElementById('about-me-description').textContent = portfolio_data.about_me.description;
        
        const educationList = document.getElementById('education-list');
        portfolio_data.education.forEach((edu, index) => {
            const p1 = document.createElement('p');
            p1.innerHTML = `<strong>${edu.degree}</strong>`;
            const p2 = document.createElement('p');
            p2.textContent = `${edu.institute} (${edu.duration})`;
            const p3 = document.createElement('p');
            p3.textContent = edu.percentage;
            educationList.appendChild(p1);
            educationList.appendChild(p2);
            educationList.appendChild(p3);
            if (index < portfolio_data.education.length - 1) {
                educationList.appendChild(document.createElement('br'));
            }
        });

        document.getElementById('video-resume-iframe').src = portfolio_data.video_resume_url;

        const skillsGrid = document.getElementById('skills-grid');
        for (const category in portfolio_data.skills) {
            const skillCategory = document.createElement('div');
            skillCategory.classList.add('skill-category');
            const h3 = document.createElement('h3');
            h3.textContent = category;
            skillCategory.appendChild(h3);
            const categoryCards = document.createElement('div');
            categoryCards.classList.add('category-cards');
            portfolio_data.skills[category].forEach(skill => {
                const skillCard = document.createElement('div');
                skillCard.classList.add('skill-card');

                const skillCardInner = document.createElement('div');
                skillCardInner.classList.add('skill-card-inner');

                const skillCardFront = document.createElement('div');
                skillCardFront.classList.add('skill-card-front');

                const icon = document.createElement('i');
                icon.className = skill.icon;
                const span = document.createElement('span');
                span.textContent = skill.name;

                skillCardFront.appendChild(icon);
                skillCardFront.appendChild(span);

                const skillCardBack = document.createElement('div');
                skillCardBack.classList.add('skill-card-back');
                skillCardBack.textContent = skill.description;

                skillCardInner.appendChild(skillCardFront);
                skillCardInner.appendChild(skillCardBack);
                skillCard.appendChild(skillCardInner);
                categoryCards.appendChild(skillCard);
            });
            skillCategory.appendChild(categoryCards);
            skillsGrid.appendChild(skillCategory);
        }

        const experienceList = document.getElementById('experience-list');
        portfolio_data.experience.forEach(job => {
            const card = document.createElement('div');
            card.classList.add('experience-card', 'glass-effect');
            const header = document.createElement('div');
            header.classList.add('experience-card-header');
            header.innerHTML = `<span class="experience-role">${job.role}</span><span class="experience-company">${job.company}</span>`;
            const meta = document.createElement('div');
            meta.classList.add('experience-meta');
            meta.textContent = `${job.duration} | ${job.location}`;
            const responsibilities = document.createElement('ul');
            responsibilities.classList.add('experience-responsibilities');
            job.responsibilities.forEach(r => {
                const li = document.createElement('li');
                li.textContent = r;
                responsibilities.appendChild(li);
            });
            card.appendChild(header);
            card.appendChild(meta);
            card.appendChild(responsibilities);
            experienceList.appendChild(card);
        });

        const projectsList = document.getElementById('projects-list');
        portfolio_data.projects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('project-card', 'glass-effect');
            const header = document.createElement('div');
            header.classList.add('project-header');
            header.innerHTML = `<span class="project-title">${project.title}</span><span class="project-tech">${project.technologies}</span>`;
            const desc = document.createElement('div');
            desc.classList.add('project-desc');
            desc.textContent = project.description;
            const links = document.createElement('div');
            links.classList.add('project-links');
            links.innerHTML = `<a href="https://aabhijeetsingh.github.io/cryptofix-trading/" target="_blank" rel="noopener noreferrer" class="btn primary-btn glass-effect">Live Demo</a>
                               <a href="https://github.com/aabhijeetsingh/cryptofix-trading" target="_blank" rel="noopener noreferrer" class="btn secondary-btn glass-effect">Source Code</a>`;
            card.appendChild(header);
            card.appendChild(desc);
            card.appendChild(links);
            projectsList.appendChild(card);
        });

        const researchPapersList = document.getElementById('research-papers-list');
        if (portfolio_data.research_papers) {
            portfolio_data.research_papers.forEach(paper => {
                const card = document.createElement('div');
                card.classList.add('research-paper-card', 'glass-effect');
                const h3 = document.createElement('h3');
                h3.textContent = paper.title;
                card.appendChild(h3);
                const authors = document.createElement('p');
                authors.innerHTML = `<strong>Authors:</strong> ${paper.authors}`;
                card.appendChild(authors);
                const publication = document.createElement('p');
                publication.innerHTML = `<strong>Publication:</strong> ${paper.publication}`;
                card.appendChild(publication);
                if (paper.link) {
                    const links = document.createElement('div');
                    links.classList.add('research-paper-links');
                    const a = document.createElement('a');
                    a.href = paper.link;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.classList.add('btn', 'primary-btn', 'glass-effect');
                    a.textContent = 'Read Paper';
                    links.appendChild(a);
                    card.appendChild(links);
                }
                researchPapersList.appendChild(card);
            });
        }

        const certificationsList = document.getElementById('certifications-list');
        portfolio_data.certifications.forEach(cert => {
            const card = document.createElement('div');
            card.classList.add('certification-card', 'glass-effect');
            const h3 = document.createElement('h3');
            h3.textContent = cert.title;
            card.appendChild(h3);
            const p1 = document.createElement('p');
            p1.innerHTML = `<strong>Platform:</strong> ${cert.platform}`;
            card.appendChild(p1);
            const p2 = document.createElement('p');
            p2.innerHTML = `<strong>Date:</strong> ${cert.date}`;
            card.appendChild(p2);
            if (cert.cert_id) {
                const p3 = document.createElement('p');
                p3.innerHTML = `<strong>Cert ID:</strong> ${cert.cert_id}`;
                card.appendChild(p3);
            }
            certificationsList.appendChild(card);
        });

        document.getElementById('contact-location').textContent = portfolio_data.location;
        document.getElementById('contact-email').textContent = portfolio_data.contact_email;
        document.getElementById('contact-email-link').href = `mailto:${portfolio_data.contact_email}`;
        document.getElementById('contact-phone').textContent = portfolio_data.contact_phone;
        
        const contactSocials = document.getElementById('contact-socials');
        portfolio_data.social_media.forEach(social => {
            const a = document.createElement('a');
            a.href = social.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.classList.add('social-icon', 'glass-effect');
            a.setAttribute('aria-label', social.name);
            a.innerHTML = `<i class="${social.icon}"></i>`;
            contactSocials.appendChild(a);
        });

        const footerSocials = document.getElementById('footer-socials');
        portfolio_data.social_media.forEach(social => {
            const a = document.createElement('a');
            a.href = social.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.classList.add('social-icon', 'glass-effect');
            a.setAttribute('aria-label', social.name);
            a.innerHTML = `<i class="${social.icon}"></i>`;
            footerSocials.appendChild(a);
        });
        document.getElementById('footer-year').textContent = new Date().getFullYear();
    }

    // --- CHATBOT --- //
    // This section handles the chatbot functionality.
    const chatContainer = document.getElementById('chat-container');
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const fullscreenChatBtn = document.getElementById('fullscreen-chat-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const suggestedQuestionsContainer = document.getElementById('suggested-questions');

    const suggestedQuestions = [
        'Tell me about yourself',
        'What are your skills?',
        'What is your experience?',
        'Tell me about your projects'
    ];

    // Shows suggested questions in the chat window.
    function showSuggestedQuestions() {
        suggestedQuestionsContainer.innerHTML = '';
        suggestedQuestions.forEach(q => {
            const qElement = document.createElement('div');
            qElement.classList.add('suggested-question');
            qElement.textContent = q;
            qElement.addEventListener('click', () => handleSuggestedQuestionClick(q));
            suggestedQuestionsContainer.appendChild(qElement);
        });
    }

    // Handles the click event for a suggested question.
    function handleSuggestedQuestionClick(question) {
        chatInput.value = question;
        sendMessage();
    }

    // Toggles the chat window visibility.
    chatToggleBtn.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
        if (chatContainer.classList.contains('active')) {
            showSuggestedQuestions();
        }
    });

    // Closes the chat window.
    closeChatBtn.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });

    fullscreenChatBtn.addEventListener('click', () => {
        chatContainer.classList.toggle('fullscreen');
        const icon = fullscreenChatBtn.querySelector('i');
        if (chatContainer.classList.contains('fullscreen')) {
            icon.classList.remove('fa-expand');
            icon.classList.add('fa-compress');
        } else {
            icon.classList.remove('fa-compress');
            icon.classList.add('fa-expand');
        }
    });

    // Sends a message when the send button is clicked or Enter is pressed.
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Sends the user's message and gets a response from the bot.
    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        appendMessage(messageText, 'user-message');
        chatInput.value = '';
        suggestedQuestionsContainer.innerHTML = '';

        setTimeout(() => {
            const botResponse = getBotResponse(messageText);
            appendMessage(botResponse, 'bot-message');
        }, 500);
    }

    // Appends a message to the chat window.
    function appendMessage(text, className) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', className);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Generates a response from the bot based on the user's message.
    function getBotResponse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            return 'Hello! How can I help you today?';
        } else if (lowerCaseMessage.includes('about') && lowerCaseMessage.includes('yourself')) {
            return portfolio_data.about_me.description;
        } else if (lowerCaseMessage.includes('skills')) {
            let skillsString = ' Languages:- Python, SQL, HTML/CSS, JavaScript\n';
            skillsString += ' Technologies & Developer Tools:- Github, AWS, DevOps, Linux, Jupyter Notebook\n';
            skillsString += ' Key Libraries & Frameworks:- Data Analysis: Pandas & NumPy, Data Visualization: Matplotlib & Seaborn, Machine Learning: Scikit-learn, Deep Learning: TensorFlow & Keras\n';
            skillsString += ' Concepts:- Machine Learning, Deep Learning, Feature Engineering, Model Evaluation, DSA, API Integration\n';
            skillsString += ' Professional:- Leadership, Team Management, Problem-Solving';
            return skillsString;
        } else if (lowerCaseMessage.includes('experience')) {
            let experienceString = 'Here is my work experience:\n';
            portfolio_data.experience.forEach(job => {
                experienceString += `- ${job.role} at ${job.company} (${job.duration})\n`;
                experienceString += `  Responsibilities: ${job.responsibilities.join(', ')}\n`;
            });
            return experienceString;
        } else if (lowerCaseMessage.includes('education')) {
            let educationString = 'Here is my education background:\n';
            portfolio_data.education.forEach(edu => {
                educationString += `- ${edu.degree} from ${edu.institute} (${edu.duration})\n`;
            });
            return educationString;
        } else if (lowerCaseMessage.includes('projects')) {
            let projectString = 'Here are some of my projects:\n';
            portfolio_data.projects.forEach(project => {
                projectString += `- ${project.title}: ${project.description}\n`;
            });
            return projectString;
        } else if (lowerCaseMessage.includes('contact')) {
            return `You can contact me at ${portfolio_data.contact_email} or ${portfolio_data.contact_phone}`;
        } else {
            return "I can answer questions about Abhijeet's skills, experience, education, and projects. Please try asking something like 'What are your skills?'";
        }
    }
});