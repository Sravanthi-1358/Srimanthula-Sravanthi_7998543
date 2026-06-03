/* ================================================
   LOCAL COMMUNITY EVENT PORTAL - JAVASCRIPT
   ALL 14 EXERCISES IMPLEMENTED
   ================================================ */

// ================================================
// EXERCISE 1: BASICS & SETUP
// ================================================

console.log('🎉 Welcome to the Community Portal - JavaScript Module Loaded!');

// Show alert when page is fully loaded
window.addEventListener('load', function() {
    console.log('✅ Page fully loaded and ready!');
});

// ================================================
// EXERCISE 2: DATA TYPES & OPERATORS
// ================================================

// Event data with const and let
const PORTAL_NAME = "Local Community Event Portal";
const LAUNCH_DATE = "2026-01-01";
let totalRegistrations = 0;

// Template literals for event information
function getEventDescription(eventName, eventDate, availableSeats) {
    return `📅 Event: ${eventName} | Date: ${eventDate} | Available Seats: ${availableSeats}`;
}

// Manage seat count with ++ and --
function registerForEvent(seatsAvailable) {
    if (seatsAvailable > 0) {
        totalRegistrations++;
        console.log(`✅ Registration successful! Total registrations: ${totalRegistrations}`);
        return true;
    }
    return false;
}

function cancelRegistration() {
    if (totalRegistrations > 0) {
        totalRegistrations--;
        console.log(`❌ Registration cancelled. Total registrations: ${totalRegistrations}`);
    }
}

// ================================================
// EXERCISE 3: CONDITIONALS, LOOPS, ERROR HANDLING
// ================================================

// Event data with validation
const events = [
    { id: 1, name: "Summer Music Festival", date: "2026-06-15", seats: 150, category: "music", isPast: false },
    { id: 2, name: "Sports Day", date: "2026-05-20", seats: 0, category: "sports", isPast: false },
    { id: 3, name: "Art Workshop", date: "2026-07-10", seats: 45, category: "art", isPast: false },
    { id: 4, name: "Food Festival", date: "2026-08-05", seats: 200, category: "food", isPast: false },
    { id: 5, name: "Tech Meetup", date: "2026-09-12", seats: 80, category: "tech", isPast: false },
    { id: 6, name: "Children's Fun Day", date: "2026-07-22", seats: 300, category: "family", isPast: false }
];

// Show only valid events (upcoming and with seats)
function getValidEvents() {
    const validEvents = [];
    
    try {
        events.forEach(event => {
            if (event.seats > 0 && !event.isPast) {
                validEvents.push(event);
            }
        });
        return validEvents;
    } catch(error) {
        console.error('❌ Error filtering events:', error);
        return [];
    }
}

// Display event count
function displayEventStats() {
    const validEvents = getValidEvents();
    console.log(`📊 Event Statistics: ${validEvents.length} upcoming events available`);
}

// ================================================
// EXERCISE 4: FUNCTIONS, CLOSURES, HIGHER-ORDER
// ================================================

// Function to add new event
function addEvent(eventData) {
    try {
        if (!eventData.name || !eventData.date) {
            throw new Error('Event name and date are required');
        }
        const newEvent = {
            id: events.length + 1,
            ...eventData,
            isPast: false
        };
        events.push(newEvent);
        console.log(`✅ Event added: ${eventData.name}`);
        return newEvent;
    } catch(error) {
        console.error('❌ Error adding event:', error.message);
    }
}

// Function to register user
function registerUser(eventId, userName) {
    try {
        const event = events.find(e => e.id === eventId);
        if (!event) throw new Error('Event not found');
        if (event.seats <= 0) throw new Error('No seats available');
        
        event.seats--;
        totalRegistrations++;
        console.log(`✅ ${userName} registered for ${event.name}`);
        return { success: true, event, userName };
    } catch(error) {
        console.error('❌ Registration error:', error.message);
        return { success: false, error: error.message };
    }
}

// Closure: Track registrations per category
const createCategoryTracker = () => {
    const categoryStats = {};
    
    return {
        addRegistration: (category) => {
            categoryStats[category] = (categoryStats[category] || 0) + 1;
            return categoryStats[category];
        },
        getStats: () => categoryStats,
        getTotal: () => Object.values(categoryStats).reduce((sum, count) => sum + count, 0)
    };
};

const categoryTracker = createCategoryTracker();

// Higher-order function: Filter events with callback
function filterEvents(filterFn) {
    return events.filter(filterFn);
}

function filterEventsByCategory(category) {
    return filterEvents(event => event.category === category);
}

function filterEventsBySeats(minSeats) {
    return filterEvents(event => event.seats >= minSeats);
}

// ================================================
// EXERCISE 5: OBJECTS & PROTOTYPES
// ================================================

// Event Constructor
function Event(name, date, location, seats, category) {
    this.name = name;
    this.date = date;
    this.location = location;
    this.seats = seats;
    this.category = category;
    this.registeredUsers = [];
}

// Prototype method: Check availability
Event.prototype.checkAvailability = function() {
    return this.seats > 0;
};

// Prototype method: Register user
Event.prototype.registerAttendee = function(userName) {
    if (this.checkAvailability()) {
        this.registeredUsers.push(userName);
        this.seats--;
        return true;
    }
    return false;
};

// Get object entries
function getEventDetails(event) {
    const details = Object.entries(event).map(([key, value]) => {
        return `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
    });
    return details.join(' | ');
}

// ================================================
// EXERCISE 6: ARRAYS & ARRAY METHODS
// ================================================

// Array operations
const eventList = [...events]; // Spread operator - copy

// Map: Format event cards
function formatEventCards(eventArray) {
    return eventArray.map(event => ({
        title: `🎪 ${event.name}`,
        info: `📅 ${event.date} | 💺 ${event.seats} seats`,
        category: `📌 ${event.category}`,
        status: event.seats > 0 ? '✅ Available' : '❌ Full'
    }));
}

// Filter: Get specific category
function getMusicEvents() {
    return events.filter(e => e.category === 'music');
}

// Find: Get single event
function getEventById(id) {
    return events.find(e => e.id === id);
}

// Some: Check if any event is available
function hasAvailableEvents() {
    return events.some(e => e.seats > 0);
}

// Every: Check if all events are available
function allEventsAvailable() {
    return events.every(e => e.seats > 0);
}

// ================================================
// EXERCISE 7: DOM MANIPULATION
// ================================================

// Access DOM elements
function initializeDOMElements() {
    const eventContainer = document.querySelector('.event-grid');
    const filterButtons = document.querySelectorAll('.event-filter-btn');
    const registrationForm = document.getElementById('registrationForm');
    
    return { eventContainer, filterButtons, registrationForm };
}

// Create and render event cards
function renderEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.dataset.category = event.category;
    card.style.cssText = `
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    `;
    
    card.innerHTML = `
        <div style="position: relative; height: 200px; overflow: hidden;">
            <img src="https://via.placeholder.com/400x250?text=${event.name}" alt="${event.name}" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; top: 10px; right: 10px; background: #667eea; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: bold; font-size: 0.9rem;">
                📌 ${event.category}
            </div>
        </div>
        <div style="padding: 1.5rem;">
            <h3 style="color: #2c3e50; margin: 0 0 0.5rem 0;">${event.name}</h3>
            <p style="color: #666; font-size: 0.95rem; margin: 0.5rem 0;">
                📅 ${event.date} | 💺 ${event.seats} seats available
            </p>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee;">
                <button onclick="quickRegister(${event.id})" style="
                    width: 100%;
                    padding: 0.8rem;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s;
                ">
                    Register Now →
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// ================================================
// EXERCISE 8: EVENT HANDLING
// ================================================

// Click event: Register button
function quickRegister(eventId) {
    const result = registerUser(eventId, 'Anonymous User');
    if (result.success) {
        alert(`✅ Successfully registered for ${result.event.name}!`);
        updateEventDisplay();
    } else {
        alert(`❌ Registration failed: ${result.error}`);
    }
}

// Change event: Filter by category
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.event-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category || 'all';
            filterEventsByDisplay(category);
        });
    });
}

// Filter events display
function filterEventsByDisplay(category) {
    const cards = document.querySelectorAll('.event-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            card.style.display = 'none';
        }
    });
    
    console.log(`🔍 Filtered events by: ${category}`);
}

// Keydown event: Quick search
document.addEventListener('keydown', function(event) {
    if (event.key === '/' && event.ctrlKey) {
        event.preventDefault();
        console.log('⚡ Quick search activated!');
    }
});

// ================================================
// EXERCISE 9: ASYNC JS, PROMISES, ASYNC/AWAIT
// ================================================

// Fetch events from the backend API
async function fetchEventsFromAPI() {
    try {
        const response = await fetch('/api/events');
        if (!response.ok) {
            throw new Error(`Server error ${response.status}`);
        }
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.message || 'Failed to load events');
        }
        return result.data;
    } catch(error) {
        console.error('❌ Failed to fetch events:', error);
        return [];
    }
}

// Using .then() and .catch()
function loadEventsWithPromises() {
    console.log('📡 Fetching events from API...');
    
    fetchEventsFromAPI()
        .then(response => {
            console.log(`✅ Loaded ${response.length} events`);
            return response;
        })
        .catch(error => {
            console.error('❌ Failed to fetch events:', error);
        });
}

// Async/Await version
async function loadEventsWithAsyncAwait() {
    try {
        console.log('📡 Fetching events (async/await)...');
        
        const result = await fetchEventsFromAPI();
        if (result.length > 0) {
            events.splice(0, events.length, ...result);
            updateEventDisplay();
            populateEventSelect(result);
        }
        
        console.log(`✅ Total events loaded: ${events.length}`);
        return result;
    } catch(error) {
        console.error('❌ Error loading events:', error);
        return [];
    }
}

// Simulate server submission with async/await (fallback)
async function submitRegistrationAsync(eventId, userName, email) {
    try {
        console.log('📤 Submitting registration...');
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return {
            success: true,
            message: `✅ ${userName} registered successfully!`,
            eventId,
            timestamp: new Date().toISOString()
        };
    } catch(error) {
        console.error('❌ Submission failed:', error);
        return { success: false, error: error.message };
    }
}

// ================================================
// EXERCISE 10: MODERN JAVASCRIPT (ES6+)
// ================================================

// let, const, default parameters
const createEventSummary = (event, includeDetails = true) => {
    let summary = `${event.name} (${event.category})`;
    
    if (includeDetails) {
        summary += ` - ${event.date} - ${event.seats} seats`;
    }
    
    return summary;
};

// Destructuring
function displayEventInfo({ name, date, seats, category }) {
    return `
        Event: ${name}
        Category: ${category}
        Date: ${date}
        Available Seats: ${seats}
    `;
}

// Spread operator
function cloneAndModifyEvents(eventArray, category) {
    return [...eventArray].filter(e => e.category === category);
}

// Arrow functions
const getEventStats = (eventArray) => ({
    total: eventArray.length,
    available: eventArray.filter(e => e.seats > 0).length,
    categories: [...new Set(eventArray.map(e => e.category))]
});

// ================================================
// EXERCISE 11: FORM HANDLING
// ================================================

// Setup form validation
function setupFormHandling() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    try {
        const formData = new FormData(this);
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const eventType = formData.get('eventType');
        const phone = formData.get('phone');
        const attendees = formData.get('attendees');
        const dietaryNeeds = formData.get('dietaryNeeds');
        const message = formData.get('message');
        const newsletter = formData.get('newsletter') === 'on';
        const terms = formData.get('terms') === 'on';

        if (!fullName || !email || !eventType || !terms) {
            throw new Error('Please complete all required fields and accept the terms.');
        }

        if (!validateEmail(email)) {
            throw new Error('Please enter a valid email');
        }

        const serverResult = await submitRegistrationToServer({
            fullName,
            email,
            phone,
            attendees,
            dietaryNeeds,
            message,
            newsletter,
            eventId: eventType,
            eventType
        });

        const output = document.getElementById('confirmationOutput');
        if (serverResult.success) {
            output.textContent = `✓ Registration confirmed! ${serverResult.message}`;
            output.style.display = 'block';
            output.style.backgroundColor = '#d4edda';
            output.style.borderLeft = '4px solid #28a745';
            output.style.color = '#155724';
            this.reset();
        } else {
            throw new Error(serverResult.error || serverResult.message || 'Registration failed');
        }
    } catch(error) {
        console.error('❌ Form error:', error.message);
        alert(`❌ Error: ${error.message}`);
    }
}

async function submitRegistrationToServer(userData) {
    try {
        console.log('📤 Sending registration to server...', userData);
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server returned ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log('✅ Server response:', result);
        return result;
    } catch(error) {
        console.error('❌ Request failed:', error);
        return { success: false, error: error.message };
    }
}

function populateEventSelect(eventList) {
    const selectElement = document.getElementById('eventType');
    if (!selectElement || !Array.isArray(eventList)) return;

    selectElement.innerHTML = '<option value="">-- Select an event --</option>';
    eventList.forEach(event => {
        const option = document.createElement('option');
        option.value = event.eventId;
        option.textContent = `${event.title} (${event.city} • ${event.startDate.substring(0, 10)})`;
        selectElement.appendChild(option);
    });
}

// Email validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Show inline errors
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '#e74c3c';
        field.title = message;
    }
}

// ================================================
// EXERCISE 12: FETCH API & AJAX
// ================================================

// Mock user registration endpoint
async function submitRegistrationToServer(userData) {
    try {
        console.log('📤 Sending data to server...');
        
        // Simulate fetch request
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        success: true,
                        registrationId: Math.floor(Math.random() * 10000),
                        message: 'Registration confirmed!'
                    })
                });
            }, 1500);
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log(`✅ Server response:`, result);
            return result;
        } else {
            throw new Error('Server error');
        }
    } catch(error) {
        console.error('❌ Request failed:', error);
        return { success: false, error: error.message };
    }
}

// Real fetch example (commented out - use for production)
/*
async function fetchEventDataFromServer() {
    try {
        const response = await fetch('https://api.example.com/events');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Events from server:', data);
        return data;
    } catch(error) {
        console.error('Fetch error:', error);
    }
}
*/

// ================================================
// EXERCISE 13: DEBUGGING & TESTING
// ================================================

// Debug helper function
function debugEventState() {
    console.group('🔍 Event Portal Debug Info');
    
    console.log('📊 Total Events:', events.length);
    console.log('📝 Available Events:', getValidEvents().length);
    console.log('👥 Total Registrations:', totalRegistrations);
    console.log('📈 Category Stats:', categoryTracker.getStats());
    console.log('🎪 All Events:', events);
    
    console.groupEnd();
}

// Test event operations
function runTests() {
    console.group('🧪 Running Tests');
    
    // Test 1: Add event
    const newEvent = addEvent({ 
        name: 'Jazz Night', 
        date: '2026-10-01', 
        seats: 100, 
        category: 'music' 
    });
    console.log('✅ Test 1 - Add Event:', newEvent ? 'PASSED' : 'FAILED');
    
    // Test 2: Register user
    const registration = registerUser(1, 'John Doe');
    console.log('✅ Test 2 - Register User:', registration.success ? 'PASSED' : 'FAILED');
    
    // Test 3: Filter by category
    const musicEvents = filterEventsByCategory('music');
    console.log('✅ Test 3 - Filter Category:', musicEvents.length > 0 ? 'PASSED' : 'FAILED');
    
    // Test 4: Validate email
    const validEmail = validateEmail('test@example.com');
    console.log('✅ Test 4 - Email Validation:', validEmail ? 'PASSED' : 'FAILED');
    
    // Test 5: Format event cards
    const cards = formatEventCards(events);
    console.log('✅ Test 5 - Format Cards:', cards.length > 0 ? 'PASSED' : 'FAILED');
    
    console.groupEnd();
}

// ================================================
// EXERCISE 14: JQUERY CONCEPTS & MODERN FRAMEWORKS
// ================================================

// jQuery-style selectors using vanilla JS (alternative)
const $ = {
    id: (id) => document.getElementById(id),
    class: (className) => document.querySelectorAll(`.${className}`),
    query: (selector) => document.querySelector(selector),
    queryAll: (selector) => document.querySelectorAll(selector),
    
    // jQuery-like methods
    fadeIn: (element, duration = 500) => {
        element.style.opacity = '0';
        element.style.display = 'block';
        element.style.transition = `opacity ${duration}ms`;
        setTimeout(() => { element.style.opacity = '1'; }, 10);
    },
    
    fadeOut: (element, duration = 500) => {
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = '0';
        setTimeout(() => { element.style.display = 'none'; }, duration);
    }
};

// Modern event handling (reactive updates)
function setupReactiveEventHandlers() {
    const filterButtons = document.querySelectorAll('.event-filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
            
            // Update display
            filterEventsByDisplay(e.target.dataset.category || 'all');
        });
    });
}

// ================================================
// INITIALIZATION & MAIN LOGIC
// ================================================

// Update event display
function updateEventDisplay() {
    const eventContainer = document.querySelector('.event-grid');
    if (!eventContainer) return;
    
    eventContainer.innerHTML = '';
    
    const validEvents = getValidEvents();
    const cards = validEvents.map(event => renderEventCard(event));
    
    cards.forEach(card => eventContainer.appendChild(card));
    
    console.log(`✅ Rendered ${cards.length} event cards`);
}

// Initialize portal on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Community Portal...');
    
    try {
        // Display statistics
        displayEventStats();
        
        // Setup event handlers
        setupCategoryFilters();
        setupFormHandling();
        setupReactiveEventHandlers();
        
        // Render initial events
        updateEventDisplay();
        
        // Load events async
        loadEventsWithAsyncAwait();
        
        // Run tests (comment out in production)
        runTests();
        
        console.log('✅ Portal initialized successfully!');
        
    } catch(error) {
        console.error('❌ Initialization error:', error);
    }
});

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Export functions for global use
window.portal = {
    events,
    registerUser,
    getEventById,
    filterEventsByCategory,
    debugEventState,
    getMusicEvents,
    formatEventCards,
    createEventSummary,
    displayEventInfo,
    getEventStats,
    quickRegister,
    updateEventDisplay,
    submitRegistrationAsync,
    submitRegistrationToServer,
    categoryTracker
};

console.log('🎉 All JavaScript Exercises Implemented Successfully!');
console.log('Type portal.debugEventState() in console to see full state');
console.log('Type portal.events to see all events');

// ============================================
// BOOTSTRAP 5 EXERCISES - JAVASCRIPT
// ============================================

console.log('🎉 Bootstrap 5 Framework integrated into portal!');
console.log('📚 All 19 Bootstrap exercises implemented');

// EXERCISE 18: Bootstrap JavaScript Plugins
// Function to show Bootstrap Toast
function showToast() {
    const toastElement = document.getElementById('bootstrapToast');
    if (toastElement) {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }
}

// Initialize tooltips and popovers on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize all popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    console.log('✅ Bootstrap plugins initialized');
});

// EXERCISE 2.2: Bootstrap JavaScript Plugins Setup
document.addEventListener('show.bs.collapse', function(e) {
    console.log('📂 Collapse opened:', e.target.id);
});

document.addEventListener('hide.bs.collapse', function(e) {
    console.log('📁 Collapse closed:', e.target.id);
});

// EXERCISE 7: Form Validation with Bootstrap
const bootstrapForm = document.querySelector('form');
if (bootstrapForm) {
    bootstrapForm.addEventListener('submit', function(event) {
        if (!bootstrapForm.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        bootstrapForm.classList.add('was-validated');
    });
}

// EXERCISE 17: Bootstrap Icons Integration
const iconsInfo = {
    home: '<i class="bi bi-house-door"></i>',
    events: '<i class="bi bi-ticket-perforated"></i>',
    register: '<i class="bi bi-pencil-square"></i>',
    feedback: '<i class="bi bi-chat-left-dots"></i>',
    settings: '<i class="bi bi-gear"></i>',
    help: '<i class="bi bi-question-circle"></i>',
    success: '<i class="bi bi-check-circle text-success"></i>',
    error: '<i class="bi bi-x-circle text-danger"></i>',
    warning: '<i class="bi bi-exclamation-triangle text-warning"></i>'
};

console.log('🎨 Bootstrap Icons integrated from CDN');

// EXERCISE 9: Button Interactions
document.querySelectorAll('.btn-group .btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.querySelectorAll('.btn').forEach(b => {
            b.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// EXERCISE 8: Form Handling with Bootstrap
function bootstrapFormHandler() {
    const form = document.querySelector('form');
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('✅ Form submitted:', data);
        showToast();
    }
}

// EXERCISE 13: Dynamic Color Scheme
const colorSchemes = {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
    light: '#f8f9fa',
    dark: '#212529'
};

function getBootstrapColor(colorName) {
    return colorSchemes[colorName] || colorSchemes.primary;
}

// EXERCISE 14: Responsive Display Utilities
function checkResponsiveBreakpoint() {
    const width = window.innerWidth;
    let breakpoint = 'xs';
    
    if (width >= 576) breakpoint = 'sm';
    if (width >= 768) breakpoint = 'md';
    if (width >= 992) breakpoint = 'lg';
    if (width >= 1200) breakpoint = 'xl';
    if (width >= 1400) breakpoint = 'xxl';
    
    console.log(`📐 Current breakpoint: ${breakpoint} (${width}px)`);
    return breakpoint;
}

window.addEventListener('load', checkResponsiveBreakpoint);
window.addEventListener('resize', checkResponsiveBreakpoint);

// EXERCISE 16: Positioning Utilities
function addBadgeToImage(imageSelector, badgeText) {
    const img = document.querySelector(imageSelector);
    if (img) {
        const badge = document.createElement('span');
        badge.className = 'badge bg-danger position-absolute top-0 start-100 translate-middle';
        badge.textContent = badgeText;
        img.parentElement.classList.add('position-relative');
        img.parentElement.appendChild(badge);
    }
}

// EXERCISE 12: Spacing Utilities Helper
function applyBootstrapSpacing(element, margin, padding) {
    if (margin) element.classList.add(...margin.split(' '));
    if (padding) element.classList.add(...padding.split(' '));
}

// EXERCISE 11: Card Component Utilities
function createBootstrapCard(title, content, imageUrl, btnText = 'Learn More') {
    const card = document.createElement('div');
    card.className = 'card border-0 shadow-lg';
    
    let html = '';
    if (imageUrl) {
        html += `<img src="${imageUrl}" class="card-img-top" alt="${title}">`;
    }
    
    html += `
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${content}</p>
            <a href="#" class="btn btn-primary btn-sm">${btnText}</a>
        </div>
    `;
    
    card.innerHTML = html;
    return card;
}

// EXERCISE 10: Navigation Utilities
function setActiveNavLink(linkSelector) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(linkSelector);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// EXERCISE 6: Flexbox Utilities
function centerElement(element) {
    element.classList.add('d-flex', 'justify-content-center', 'align-items-center');
}

function flexBetween(element) {
    element.classList.add('d-flex', 'justify-content-between', 'align-items-center');
}

// EXERCISE 5: Grid Reordering
function reorderColumns(containerId, columnOrder) {
    const container = document.getElementById(containerId);
    if (container) {
        const columns = container.querySelectorAll('.col');
        columns.forEach((col, index) => {
            if (columnOrder[index]) {
                col.classList.add(`order-${columnOrder[index]}`);
            }
        });
    }
}

// EXERCISE 3: Responsive Testing
function testResponsiveLayout() {
    const testCases = [
        { width: 320, name: 'Mobile XS' },
        { width: 576, name: 'Small (SM)' },
        { width: 768, name: 'Medium (MD)' },
        { width: 992, name: 'Large (LG)' },
        { width: 1200, name: 'Extra Large (XL)' },
        { width: 1400, name: 'Extra Extra Large (XXL)' }
    ];
    
    console.group('📱 Bootstrap Responsive Breakpoints');
    testCases.forEach(test => {
        console.log(`${test.name}: ${test.width}px`);
    });
    console.groupEnd();
}

testResponsiveLayout();

// Export Bootstrap utilities
window.bootstrapExercises = {
    showToast,
    getBootstrapColor,
    checkResponsiveBreakpoint,
    addBadgeToImage,
    applyBootstrapSpacing,
    createBootstrapCard,
    setActiveNavLink,
    centerElement,
    flexBetween,
    reorderColumns,
    testResponsiveLayout,
    colorSchemes,
    iconsInfo
};

console.log('✅ Bootstrap utilities available! Access via: bootstrapExercises.functionName()');