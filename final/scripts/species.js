document.addEventListener('DOMContentLoaded', function() {
    initHamburgerMenu();
    fetch('data/wildlife.json')
        .then(response => response.json())
        .then(data => {
            renderCards(data);
            setupFiltering();
        })
        .catch(error => {
            console.error('Error loading wildlife data:', error);
            document.getElementById('cards-container').innerHTML = 
                '<div class="error">Failed to load wildlife data. Please try again later.</div>';
        });
    
    function renderCards(speciesData) {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        
        if (speciesData.length === 0) {
            container.innerHTML = '<div class="loading">No wildlife data available.</div>';
            return;
        }
        
        speciesData.forEach(species => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.habitat = species.habitats.join(' ');
            
            const habitatBadges = species.habitats.map(habitat => 
                `<span class="habitat ${habitat.replace(' ', '-')}">${habitat.replace('-', ' ')}</span>`
            ).join(' ');
            
            let conservationHtml = '';
            if (species.conservationStatus) {
                conservationHtml = `
                    <div class="conservation-status">
                        <strong>Conservation Status:</strong> 
                        <span class="status-${species.conservationStatus.toLowerCase().replace(' ', '-')}">
                            ${species.conservationStatus}
                        </span>
                    </div>
                `;
            }
            
            card.innerHTML = `
                <div class="card-image" style="background-image: url('${species.image}');"></div>
                <div class="card-content">
                    <h3>${species.name}</h3>
                    <div class="habitats">${habitatBadges}</div>
                    <p class="species-description">${species.description}</p>
                    ${conservationHtml}
                    ${species.funFact ? `<div class="fun-fact">✨ <em>${species.funFact}</em></div>` : ''}
                </div>
            `;
            
            container.appendChild(card);
        });
    }
    
    function setupFiltering() {
        document.querySelectorAll('.filter-buttons button').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-buttons button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                document.querySelectorAll('.card').forEach(card => {
                    if (filter === 'all' || card.dataset.habitat.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
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
                if (window.innerWidth <= 600) {
                    closeMenu();
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 600 && primaryNav.classList.contains('active')) {
                if (!e.target.closest('.nav') && !e.target.closest('.hamburger')) {
                    closeMenu();
                }
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 600 && primaryNav.classList.contains('active')) {
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
});