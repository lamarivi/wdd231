document.addEventListener('DOMContentLoaded', function() {
const urlParams = new URLSearchParams(window.location.search);
    
document.getElementById('displayName').textContent = 
`${urlParams.get('firstName')} ${urlParams.get('lastName')}`;
document.getElementById('displayEmail').textContent = urlParams.get('email');
document.getElementById('displayPhone').textContent = urlParams.get('phone');
document.getElementById('displayBusiness').textContent = urlParams.get('businessName');
    
const membership = urlParams.get('membership');
let membershipText = '';
switch(membership) {
    case 'np': membershipText = 'NP Membership (Non-Profit)'; break;
    case 'bronze': membershipText = 'Bronze Membership'; break;
    case 'silver': membershipText = 'Silver Membership'; break;
    case 'gold': membershipText = 'Gold Membership'; break;
    default: membershipText = membership;
}
document.getElementById('displayMembership').textContent = membershipText;
    
const timestamp = new Date(urlParams.get('timestamp'));
const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};
document.getElementById('displayTimestamp').textContent = timestamp.toLocaleDateString('en-US', options);
    
for (let i = 0; i < 10; i++) {
    createConfetti();
}
});

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = confetti.style.width;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    document.querySelector('.confetti').appendChild(confetti);
}

function getRandomColor() {
    const colors = ['#0056b3', '#cf142b', '#ffcc00', '#4CAF50', '#9C27B0'];
    return colors[Math.floor(Math.random() * colors.length)];
}