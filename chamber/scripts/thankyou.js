const urlParams = new URLSearchParams(window.location.search);
    
    // Display submitted data
    document.getElementById('firstname').textContent = urlParams.get('firstname') || 'Not provided';
    document.getElementById('lastname').textContent = urlParams.get('lastname') || 'Not provided';
    document.getElementById('email').textContent = urlParams.get('email') || 'Not provided';
    document.getElementById('phone').textContent = urlParams.get('phone') || 'Not provided';
    document.getElementById('organization').textContent = urlParams.get('organization') || 'Not provided';
    document.getElementById('membership').textContent = urlParams.get('membership') || 'Not selected';
    
    // Format timestamp
    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
        const date = new Date(timestamp);
        document.getElementById('timestamp').textContent = date.toLocaleString();
    } else {
        document.getElementById('timestamp').textContent = 'Not recorded';
    }
