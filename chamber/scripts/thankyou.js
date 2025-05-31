document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Display submitted data
    const displayField = (elementId, paramName, defaultValue = 'Not provided') => {
        const element = document.getElementById(elementId);
        if (element) {
            const value = urlParams.get(paramName);
            element.textContent = value ? value : defaultValue;
        }
    };

    // Display combined first and last name
    const firstName = urlParams.get('firstName') || '';
    const lastName = urlParams.get('lastName') || '';
    const displayName = document.getElementById('displayName');
    if (displayName) {
        displayName.textContent = `${firstName} ${lastName}`.trim() || 'Not provided';
    }

    // Display other fields
    displayField('displayEmail', 'email');
    displayField('displayPhone', 'phone');
    displayField('displayBusiness', 'businessName');
    
    // Format membership level display
    const membership = urlParams.get('membership');
    const displayMembership = document.getElementById('displayMembership');
    if (displayMembership) {
        switch(membership) {
            case 'np':
                displayMembership.textContent = 'NP Membership (Non-Profit)';
                break;
            case 'bronze':
                displayMembership.textContent = 'Bronze Membership';
                break;
            case 'silver':
                displayMembership.textContent = 'Silver Membership';
                break;
            case 'gold':
                displayMembership.textContent = 'Gold Membership';
                break;
            default:
                displayMembership.textContent = 'Not selected';
        }
    }

    // Format timestamp display
    const timestamp = urlParams.get('timestamp');
    const displayTimestamp = document.getElementById('displayTimestamp');
    if (displayTimestamp) {
        if (timestamp) {
            const date = new Date(timestamp);
            displayTimestamp.textContent = date.toLocaleString();
        } else {
            displayTimestamp.textContent = 'Not recorded';
        }
    }

    // Set current year and last modified date
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});
