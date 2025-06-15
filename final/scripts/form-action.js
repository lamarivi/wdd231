document.addEventListener('DOMContentLoaded', function() {
    const displayFormData = () => {
        const formData = JSON.parse(sessionStorage.getItem('formSubmissionData'));
        const displayDiv = document.getElementById('formDataDisplay');
        
        if (formData && displayDiv) {
            const membershipLabels = {
                basic: 'Basic Member (Free)',
                supporter: 'Supporter ($50/year)',
                sponsor: 'Sponsor ($100/year)'
            };
            
            const interestsLabels = {
                marine: 'Marine Conservation',
                coastal: 'Coastal Ecosystems',
                education: 'Environmental Education',
                research: 'Scientific Research'
            };
            
            let html = `
                <h2>Your Submission Details</h2>
                <div class="form-data-grid">
                    <div class="form-data-item">
                        <h3>Personal Information</h3>
                        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
                        ${formData.organization ? `<p><strong>Organization:</strong> ${formData.organization}</p>` : ''}
                    </div>
                    
                    <div class="form-data-item">
                        <h3>Membership Details</h3>
                        <p><strong>Level:</strong> ${membershipLabels[formData.membership] || formData.membership}</p>
                        ${formData.interests && formData.interests.length > 0 ? `
                            <p><strong>Interests:</strong></p>
                            <ul>
                                ${formData.interests.map(interest => `<li>${interestsLabels[interest] || interest}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                    
                    ${formData.description ? `
                    <div class="form-data-item full-width">
                        <h3>Additional Information</h3>
                        <p>${formData.description}</p>
                    </div>
                    ` : ''}
                </div>
                <p class="submission-time">Submitted on: ${new Date(formData.timestamp).toLocaleString()}</p>
            `;
            
            displayDiv.innerHTML = html;
        } else {
            displayDiv.innerHTML = '<p>Thank you for your submission!</p>';
        }
    };
    
    displayFormData();
});