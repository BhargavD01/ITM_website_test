document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const activityForm = document.getElementById('activity-form');
    const activitiesContainer = document.getElementById('activities-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Variables
    let activities = JSON.parse(localStorage.getItem('activities')) || [];
    const targetHours = 100;
    
    // Initialize
    renderActivities();
    updateProgress();
    
    // Event Listeners
    activityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newActivity = {
            id: Date.now(),
            name: document.getElementById('activity-name').value,
            type: document.getElementById('activity-type').value,
            date: document.getElementById('activity-date').value,
            hours: parseInt(document.getElementById('activity-hours').value)
        };
        
        activities.push(newActivity);
        saveActivities();
        renderActivities();
        updateProgress();
        activityForm.reset();
    });
    
    // Filter activities
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderActivities(this.dataset.filter);
        });
    });
    
    // Delete activity
    activitiesContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const activityId = parseInt(e.target.closest('.activity-card').dataset.id);
            activities = activities.filter(activity => activity.id !== activityId);
            saveActivities();
            renderActivities();
            updateProgress();
        }
    });
    
    // Functions
    function renderActivities(filter = 'all') {
        let filteredActivities = filter === 'all' ? activities : 
            activities.filter(activity => activity.type === filter);
        
        if (filteredActivities.length === 0) {
            activitiesContainer.innerHTML = `
                <div class="empty-state">
                    <img src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" alt="No activities">
                    <p>No ${filter === 'all' ? '' : filter} activities found</p>
                </div>
            `;
            return;
        }
        
        activitiesContainer.innerHTML = '';
        
        filteredActivities.forEach(activity => {
            const activityCard = document.createElement('div');
            activityCard.className = 'activity-card';
            activityCard.dataset.id = activity.id;
            activityCard.innerHTML = `
                <div class="activity-type">${activity.type}</div>
                <h3>${activity.name}</h3>
                <p><i class="far fa-calendar-alt"></i> ${new Date(activity.date).toLocaleDateString()}</p>
                <p><i class="far fa-clock"></i> ${activity.hours} hours</p>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            `;
            activitiesContainer.appendChild(activityCard);
        });
    }
    
    function updateProgress() {
        const totalHours = activities.reduce((sum, activity) => sum + activity.hours, 0);
        const progressPercentage = Math.min(Math.round((totalHours / targetHours) * 100), 100);
        
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `${progressPercentage}% Complete (${totalHours}/${targetHours} hours)`;
    }
    
    function saveActivities() {
        localStorage.setItem('activities', JSON.stringify(activities));
    }
});

// Add this to your existing JavaScript
document.querySelector('.enrol-now-banner').addEventListener('click', function() {
    // Change this URL to your actual enrolment page
    window.location.href = 'https://isu.ac.in/btech-cse/';
});