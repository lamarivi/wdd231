document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);

  document.getElementById('displayName').textContent =
    `${urlParams.get('firstName') || ''} ${urlParams.get('lastName') || ''}`.trim() || 'Not provided';

  document.getElementById('displayEmail').textContent = urlParams.get('email') || 'Not provided';
  document.getElementById('displayPhone').textContent = urlParams.get('phone') || 'Not provided';
  document.getElementById('displayBusiness').textContent = urlParams.get('businessName') || 'Not provided';
  document.getElementById('displayTimestamp').textContent = formatTimestamp(urlParams.get('timestamp'));
  document.getElementById('displayMembership').textContent = getMembershipLevel(urlParams.get('membership'));

  function getMembershipLevel(level) {
    const levels = {
      'np': 'NP Membership (Non-Profit)',
      'bronze': 'Bronze Membership',
      'silver': 'Silver Membership',
      'gold': 'Gold Membership'
    };
    return level ? (levels[level] || level) : 'Not specified';
  }

  function formatTimestamp(timestamp) {
    if (!timestamp) return 'Not available';
    try {
      const date = new Date(timestamp);
      return isNaN(date.getTime()) ? 'Invalid date' :
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
});
