fetch('data/attractions.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.querySelector('.attractions-grid');
    
    data.attractions.forEach((attraction, index) => {
      const card = document.createElement('article');
      card.className = 'attraction-card';
      card.id = `card${index + 1}`;
      
      card.innerHTML = `
        <h2>${attraction.name}</h2>
        <figure>
          <img src="${attraction.image}" alt="${attraction.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${attraction.address}</address>
        <p>${attraction.description}</p>
        <a href="#" class="btn">Learn More</a>
      `;
      
      grid.appendChild(card);
    });
  });

function displayVisitMessage() {
  const visitMessage = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastVisit');
  const currentDate = Date.now();
  
  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
    
    if (daysBetween < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const dayText = daysBetween === 1 ? "day" : "days";
      visitMessage.textContent = `You last visited ${daysBetween} ${dayText} ago.`;
    }
  }
  
  localStorage.setItem('lastVisit', currentDate);
}

document.addEventListener('DOMContentLoaded', displayVisitMessage);