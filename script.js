document.addEventListener('DOMContentLoaded', () => {
    // Personalized Welcome with Typewriter and Disappear Effect
    const headerTitle = document.querySelector('header h1');
    const hour = new Date().getHours();
    let greeting = 'Hello There!';
    if (hour < 12) {
        greeting = 'Hey there, Good Morning!';
    } else if (hour < 18) {
        greeting = 'Hey there, Good Afternoon!';
    } else {
        greeting = 'Hey there, Good Evening!';
    }

    headerTitle.textContent = ''; // Clear initial content
    let i = 0;
    const speed = 50; // Typing speed in milliseconds

    function typeWriter() {
        if (i < greeting.length) {
            headerTitle.textContent += greeting.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // After the greeting is typed, wait for 3 seconds and then change text
            setTimeout(() => {
                headerTitle.classList.add('fade-out'); // Add fade-out class for smooth transition
                setTimeout(() => {
                    headerTitle.textContent = 'This is Emmanuel';
                    headerTitle.classList.remove('fade-out'); // Remove the class
                    headerTitle.classList.add('fade-in'); // Add fade-in class (optional)
                }, 500); // Duration of the fade-out transition
            }, 3000); // Greeting should last for = 2 seconds
        }
    }

    typeWriter();

    // Rotating Profile Pictures
    const profilePic = document.getElementById('profile-pic');
    const imageArray = [
        './images/profile.jpg', 
        './images/profile-2.png', 
        './images/profile-3.png',
        './images/profile-4.png',
        './images/profile-5.png'
        // Add more image paths here
    ];
    let imageIndex = 0;
    setInterval(() => {
        profilePic.style.opacity = 0;
        setTimeout(() => {
            imageIndex = (imageIndex + 1) % imageArray.length;
            profilePic.src = imageArray[`${imageIndex}`];
            profilePic.style.opacity = 1;
        }, 0); // no delay for fade effect
    }, 3000); // Change image every 3 seconds

    // Collapsible Sections
    const collapseButtons = document.querySelectorAll('.collapse-button');
    collapseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            targetElement.classList.toggle('hidden');
            button.textContent = targetElement.classList.contains('hidden') ? 'Read More' : 'Read Less';
        });
    });

    // Interactive Word Cloud
    const wordCloudContainer = document.getElementById('word-cloud');
    const words = [
        { text: 'DevOps', info: 'This is a set of practices that combines software development (Dev) and IT operations (Ops).' },
        { text: 'IaC', info: 'Infrastructure as Code: Means managing and provisioning infrastructure through code rather than manual configuration.' },
        { text: 'Cloud Computing', info: 'Is all about delivering computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet (“the cloud”).' },
        { text: 'Automation', info: 'Automation is about using technology to perform tasks with minimal human assistance.' },
        { text: 'CI/CD', info: 'Continuous Integration and Continuous Delivery/Deployment: Practices to frequently integrate code changes and deliver software updates reliably and quickly.' },
        { text: 'Containers', info: 'This is a standardized unit of software that allows developers to isolate their app from its environment.' },
        { text: 'Kubernetes', info: 'K8s or Kubernetes, is an open-source system for automating deployment, scaling, and management of containerized applications.' },
        { text: 'Agile', info: 'Agile is a project management approach that emphasizes incremental delivery, team collaboration, continual planning, and continual learning.' },
        { text: 'Scripting', info: 'Is all automating scripts (e.g., Bash, Python) to automate tasks and manage systems.' }
        // Add more words and their descriptions
    ];

    const popup = document.getElementById('word-cloud-popup');
    const popupContent = document.getElementById('popup-content');
    const closeButton = popup.querySelector('.close-button');

    function displayWordCloud() {
        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word.text;
            span.style.fontSize = `${Math.random() * 1.5 + 0.8}em`; // Randomize size
            span.addEventListener('click', () => {
                popupContent.textContent = word.info;
                popup.classList.remove('hidden');
            });
            wordCloudContainer.appendChild(span);
        });
    }

    displayWordCloud();

    closeButton.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.add('hidden');
        }
    });

    // Theme Switching
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sections = document.querySelectorAll('section');
    const wordCloud = document.getElementById('word-cloud');
    const footer = document.querySelector('footer');
    const paletteButtons = document.querySelectorAll('.palette');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        sections.forEach(section => section.classList.toggle('dark-mode'));
        if (wordCloud) wordCloud.classList.toggle('dark-mode');
        footer.classList.toggle('dark-mode');
    });

    paletteButtons.forEach(palette => {
        palette.addEventListener('click', () => {
            const theme = palette.getAttribute('data-theme');
            body.className = theme; // Reset classes and add the selected theme
            sections.forEach(section => section.className = theme);
            if (wordCloud) wordCloud.className = theme;
            footer.className = theme;
            if (body.classList.contains('dark-mode')) {
                body.classList.add('dark-mode');
                sections.forEach(section => section.classList.add('dark-mode'));
                if (wordCloud) wordCloud.classList.add('dark-mode');
                footer.classList.add('dark-mode');
            }
        });
    });

    // Intersection Observer for Animated Skills/Interests
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    skillItems.forEach(item => {
        item.style.animationPlayState = 'paused'; // Start paused
        observer.observe(item);
    });
});