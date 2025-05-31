document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('timestamp').value = new Date().toISOString();
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}

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
    document.getElementById('displayTimestamp').textContent = timestamp.toLocaleString();
});