/*
   LOCAL COMMUNITY EVENT PORTAL
   BOOTSTRAP 5 EXERCISES - JAVASCRIPT
   All 19 Bootstrap Exercises Implementation
*/

// ============================================
// EXERCISE 1: Bootstrap 5 Setup & Configuration
// ============================================
console.log('🎉 Bootstrap 5 Module Loaded Successfully!');
console.log('📚 All 19 Bootstrap exercises implemented');

// ============================================
// EXERCISE 18: Bootstrap JavaScript Plugins
// ============================================

// Function to show Bootstrap Toast
function showToast() {
    const toastElement = document.getElementById('bootstrapToast');
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
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

// ============================================
// EXERCISE 2.2: Bootstrap JavaScript Plugins Setup
// ============================================

// Function to handle Bootstrap collapse events
document.addEventListener('show.bs.collapse', function(e) {
    console.log('📂 Collapse opened:', e.target.id);
});

document.addEventListener('hide.bs.collapse', function(e) {
    console.log('📁 Collapse closed:', e.target.id);
});

// ============================================
// EXERCISE 7: Form Validation with Bootstrap
// ============================================

// Bootstrap form validation example
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

// ============================================
// EXERCISE 17: Bootstrap Icons Integration
// ============================================

// Icons are automatically loaded via CDN in HTML
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

console.log('🎨 Bootstrap Icons loaded from CDN');

// ============================================
// EXERCISE 9: Button Interactions
// ============================================

// Handle button groups
document.querySelectorAll('.btn-group .btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from siblings
        this.parentElement.querySelectorAll('.btn').forEach(b => {
            b.classList.remove('active');
        });
        // Add active class to clicked button
        this.classList.add('active');
    });
});

// ============================================
// EXERCISE 8: Form Handling with Bootstrap
// ============================================

function bootstrapFormHandler() {
    const form = document.querySelector('form');
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('✅ Form submitted:', data);
        
        // Show success toast
        showToast();
    }
}

// ============================================
// EXERCISE 13: Dynamic Color Scheme
// ============================================

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

// ============================================
// EXERCISE 14: Responsive Display Utilities
// ============================================

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

// Check on load and on resize
window.addEventListener('load', checkResponsiveBreakpoint);
window.addEventListener('resize', checkResponsiveBreakpoint);

// ============================================
// EXERCISE 16: Positioning Utilities
// ============================================

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

// ============================================
// EXERCISE 12: Spacing Utilities Helper
// ============================================

function applyBootstrapSpacing(element, margin, padding) {
    if (margin) element.classList.add(...margin.split(' '));
    if (padding) element.classList.add(...padding.split(' '));
}

// ============================================
// EXERCISE 11: Card Component Utilities
// ============================================

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

// ============================================
// EXERCISE 10: Navigation Utilities
// ============================================

function setActiveNavLink(linkSelector) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(linkSelector);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ============================================
// EXERCISE 6: Flexbox Utilities
// ============================================

function centerElement(element) {
    element.classList.add('d-flex', 'justify-content-center', 'align-items-center');
}

function flexBetween(element) {
    element.classList.add('d-flex', 'justify-content-between', 'align-items-center');
}

// ============================================
// EXERCISE 5: Grid Reordering
// ============================================

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

// ============================================
// EXERCISE 3: Responsive Testing
// ============================================

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

// Run on load
testResponsiveLayout();

// ============================================
// EXPORT FUNCTIONS & UTILITIES
// ============================================

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

console.log('✅ Bootstrap Exercises module ready!');
console.log('📚 Access functions via: bootstrapExercises.functionName()');
