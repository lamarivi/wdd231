document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    function displayValue(elementId, value, defaultValue = 'Not provided') {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value || defaultValue;
        }
    }
    
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');
    displayValue('displayName', `${firstName || ''} ${lastName || ''}`.trim());
    
    displayValue('displayEmail', urlParams.get('email'));
    displayValue('displayPhone', urlParams.get('phone'));
    displayValue('displayBusiness', urlParams.get('businessName'));

    const membership = urlParams.get('membership');
    const membershipText = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    }[membership] || 'Not selected';
    displayValue('displayMembership', membershipText);
    
    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
        try {
            const date = new Date(timestamp);
            displayValue('displayTimestamp', date.toLocaleString());
        } catch (e) {
            displayValue('displayTimestamp', 'Invalid date');
        }
    } else {
        displayValue('displayTimestamp', 'Not recorded');
    }

    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});
