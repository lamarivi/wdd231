document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Display functions
    function displayValue(elementId, value, defaultValue = 'Not provided') {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value || defaultValue;
        }
    }
    
    // Display combined name
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');
    displayValue('displayName', `${firstName || ''} ${lastName || ''}`.trim());
    
    // Display other fields
    displayValue('displayEmail', urlParams.get('email'));
    displayValue('displayPhone', urlParams.get('phone'));
    displayValue('displayBusiness', urlParams.get('businessName'));
    
    // Format membership level
    const membership = urlParams.get('membership');
    const membershipText = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    }[membership] || 'Not selected';
    displayValue('displayMembership', membershipText);
    
    // Format timestamp
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
    
    // Set footer info
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});
