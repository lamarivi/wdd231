document.addEventListener('DOMContentLoaded', function() {
    initHamburgerMenu();

    const ngos = [
        {
            name: "Provita",
            description: "Community-Based Conservation Program for Threatened Species and Ecosystems",
            focus: "Conservation",
            website: "https://www.provita.org.ve/",
            logo: "images/provita.png"
        },
        {
            name: "Proyecto Margarita Verde",
            description: "Focuses on sustainable development and environmental education programs across the island.",
            focus: "Sustainability & Education",
            website: "https://somosmargaritaverde.blogspot.com/p/quienes-somos_24.html",
            logo: "images/somos.png"
        },
        {
            name: "CIT Venezuela",
            description: "Center for Shark Research in Venezuela",
            focus: "Coastal Protection",
            website: "https://citvenezuela.org/",
            logo: "images/CIT.png"
        }
    ];

    const tips = [
        {
            title: "Sustainable Fishing Practices",
            items: [
                "Follow local fishing regulations and size limits",
                "Use circle hooks to reduce bycatch",
                "Avoid fishing during spawning seasons",
                "Practice catch and release for vulnerable species"
            ]
        },
        {
            title: "Reef-Safe Sun Protection",
            items: [
                "Choose mineral-based sunscreens with zinc oxide or titanium dioxide",
                "Avoid oxybenzone and octinoxate chemicals",
                "Wear protective clothing instead of sunscreen when possible",
                "Look for 'Reef Safe' certified products"
            ]
        },
        {
            title: "Responsible Wildlife Viewing",
            items: [
                "Maintain a respectful distance from animals",
                "Never feed wild animals",
                "Avoid flash photography with sensitive species",
                "Choose eco-certified tour operators"
            ]
        }
    ];

    function renderNGOs(ngosData) {
        const container = document.getElementById('ngo-container');
        if (!container) return;
        
        container.innerHTML = '';

        ngosData.forEach(ngo => {
            const card = document.createElement('div');
            card.className = 'ngo-card';
            
            card.innerHTML = `
                <div class="ngo-image" style="background-image: url('${ngo.logo}')">
                    ${!ngo.logo ? '<i class="fas fa-hands-helping"></i>' : ''}
                </div>
                <div class="ngo-content">
                    <h3>${ngo.name}</h3>
                    <p><strong>Focus:</strong> ${ngo.focus}</p>
                    <p>${ngo.description}</p>
                    <a href="${ngo.website}" class="ngo-link" target="_blank">Visit Website</a>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    function renderTips(tipsData) {
        const container = document.getElementById('tips-container');
        if (!container) return;
        
        container.innerHTML = '';

        tipsData.forEach(tip => {
            const card = document.createElement('div');
            card.className = 'tip-card';
            
            const itemsList = tip.items.map(item => 
                `<li><span class="tip-icon">✓</span>${item}</li>`
            ).join('');
            
            card.innerHTML = `
                <div class="tip-header">${tip.title}</div>
                <div class="tip-content">
                    <ul>${itemsList}</ul>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    function initHamburgerMenu() {
        const hamburgerBtn = document.querySelector('.hamburger');
        const primaryNav = document.querySelector('.nav');

        if (!hamburgerBtn || !primaryNav) return;

        hamburgerBtn.setAttribute('aria-expanded', 'false');

        hamburgerBtn.addEventListener('click', toggleMenu);
        
        document.querySelectorAll('.nav-a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 767) {
                    closeMenu();
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 767 && primaryNav.classList.contains('active')) {
                if (!e.target.closest('.nav') && !e.target.closest('.hamburger')) {
                    closeMenu();
                }
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 767 && primaryNav.classList.contains('active')) {
                closeMenu();
            }
        });

        function toggleMenu() {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('active');
            document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
            hamburgerBtn.innerHTML = isExpanded ? '☰' : '✕';
        }

        function closeMenu() {
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            primaryNav.classList.remove('active');
            document.body.style.overflow = 'auto';
            hamburgerBtn.innerHTML = '☰';
        }
    }
    renderNGOs(ngos);
    renderTips(tips);
});