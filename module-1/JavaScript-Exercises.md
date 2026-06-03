# JAVASCRIPT EXERCISES - COMPLETE DOCUMENTATION

## Local Community Event Portal - JavaScript Implementation Guide

All 14 JavaScript exercises have been implemented in `main.js` with practical, real-world functionality for the Community Event Portal.

---

## EXERCISE 1: BASICS & SETUP ✅

### Objective
Configure environment and test basic script functionality.

### Implementation
```javascript
console.log('🎉 Welcome to the Community Portal - JavaScript Module Loaded!');

window.addEventListener('load', function() {
    console.log('✅ Page fully loaded and ready!');
});
```

### File Linking
```html
<!-- In index.html -->
<script src="main.js"></script>
```

### Console Output
When you load the page, check the browser console (F12):
```
🎉 Welcome to the Community Portal - JavaScript Module Loaded!
✅ Page fully loaded and ready!
```

---

## EXERCISE 2: DATA TYPES & OPERATORS ✅

### Objective
Store event details using proper data types and operators.

### Implementation

#### Constants and Variables
```javascript
const PORTAL_NAME = "Local Community Event Portal";
const LAUNCH_DATE = "2026-01-01";
let totalRegistrations = 0;
```

#### Template Literals
```javascript
function getEventDescription(eventName, eventDate, availableSeats) {
    return `📅 Event: ${eventName} | Date: ${eventDate} | Available Seats: ${availableSeats}`;
}

// Usage:
getEventDescription("Music Festival", "2026-06-15", 150)
// Output: "📅 Event: Music Festival | Date: 2026-06-15 | Available Seats: 150"
```

#### Increment/Decrement Operators
```javascript
function registerForEvent(seatsAvailable) {
    if (seatsAvailable > 0) {
        totalRegistrations++;  // Increment
        return true;
    }
    return false;
}

function cancelRegistration() {
    if (totalRegistrations > 0) {
        totalRegistrations--;  // Decrement
    }
}
```

**Key Concepts:**
- `const` for immutable values (event names, dates)
- `let` for mutable counters (seat count, registrations)
- Template literals for string interpolation
- `++` and `--` for state management

---

## EXERCISE 3: CONDITIONALS, LOOPS, ERROR HANDLING ✅

### Objective
Filter valid events and handle errors gracefully.

### Sample Event Data
```javascript
const events = [
    { id: 1, name: "Summer Music Festival", date: "2026-06-15", seats: 150, category: "music", isPast: false },
    { id: 2, name: "Sports Day", date: "2026-05-20", seats: 0, category: "sports", isPast: false },
    { id: 3, name: "Art Workshop", date: "2026-07-10", seats: 45, category: "art", isPast: false },
    // ... more events
];
```

### Implementation

#### If-Else Conditional
```javascript
function getValidEvents() {
    const validEvents = [];
    
    try {
        events.forEach(event => {
            // Only show upcoming events with available seats
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
```

#### Loop: forEach
```javascript
function displayEventStats() {
    const validEvents = getValidEvents();
    console.log(`📊 Event Statistics: ${validEvents.length} upcoming events available`);
}
```

**Key Concepts:**
- `if-else` for conditional logic
- `forEach()` for iteration with side effects
- `try-catch` for error handling
- Early returns on invalid data

---

## EXERCISE 4: FUNCTIONS, CLOSURES, HIGHER-ORDER FUNCTIONS ✅

### Objective
Create reusable, encapsulated functions with closures.

### Reusable Functions

#### Add Event
```javascript
function addEvent(eventData) {
    try {
        if (!eventData.name || !eventData.date) {
            throw new Error('Event name and date are required');
        }
        const newEvent = {
            id: events.length + 1,
            ...eventData,  // Spread operator
            isPast: false
        };
        events.push(newEvent);
        console.log(`✅ Event added: ${eventData.name}`);
        return newEvent;
    } catch(error) {
        console.error('❌ Error adding event:', error.message);
    }
}
```

#### Register User
```javascript
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
```

### Closures: Category Tracker
```javascript
const createCategoryTracker = () => {
    const categoryStats = {};  // Private variable (closure)
    
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
categoryTracker.addRegistration('music');  // Returns 1
categoryTracker.getStats();  // { music: 1 }
```

### Higher-Order Functions
```javascript
// Function that accepts another function as parameter
function filterEvents(filterFn) {
    return events.filter(filterFn);
}

// Using higher-order functions
function filterEventsByCategory(category) {
    return filterEvents(event => event.category === category);
}

function filterEventsBySeats(minSeats) {
    return filterEvents(event => event.seats >= minSeats);
}

// Usage:
filterEventsByCategory('music')  // Returns all music events
filterEventsBySeats(100)  // Returns events with 100+ seats
```

**Key Concepts:**
- Functions as first-class objects
- Closures for data encapsulation
- Higher-order functions for reusability
- Callbacks and function parameters

---

## EXERCISE 5: OBJECTS & PROTOTYPES ✅

### Objective
Model real-world entities using objects and prototypes.

### Constructor Function
```javascript
function Event(name, date, location, seats, category) {
    this.name = name;
    this.date = date;
    this.location = location;
    this.seats = seats;
    this.category = category;
    this.registeredUsers = [];
}

// Create instance
const musicFest = new Event('Summer Music Festival', '2026-06-15', 'Central Park', 150, 'music');
```

### Prototype Methods
```javascript
// Add methods to prototype
Event.prototype.checkAvailability = function() {
    return this.seats > 0;
};

Event.prototype.registerAttendee = function(userName) {
    if (this.checkAvailability()) {
        this.registeredUsers.push(userName);
        this.seats--;
        return true;
    }
    return false;
};

// Usage:
musicFest.checkAvailability();  // true
musicFest.registerAttendee('John Doe');  // true
```

### Object Inspection
```javascript
function getEventDetails(event) {
    const details = Object.entries(event).map(([key, value]) => {
        return `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
    });
    return details.join(' | ');
}

// Output: "name: Summer Music Festival | date: 2026-06-15 | seats: 149 | ..."
```

**Key Concepts:**
- Constructor functions for object creation
- `this` keyword for instance properties
- Prototype methods for shared behavior
- `Object.entries()` for iteration
- Data vs. method organization

---

## EXERCISE 6: ARRAYS & ARRAY METHODS ✅

### Objective
Manage events collection with array methods.

### Array Methods

#### Map: Transform Data
```javascript
function formatEventCards(eventArray) {
    return eventArray.map(event => ({
        title: `🎪 ${event.name}`,
        info: `📅 ${event.date} | 💺 ${event.seats} seats`,
        category: `📌 ${event.category}`,
        status: event.seats > 0 ? '✅ Available' : '❌ Full'
    }));
}

// Usage:
const cards = formatEventCards(events);
// Returns array of formatted objects
```

#### Filter: Select Specific Events
```javascript
function getMusicEvents() {
    return events.filter(e => e.category === 'music');
}

function getAvailableEvents() {
    return events.filter(e => e.seats > 0);
}
```

#### Find: Get Single Event
```javascript
function getEventById(id) {
    return events.find(e => e.id === id);
}

// Usage:
const event = getEventById(1);  // Returns the event object or undefined
```

#### Some: Check Condition
```javascript
function hasAvailableEvents() {
    return events.some(e => e.seats > 0);
}
```

#### Every: Verify All Elements
```javascript
function allEventsAvailable() {
    return events.every(e => e.seats > 0);
}
```

#### Push: Add New Event
```javascript
const eventList = [...events];  // Shallow copy with spread operator
eventList.push({ id: 99, name: 'New Event', /* ... */ });
```

**Key Array Methods:**
- `.map()` - Transform elements
- `.filter()` - Select elements
- `.find()` - Find single element
- `.some()` - Check if any match
- `.every()` - Check if all match
- `.push()` - Add element
- `.reduce()` - Aggregate values
- `.sort()` - Order elements
- `.reverse()` - Reverse order

---

## EXERCISE 7: DOM MANIPULATION ✅

### Objective
Display events dynamically on the webpage.

### Access DOM Elements
```javascript
function initializeDOMElements() {
    const eventContainer = document.querySelector('.event-grid');
    const filterButtons = document.querySelectorAll('.event-filter-btn');
    const registrationForm = document.getElementById('registrationForm');
    
    return { eventContainer, filterButtons, registrationForm };
}
```

### Create Event Cards
```javascript
function renderEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.dataset.category = event.category;
    
    card.innerHTML = `
        <div style="position: relative; height: 200px;">
            <img src="https://via.placeholder.com/400x250" alt="${event.name}">
            <div style="position: absolute; top: 10px; right: 10px;">
                📌 ${event.category}
            </div>
        </div>
        <div style="padding: 1.5rem;">
            <h3>${event.name}</h3>
            <p>📅 ${event.date} | 💺 ${event.seats} seats</p>
            <button onclick="quickRegister(${event.id})">
                Register Now →
            </button>
        </div>
    `;
    
    return card;
}
```

### Render Events to Page
```javascript
function updateEventDisplay() {
    const eventContainer = document.querySelector('.event-grid');
    if (!eventContainer) return;
    
    eventContainer.innerHTML = '';  // Clear existing
    
    const validEvents = getValidEvents();
    const cards = validEvents.map(event => renderEventCard(event));
    
    cards.forEach(card => eventContainer.appendChild(card));
    
    console.log(`✅ Rendered ${cards.length} event cards`);
}
```

**Key DOM Methods:**
- `querySelector()` - Select single element
- `querySelectorAll()` - Select multiple elements
- `getElementById()` - Get by ID
- `getElementsByClassName()` - Get by class
- `createElement()` - Create new element
- `appendChild()` - Add child element
- `innerHTML` - Set inner HTML
- `setAttribute()` - Set attributes
- `classList.add/remove()` - Manage classes

---

## EXERCISE 8: EVENT HANDLING ✅

### Objective
Respond to user actions with event listeners.

### Click Event
```javascript
function quickRegister(eventId) {
    const result = registerUser(eventId, 'Anonymous User');
    if (result.success) {
        alert(`✅ Successfully registered for ${result.event.name}!`);
        updateEventDisplay();
    } else {
        alert(`❌ Registration failed: ${result.error}`);
    }
}

// In HTML: <button onclick="quickRegister(${event.id})">Register</button>
```

### Change Event: Category Filter
```javascript
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.event-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category || 'all';
            filterEventsByDisplay(category);
        });
    });
}
```

### Keydown Event: Quick Search
```javascript
document.addEventListener('keydown', function(event) {
    if (event.key === '/' && event.ctrlKey) {
        event.preventDefault();
        console.log('⚡ Quick search activated!');
    }
});
```

### Filter Display
```javascript
function filterEventsByDisplay(category) {
    const cards = document.querySelectorAll('.event-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
```

**Event Types:**
- `click` - Mouse click
- `change` - Select/input change
- `keydown` / `keyup` - Keyboard events
- `submit` - Form submission
- `focus` / `blur` - Element focus
- `mouseover` / `mouseout` - Mouse hover
- `load` / `unload` - Page load/unload

---

## EXERCISE 9: ASYNC JS, PROMISES, ASYNC/AWAIT ✅

### Objective
Handle asynchronous operations for API calls.

### Promises: .then() and .catch()
```javascript
function fetchEventsFromAPI() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                status: 'success',
                data: events,
                message: 'Events fetched successfully'
            });
        }, 1500);
    });
}

function loadEventsWithPromises() {
    console.log('📡 Fetching events from API...');
    
    fetchEventsFromAPI()
        .then(response => {
            console.log(`✅ ${response.message}`);
            console.log(`📊 Loaded ${response.data.length} events`);
            return response.data;
        })
        .catch(error => {
            console.error('❌ Failed to fetch events:', error);
        });
}
```

### Async/Await Pattern
```javascript
async function loadEventsWithAsyncAwait() {
    try {
        console.log('📡 Fetching events (async/await)...');
        
        const response = await fetchEventsFromAPI();
        
        console.log(`✅ ${response.message}`);
        console.log(`📊 Total events: ${response.data.length}`);
        
        return response.data;
    } catch(error) {
        console.error('❌ Error loading events:', error);
    }
}
```

### Registration with Async/Await
```javascript
async function submitRegistrationAsync(eventId, userName, email) {
    try {
        console.log('📤 Submitting registration...');
        
        // Simulate API call delay
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
```

**Key Concepts:**
- `Promise` - Represents async operation
- `.then()` - Handle success
- `.catch()` - Handle error
- `.finally()` - Always execute
- `async/await` - Cleaner async syntax
- `await` - Wait for promise
- Error handling in async code

---

## EXERCISE 10: MODERN JAVASCRIPT (ES6+) ✅

### Objective
Write concise, modern JavaScript code.

### Let, Const, Default Parameters
```javascript
const createEventSummary = (event, includeDetails = true) => {
    let summary = `${event.name} (${event.category})`;
    
    if (includeDetails) {
        summary += ` - ${event.date} - ${event.seats} seats`;
    }
    
    return summary;
};

// Usage:
createEventSummary(event1);  // With details
createEventSummary(event1, false);  // Without details
```

### Destructuring
```javascript
function displayEventInfo({ name, date, seats, category }) {
    return `
        Event: ${name}
        Category: ${category}
        Date: ${date}
        Available Seats: ${seats}
    `;
}

// Usage:
displayEventInfo({ name: 'Concert', date: '2026-06-15', seats: 100, category: 'music' });
```

### Spread Operator
```javascript
function cloneAndModifyEvents(eventArray, category) {
    return [...eventArray].filter(e => e.category === category);
}

// Create shallow copy
const eventsCopy = [...events];

// Merge objects
const newEvent = { ...baseEvent, name: 'Special Concert' };
```

### Arrow Functions
```javascript
const getEventStats = (eventArray) => ({
    total: eventArray.length,
    available: eventArray.filter(e => e.seats > 0).length,
    categories: [...new Set(eventArray.map(e => e.category))]
});
```

### Template Literals
```javascript
const eventInfo = `
    Event: ${event.name}
    Date: ${event.date}
    Seats: ${event.seats}
`;
```

**ES6+ Features:**
- `const` / `let` - Block scope
- Arrow functions - Shorter syntax
- Template literals - String interpolation
- Destructuring - Extract properties
- Spread operator - Expand arrays/objects
- Default parameters - Function defaults
- Classes - Object-oriented syntax
- Promises - Async handling

---

## EXERCISE 11: FORM HANDLING ✅

### Objective
Capture, validate, and process form data.

### Setup Form Handler
```javascript
function setupFormHandling() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}
```

### Handle Form Submission
```javascript
function handleFormSubmit(event) {
    event.preventDefault();  // Prevent page reload
    
    try {
        // Capture form data
        const formData = new FormData(this);
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const eventType = formData.get('eventType');
        
        // Validate inputs
        if (!fullName || !email || !eventType) {
            throw new Error('Please fill all required fields');
        }
        
        if (!validateEmail(email)) {
            throw new Error('Please enter a valid email');
        }
        
        // Process valid data
        console.log(`✅ Form submitted by ${fullName}`);
        alert('✅ Registration successful!');
        this.reset();  // Clear form
        
    } catch(error) {
        console.error('❌ Form error:', error.message);
        alert(`❌ Error: ${error.message}`);
    }
}
```

### Email Validation
```javascript
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Test:
validateEmail('user@example.com');  // true
validateEmail('invalid-email');  // false
```

### Show Field Errors
```javascript
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '#e74c3c';
        field.title = message;
    }
}
```

**Form Methods:**
- `FormData` - Capture form inputs
- `event.preventDefault()` - Stop default behavior
- `form.elements` - Access form fields
- `input.value` - Get input value
- `.reset()` - Clear form

---

## EXERCISE 12: FETCH API & AJAX ✅

### Objective
Send and receive data from server.

### Mock Server Submission
```javascript
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
```

### Real Fetch Example (Production)
```javascript
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
```

**Fetch API:**
- `fetch(url)` - Make request
- `.then(response => response.json())` - Parse JSON
- `.catch(error)` - Handle errors
- `POST` / `GET` / `PUT` / `DELETE` - HTTP methods
- `Headers` - Request headers
- `Status codes` - Response status

---

## EXERCISE 13: DEBUGGING & TESTING ✅

### Objective
Debug issues and test functionality.

### Debug Helper
```javascript
function debugEventState() {
    console.group('🔍 Event Portal Debug Info');
    
    console.log('📊 Total Events:', events.length);
    console.log('📝 Available Events:', getValidEvents().length);
    console.log('👥 Total Registrations:', totalRegistrations);
    console.log('📈 Category Stats:', categoryTracker.getStats());
    console.log('🎪 All Events:', events);
    
    console.groupEnd();
}

// Call in console: portal.debugEventState()
```

### Automated Tests
```javascript
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
    
    // Test 4: Email validation
    const validEmail = validateEmail('test@example.com');
    console.log('✅ Test 4 - Email Validation:', validEmail ? 'PASSED' : 'FAILED');
    
    console.groupEnd();
}

// Run tests: portal.runTests()
```

### DevTools Usage
1. **Console Tab** - View logs and errors
   ```
   portal.debugEventState()  // Run debug function
   portal.events  // View events array
   portal.categoryTracker.getStats()  // View stats
   ```

2. **Network Tab** - Monitor API calls
   - Check request/response headers
   - Verify payload data
   - Monitor loading times

3. **Elements Tab** - Inspect HTML
   - Check classes and IDs
   - Verify data attributes
   - Test CSS changes live

4. **Sources Tab** - Set breakpoints
   - Step through code
   - Inspect variables
   - Pause execution

---

## EXERCISE 14: JQUERY & FRAMEWORKS ✅

### Objective
Understand jQuery and modern frameworks.

### jQuery-style Selectors
```javascript
const $ = {
    id: (id) => document.getElementById(id),
    class: (className) => document.querySelectorAll(`.${className}`),
    query: (selector) => document.querySelector(selector),
    queryAll: (selector) => document.querySelectorAll(selector),
    
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

// Usage:
const btn = $.id('registerBtn');
$.fadeIn(btn);  // Fade in
$.fadeOut(btn);  // Fade out
```

### Modern Event Handling (Reactive)
```javascript
function setupReactiveEventHandlers() {
    const filterButtons = document.querySelectorAll('.event-filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
            
            // Update display
            filterEventsByDisplay(e.target.dataset.category || 'all');
        });
    });
}
```

### Why Modern Frameworks?

**jQuery Advantages:**
- Simplified DOM selection
- Cross-browser compatibility
- Fluent API

**Modern Framework Advantages (React, Vue, Angular):**
- **Reactive data binding** - Auto UI updates
- **Component reusability** - Modular code
- **State management** - Centralized state
- **Performance** - Virtual DOM, efficient rendering
- **Scalability** - Large applications
- **Developer experience** - Better tooling

**Example: React Component**
```javascript
// Fictional React component
function EventList() {
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        loadEvents();
    }, []);
    
    return (
        <div className="event-grid">
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}
```

---

## INITIALIZATION & MAIN LOGIC ✅

### Page Load Initialization
```javascript
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
        
        // Load events asynchronously
        loadEventsWithAsyncAwait();
        
        // Run tests
        runTests();
        
        console.log('✅ Portal initialized successfully!');
        
    } catch(error) {
        console.error('❌ Initialization error:', error);
    }
});
```

---

## GLOBAL API REFERENCE ✅

### Access Functions in Console
```javascript
// All functions exported to window.portal
window.portal = {
    events,                      // All events array
    registerUser,               // Register user
    getEventById,              // Get event by ID
    filterEventsByCategory,    // Filter by category
    debugEventState,           // Show debug info
    getMusicEvents,            // Get music events
    formatEventCards,          // Format cards
    createEventSummary,        // Create summary
    displayEventInfo,          // Display info
    getEventStats,            // Get statistics
    quickRegister,            // Quick register
    updateEventDisplay,       // Update UI
    submitRegistrationAsync,  // Submit async
    submitRegistrationToServer, // Submit to server
    categoryTracker           // Category stats
};
```

### Console Commands
```
// View all events
portal.events

// Debug state
portal.debugEventState()

// Get music events
portal.getMusicEvents()

// Register user
portal.registerUser(1, 'John Doe')

// Get event stats
portal.getEventStats(portal.events)

// Run tests
portal.runTests()
```

---

## FILE ORGANIZATION

```
Local-Community-Event-Portal/
├── index.html              (HTML structure)
├── styles.css             (CSS3 styling)
├── main.js                ✅ JAVASCRIPT EXERCISES (This file)
├── help.html              (Documentation)
├── CSS3-Exercises.md      (CSS guide)
├── JavaScript-Exercises.md (This document)
└── README.md              (Project overview)
```

---

## SUMMARY OF FEATURES

✅ **Exercise 1:** Script setup and console logging
✅ **Exercise 2:** Data types, template literals, operators
✅ **Exercise 3:** Conditionals, loops, error handling
✅ **Exercise 4:** Functions, closures, higher-order functions
✅ **Exercise 5:** Objects, prototypes, constructors
✅ **Exercise 6:** Arrays, map, filter, find methods
✅ **Exercise 7:** DOM manipulation, createElement, appendChild
✅ **Exercise 8:** Event listeners, click, change, keydown
✅ **Exercise 9:** Promises, async/await, async operations
✅ **Exercise 10:** ES6+ (destructuring, spread, arrow functions)
✅ **Exercise 11:** Form handling, validation, submission
✅ **Exercise 12:** Fetch API, AJAX, server communication
✅ **Exercise 13:** Debugging, testing, DevTools
✅ **Exercise 14:** jQuery patterns, framework advantages

---

## TESTING THE CODE

### In Browser Console (F12)
```javascript
// Test Exercise 2
portal.events  // View all events

// Test Exercise 4
portal.registerUser(1, 'Alice')  // Register user
portal.categoryTracker.getStats()  // View stats

// Test Exercise 6
portal.getMusicEvents()  // Get music events
portal.formatEventCards(portal.events)  // Format cards

// Test Exercise 13
portal.debugEventState()  // Debug info
portal.runTests()  // Run all tests

// Test Exercise 9
portal.loadEventsWithAsyncAwait()  // Load async
```

---

**Last Updated:** May 28, 2026  
**JavaScript Version:** ES6+ (Modern)  
**Browser Support:** Chrome, Firefox, Safari, Edge