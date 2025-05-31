document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const displayElements = {
        'displayName': `${urlParams.get('firstName') || ''} ${urlParams.get('lastName') || ''}`.trim(),
        'displayEmail': urlParams.get('email') || 'Not provided',
        'displayPhone': urlParams.get('phone') || 'Not provided',
        'displayBusiness': urlParams.get('businessName') || 'Not provided',
        'displayMembership': getMembershipText(urlParams.get('membership')),
        'displayTimestamp': formatTimestamp(urlParams.get('timestamp'))
    };

    Object.entries(displayElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
});

function getMembershipText(membership) {
    switch(membership) {
        case 'np': return 'NP Membership (Non-Profit)';
        case 'bronze': return 'Bronze Membership';
        case 'silver': return 'Silver Membership';
        case 'gold': return 'Gold Membership';
        default: return membership || 'Not specified';
    }
}

function formatTimestamp(timestamp) {
    if (!timestamp) return 'Not available';
    
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
