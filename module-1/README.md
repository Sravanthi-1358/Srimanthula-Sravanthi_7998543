# Local Community Event Portal - HTML5 Project

## Project Overview

This is a complete **HTML5 learning project** that demonstrates all 10 HTML5 exercises in a single, functional portal application. The project showcases modern web development practices using semantic HTML5, CSS3 styling, and vanilla JavaScript.

## 📁 Project Files

- **index.html** - Main portal page (contains all 10 exercises)
- **help.html** - External help documentation page
- **README.md** - This file

## 🎯 Exercises Included

### Exercise 1: HTML5 Base Template
- ✅ Uses `<!DOCTYPE html>` for HTML5
- ✅ Includes `<html lang="en">` for language specification
- ✅ Sets `<meta charset="UTF-8">` for character encoding
- ✅ Includes semantic section comments (Navigation, Main, Footer)
- ✅ Compatible across all modern browsers

**Location in code:** Lines 1-20 of index.html

---

### Exercise 2: Navigation and Linking
- ✅ `<nav>` element with semantic navigation structure
- ✅ Section-based anchor navigation: `<a href="#events">Events</a>`
- ✅ Matching section IDs: `<section id="events">`
- ✅ External link to help.html: `<a href="help.html" target="_blank">`
- ✅ Sticky navigation bar that stays at the top while scrolling

**Navigation links:**
- Home → #home
- Events → #events
- Register → #registration
- Feedback → #feedback
- Preferences → #preferences
- Help → help.html (opens in new tab)

---

### Exercise 3: Welcome Message with Styling and ID/Class
- ✅ `<div id="welcomeBanner">` with unique ID styling
- ✅ Blue background applied via internal CSS
- ✅ `<span class="special-offer">` with inline red bold text
- ✅ `.highlight` class applied to special offers
- ✅ Demonstrates difference between ID (unique) and class (reusable)

**Styling applied:**
- ID: #welcomeBanner → Blue background (#3498db)
- Class: .highlight → Orange background (#f39c12)
- Class: .special-offer → Red text with bold font

---

### Exercise 4: Image Gallery for Community Events
- ✅ `<table>` with 2 rows and 3 columns
- ✅ 6 `<img>` tags from Unsplash API (community events)
- ✅ Each image includes `alt`, `title`, and `class` attributes
- ✅ `.gallery-image` class with border styling
- ✅ Hover effects and smooth transitions
- ✅ Image captions describing each event

**Gallery Features:**
- Responsive image sizing
- Border styling with hover effects
- Alt text for accessibility
- Double-click to enlarge (Exercise 6 integration)

---

### Exercise 5: Event Registration Form
- ✅ Form with multiple input types:
  - `type="text"` for Full Name
  - `type="email"` for Email
  - `type="date"` for Event Date
  - `<select>` dropdown for Event Type
  - `<textarea>` for Additional Comments
- ✅ `placeholder` attributes on all inputs
- ✅ `required` attribute for validation
- ✅ `autofocus` on name field
- ✅ `<output>` element displays confirmation message
- ✅ CSS styling for form elements

**Form Fields:**
- Full Name (text, required, autofocus)
- Email (email type, required)
- Event Date (date picker, required)
- Event Type (select dropdown, required)
- Phone Number (tel type, for validation)
- Additional Comments (textarea, required)

---

### Exercise 6: Event Feedback with Events Handling
Demonstrates multiple event types:

#### 1. **onblur Event** - Phone Validation
```javascript
phone.addEventListener('blur', function() {
    // Validates format: 123-456-7890
});
```

#### 2. **onchange Event** - Event Fee Display
```javascript
eventType.addEventListener('change', function() {
    // Displays fee based on selected event
});
```

#### 3. **onclick Event** - Form Submission
```javascript
submitButton.addEventListener('click', function() {
    // Shows confirmation message
});
```

#### 4. **ondblclick Event** - Image Enlargement
```javascript
galleryImages.forEach(img => {
    img.addEventListener('dblclick', function() {
        // Enlarges image in modal overlay
    });
});
```

#### 5. **Keyboard Events** - Character Counter
```javascript
textarea.addEventListener('keyup', function() {
    // Updates character count in real-time
});
```

**Feedback Section Features:**
- Rating dropdown (1-5 stars with messages)
- Textarea with character limit (300 chars)
- Real-time key event logging
- Submit confirmation

---

### Exercise 7: Video Invite with Media Events
- ✅ `<video>` element with controls attribute
- ✅ Source tag: `<source src="video.mp4" type="video/mp4">`
- ✅ Responsive sizing (max-width: 100%)
- ✅ `oncanplay` event displays "Video ready to play" message
- ✅ `playing` event shows "Now playing..."
- ✅ `pause` event shows "Video paused"

**Video Features:**
- Big Buck Bunny sample video from Google
- Responsive video player
- Status messages on play/pause/ready
- Console logging for debugging

---

### Exercise 8: Saving User Preferences
Demonstrates localStorage and sessionStorage:

#### **localStorage** (Persistent across sessions)
```javascript
// Save
localStorage.setItem('preferredEventType', value);

// Retrieve
const saved = localStorage.getItem('preferredEventType');

// Load on page load
window.addEventListener('load', function() {
    // Pre-select saved preference
});
```

#### **sessionStorage** (Session only)
```javascript
sessionStorage.setItem('lastPreference', value);
```

#### **Clear All Data**
```javascript
// Clear all saved data
localStorage.clear();
sessionStorage.clear();
```

**Features:**
- Save preferred event type
- Auto-load preference on reload
- Clear all preferences button
- Visual confirmation messages

---

### Exercise 9: Geolocation for Event Mapping
- ✅ Button "Find Nearby Events"
- ✅ `navigator.geolocation.getCurrentPosition()` with options
- ✅ High accuracy option enabled
- ✅ Timeout handling (10 seconds)
- ✅ Error handling for:
  - PERMISSION_DENIED
  - POSITION_UNAVAILABLE
  - TIMEOUT
- ✅ Displays latitude, longitude, and accuracy

**Geolocation Features:**
- Requests user permission
- Shows coordinates with 6 decimal places
- Displays accuracy radius in meters
- Handles all error cases gracefully
- Console logging for debugging

---

### Exercise 10: Debugging with Chrome DevTools
Comprehensive debugging support:

#### **Chrome DevTools Features:**
1. **Inspect Element** - Live style editing
   - Right-click on any element → Inspect
   - Modify CSS in real-time
   - See layout changes instantly

2. **Console Tab**
   - View all `console.log()` statements
   - Test code in console
   - Check for errors and warnings

3. **Breakpoints**
   - Sources tab → Set breakpoints
   - Step through code execution
   - Watch variable values
   - Suggested breakpoint locations in code

4. **beforeunload Event**
   - Warns users if they try to leave with unsaved form data
   - Prevents accidental data loss

**Breakpoint Suggestions:**
- Line: Geolocation success handler
- Line: Form submission handler
- Line: localStorage operations

## 🚀 How to Use

### 1. **Open in Browser**
```bash
1. Navigate to the project folder
2. Right-click on index.html
3. Select "Open with Chrome" (or your preferred browser)
```

### 2. **View in VS Code**
```bash
1. Open the workspace in VS Code
2. Use Live Server extension to open in browser
3. Or: Right-click index.html → Open with Live Server
```

### 3. **Access Features**

#### Navigation
- Click navigation links to jump to sections
- Click "Help" to open external help.html in new tab

#### Gallery
- View community event photos
- **Double-click any image to enlarge**
- Single-click for normal view

#### Registration
- Fill out event registration form
- Phone format: 123-456-7890
- Submit to see confirmation

#### Feedback
- Rate events from 1-5 stars
- See dynamic feedback messages
- Type comments and watch character counter

#### Video
- Play promo video with controls
- Watch status messages appear
- Test play/pause functionality

#### Preferences
- Select preferred event type
- Click "Save Preferences"
- Reload page - preference persists!
- Click "Clear All Data" to reset

#### Location
- Click "Find Nearby Events"
- Grant location permission
- View your coordinates and accuracy

---

## 🔧 Chrome DevTools Debugging

### Opening DevTools
- **Windows/Linux:** Press `F12` or `Ctrl+Shift+I`
- **Mac:** Press `Cmd+Option+I`
- **Or:** Right-click → Inspect

### Debugging Steps

1. **Console Tab**
   - Open DevTools → Console
   - See startup messages
   - Test commands like:
     ```javascript
     localStorage.getItem('preferredEventType')
     navigator.geolocation
     document.getElementById('welcomeBanner')
     ```

2. **Inspect Elements**
   - Right-click any element → Inspect
   - Live-edit CSS in Styles tab
   - Try changing colors, sizes, etc.

3. **Sources Tab - Set Breakpoints**
   - Open DevTools → Sources
   - Go to index.html
   - Click line numbers to set breakpoints
   - Try clicking "Find Nearby Events"
   - Debugger will pause at breakpoint

4. **Network Tab**
   - Watch image requests
   - Check video streaming
   - Monitor geolocation requests

---

## 📋 Exercise Checklist

- [x] Exercise 1: HTML5 Base Template
- [x] Exercise 2: Navigation and Linking
- [x] Exercise 3: Welcome Message with Styling
- [x] Exercise 4: Image Gallery
- [x] Exercise 5: Event Registration Form
- [x] Exercise 6: Event Feedback & Events Handling
- [x] Exercise 7: Video with Media Events
- [x] Exercise 8: Saving Preferences
- [x] Exercise 9: Geolocation
- [x] Exercise 10: Chrome DevTools Debugging

---

## 💡 Key Concepts Demonstrated

### HTML5 Semantic Elements
- `<!DOCTYPE html>` - HTML5 declaration
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` - Semantic structure
- `<article>`, `<aside>` - Content sections
- `<figure>`, `<figcaption>` - Media with captions
- `<video>`, `<audio>` - Media elements

### HTML5 Features
- Form validation (required, email, date)
- Input types (text, email, date, tel, number)
- Placeholder and autofocus attributes
- Data attributes
- Canvas and SVG support

### CSS3 Features
- Flexbox layout
- CSS Grid (responsive tables)
- Transitions and animations
- Media queries
- CSS Grid and positioning

### JavaScript APIs
- **DOM Manipulation**: querySelector, getElementById, classList
- **Event Handling**: addEventListener, event types
- **Storage API**: localStorage, sessionStorage
- **Geolocation API**: getCurrentPosition
- **HTML5 Media Events**: canplay, playing, pause
- **Form Events**: submit, change, blur, keyup
- **Window Events**: load, beforeunload

---

## 🌐 Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| HTML5 Semantic | ✓ | ✓ | ✓ | ✓ |
| Form Validation | ✓ | ✓ | ✓ | ✓ |
| localStorage | ✓ | ✓ | ✓ | ✓ |
| Geolocation | ✓ | ✓ | ✓ | ✓ |
| Video HTML5 | ✓ | ✓ | ✓ | ✓ |
| All Features | ✓ | ✓ | ✓ | ✓ |

---

## 📱 Responsive Design

The portal is fully responsive with breakpoints for:
- **Desktop** (1200px+): Full layout
- **Tablet** (768px - 1199px): Adjusted spacing
- **Mobile** (<768px): Stacked layout, full-width buttons

---

## 🎓 Learning Outcomes

After completing this project, you will understand:

1. ✅ HTML5 semantic structure and best practices
2. ✅ Navigation and linking patterns
3. ✅ CSS styling and layouts (Flexbox, Grid)
4. ✅ Form handling and validation
5. ✅ Event handling (click, blur, change, keyboard events)
6. ✅ Media elements (images, video)
7. ✅ Browser storage APIs
8. ✅ Geolocation API
9. ✅ Chrome DevTools debugging
10. ✅ Responsive web design

---

## 🔍 Files Reference

### index.html Structure
```
1. DOCTYPE & Meta Tags (1-20)
2. CSS Styles (21-300)
3. Navigation (HTML lines ~400)
4. Welcome Banner (HTML lines ~420)
5. Main Sections
   - Home (lines ~450)
   - Events Gallery (lines ~470)
   - Registration Form (lines ~550)
   - Feedback (lines ~650)
   - Video (lines ~730)
   - Preferences (lines ~760)
   - Geolocation (lines ~800)
6. Footer (lines ~830)
7. JavaScript (lines ~850-1400)
```

---

## 📝 Notes for Students

- **All code is commented** for easy understanding
- **No external libraries** - pure HTML, CSS, and JavaScript
- **Real images** from Unsplash for gallery
- **Sample video** from Google Commons
- **Console logging** at key points for debugging
- **Error handling** for all async operations

---

## 🎯 Next Steps

1. **Run the project** in Chrome
2. **Test each exercise** by interacting with features
3. **Open Chrome DevTools** (F12) and explore
4. **Modify CSS** in DevTools Styles tab
5. **Set breakpoints** in Sources tab
6. **Experiment** with localStorage values
7. **Test geolocation** with different browsers
8. **Read console messages** for debugging tips

---

## ✨ Features Summary

| Feature | Location | Type |
|---------|----------|------|
| Navigation | Top sticky navbar | HTML/CSS |
| Welcome Banner | Below nav | HTML/CSS |
| Gallery | Events section | HTML/CSS |
| Registration Form | Register section | HTML/CSS/JS |
| Feedback | Feedback section | HTML/CSS/JS |
| Video Player | Video section | HTML/CSS/JS |
| Preferences | Preferences section | HTML/CSS/JS |
| Geolocation | Geolocation section | HTML/CSS/JS |
| Help Page | help.html | HTML/CSS |
| Debugging | F12 in Browser | Chrome DevTools |

---

## 📞 Support

- Open Chrome DevTools for detailed error messages
- Check browser console for helpful hints
- Review comments in code for explanations
- Visit help.html for feature documentation

---

## 🏆 Project Complete!

You now have a fully functional HTML5 project that covers all 10 exercises with real-world applicability. This portal demonstrates modern web development practices and is an excellent portfolio piece!

**Happy Coding! 🚀**

---

*Last Updated: January 2026*  
*Project: Local Community Event Portal*  
*HTML5 Learning Exercises*
