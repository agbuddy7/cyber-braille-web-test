# Cyber Braille 

A **web-based testing prototype** for the upcoming **Cyber Braille Android Application**.  
This web version uses **audio feedback** on braille dots for demonstration and concept testing. The main Android app will feature **haptic vibration feedback** for braille learning.

---
## Note

⚠️ **This web version is for testing and demonstration only.**  
The main product will be an Android app with haptic feedback .

---
## Purpose

This project is for **testing and validating** the braille learning concept before developing the full Android application.

---

## Main Project Vision

The future Android app will include:
- Haptic vibration feedback (instead of audio)
- Touch-based interaction
- Accessibility features for visually impaired users
- Offline learning modules

---

## About This Web Version

**Features:**
- Interactive braille dots with hover detection
- Audio feedback when hovering over dots (`hover.mp3` or synthetic beep)
- Visual representation of braille patterns (numbers 1-9 and Capital letter A-Z)
- Responsive design

**Tech stack:** HTML5, JavaScript, Canvas, Web Audio API, CSS

---

## Quick Start

### Online Demo

[Live Demo](https://cyber-braille-web-test.vercel.app)

### Local Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/agbuddy7/cyber-braille-web-test.git
    cd cyber-braille-web-test
    ```

2. **Add audio file:**
   - Place your `hover.mp3` file in the root directory (optional)

3. **Run locally:**
    Directly run the html file

4. **Open in browser:**  

---

## Deployment

For now im deploying it on vercel **Vercel** 



## Project Structure

```
cyber-braille-web-test/
├── index.html
├── script.js
├── hover.mp3              # Optional audio file
├── README.md
└── styles.css             # Optional
```

---

## How to Use

1. Open the application in your browser.
2. Hover your mouse over the black braille dots.
3. Listen for audio feedback.
4. Observe and learn the braille patterns for numbers and alphabets.

---



## License

MIT License

---

**Developer:** [@agbuddy7](https://github.com/agbuddy7)  
**Repository:** https://github.com/agbuddy7/cyber-braille-web-test  
**Live Demo:** https://cyber-braille-web-test.vercel.app  
