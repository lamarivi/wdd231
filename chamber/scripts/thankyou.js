document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const displayData = {
        name: `${urlParams.get('firstName') || ''} ${urlParams.get('lastName') || ''}`.trim(),
        email: urlParams.get('email') || 'Not provided',
        phone: urlParams.get('phone') || 'Not provided',
        business: urlParams.get('businessName') || 'Not provided',
        membership: getMembershipLevel(urlParams.get('membership')),
        timestamp: formatTimestamp(urlParams.get('timestamp'))
    };

    document.getElementById('displayName').textContent = displayData.name || 'Not provided';
    document.getElementById('displayEmail').textContent = displayData.email;
    document.getElementById('displayPhone').textContent = displayData.phone;
    document.getElementById('displayBusiness').textContent = displayData.business;
    document.getElementById('displayMembership').textContent = displayData.membership;
    document.getElementById('displayTimestamp').textContent = displayData.timestamp;

    localStorage.setItem('lastSubmission', JSON.stringify(displayData));
});

function getMembershipLevel(membership) {
    const levels = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    };
    return membership ? (levels[membership] || membership) : 'Not specified';
}

function formatTimestamp(timestamp) {
    if (!timestamp) return 'Not available';
    
    try {
        const date = new Date(timestamp);
        return isNaN(date) ? 'Invalid date' : 
            date.toLocaleString(navigator.language, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
    } catch (e) {
        return 'Invalid date format';
    }
}
