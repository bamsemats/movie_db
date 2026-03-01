# 🎬 Movie Library

A modern, responsive movie discovery application built with React and the TMDB API. Explore popular titles, search for favorites, and find where to stream your next movie.

![Movie Library Header](https://via.placeholder.com/1200x400/0f172a/38bdf8?text=Movie+Library+v2.0)

## 🚀 Features

### **Discovery & Browsing**
- **Infinite Scroll:** Seamlessly browse thousands of movies without pagination clicks.
- **Server-Side Filtering:** Filter by genre directly via the TMDB API for accurate results.
- **Advanced Sorting:** Sort by popularity, top ratings, release date, or title.
- **Modern Dark UI:** A sleek, "Netflix-style" interface using CSS glassmorphism and modern gradients.

### **Deep Movie Insights**
- **Rich Modals:** Refined detail views using React Portals for perfect positioning.
- **Trailers:** Watch official trailers and teasers directly in the app.
- **Cast & Crew:** View top actors with profile photos and director information.
- **Watch Providers:** See exactly where a movie is available to stream (Netflix, Disney+, etc.) with direct landing page links.
- **Recommendations:** Explore related titles with clickable navigation history and "Back" support.

### **User Experience**
- **Skeletons:** Animated loading states for a smooth perceived performance.
- **Responsive Design:** Optimized for everything from mobile phones to ultra-wide monitors.
- **Favorites:** Manage a personal library saved locally to your browser.

## 🛠️ Tech Stack

- **Framework:** React 19
- **State Management:** React Hooks (useState, useEffect, useCallback, useRef)
- **Styling:** Pure CSS (Custom Variables, Flexbox/Grid, Animations)
- **Icons:** `react-icons`
- **Data Source:** [The Movie Database (TMDB) API](https://developer.themoviedb.org/)
- **Deployment:** GitHub Pages

## 🚦 Getting Started

### **1. Prerequisites**
- Node.js installed on your machine.
- A TMDB API Read Access Token (Get one at [themoviedb.org](https://www.themoviedb.org/settings/api)).

### **2. Installation**
```bash
# Clone the repository
git clone https://github.com/bamsemats/movie_db.git

# Navigate to project folder
cd movie-library

# Install dependencies
npm install
```

### **3. Environment Setup**
Create a `.env` file in the root directory and add your TMDB token:
```env
REACT_APP_TMDB_TOKEN=your_tmdb_read_access_token_here
```

### **4. Run the App**
```bash
npm start
```

## 📜 Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB. 
Streaming availability data is provided by [JustWatch](https://www.justwatch.com/).

---
Developed with ❤️ as a learning project.
