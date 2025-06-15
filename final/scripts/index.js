document.addEventListener('DOMContentLoaded', () => {
  initQuickFacts();
  initHamburgerMenu();

  async function initQuickFacts() {
    const factsContainer = document.getElementById('facts-container');
    const JSON_PATH = 'data/quick-facts.json';
    
    showLoadingState();
    await loadQuickFacts();

    async function loadQuickFacts() {
      try {
        const response = await fetch(JSON_PATH);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        if (!data?.quickFacts) throw new Error("Invalid data format");
        
        displayAllFacts(data.quickFacts);
      } catch (error) {
        console.error('Error:', error);
        showErrorState(error);
        loadFallbackData();
      }
    }

    function loadFallbackData() {
      const fallbackData = {
        size: {
          area: "1,020 km²",
          length: "78 km",
          width: "20 km",
          significance: "Largest island in Venezuela",
          image: "images/island-aerial.jpg"
        },
        ecosystems: [
          {
            name: "Mangroves of La Restinga",
            type: "Coastal",
            keySpecies: ["Red mangrove", "Blue crab", "Scarlet ibis"],
            location: "Northeast coast",
            image: "images/mangroves.jpg"
          }
        ]
      };
      displayAllFacts(fallbackData);
    }

    function showLoadingState() {
      factsContainer.innerHTML = '<div class="loading">Loading facts...</div>';
    }

    function showErrorState(error) {
      factsContainer.innerHTML = `
        <div class="error">
          <h3>⚠️ Data Unavailable</h3>
          <p>${error.message}</p>
          <p>Showing sample data instead</p>
        </div>
      `;
    }

    function displayAllFacts(facts) {
      factsContainer.innerHTML = '';
      
      if (facts.size) {
        factsContainer.appendChild(createCard({
          title: "Island Size",
          content: `
            <p><strong>Area:</strong> ${facts.size.area}</p>
            <p><strong>Length:</strong> ${facts.size.length}</p>
            <p><strong>Width:</strong> ${facts.size.width}</p>
            ${facts.size.significance ? `<p>${facts.size.significance}</p>` : ''}
          `,
          image: facts.size.image
        }));
      }

      if (facts.ecosystems?.length) {
        facts.ecosystems.forEach(eco => {
          factsContainer.appendChild(createCard({
            title: eco.name,
            subtitle: eco.type,
            content: `
              <div class="species-list">
                <p><em>Key Species:</em></p>
                <ul>
                  ${eco.keySpecies?.map(s => `<li>${s}</li>`).join('') || '<li>No species data</li>'}
                </ul>
              </div>
              ${eco.location ? `<p class="location">🗺️ ${eco.location}</p>` : ''}
            `,
            image: eco.image
          }));
        });
      }
    }

    function createCard({ title, subtitle, content, image }) {
      const card = document.createElement('div');
      card.className = 'fact-card';
      
      card.innerHTML = `
        ${image ? `
          <div class="card-image">
            <img src="${image}" alt="${title}" loading="lazy">
          </div>
        ` : ''}
        <div class="card-content">
          <h3>${title}</h3>
          ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
          ${content}
        </div>
      `;
      
      return card;
    }
  }

  function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const primaryNav = document.getElementById('primaryNav');

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
});