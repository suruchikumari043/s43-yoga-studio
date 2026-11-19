# S43 Yoga Studio — Updated Project Guide

## Pages
- `index.html`: homepage
- `poses.html`: yoga styles, searchable pose library and comparison table
- `videos.html`: YouTube embedded video library
- `booking.html`: demo class request form and saved request list

## Files
Keep all four HTML files, `style.css`, and `script.js` together in the same folder.

## Run
Open `index.html` in a browser, or run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Important limitations
The booking feature is a front-end demonstration. It saves requests in the current browser using Local Storage; it does not contact a studio, reserve actual capacity, or send email. Real bookings require a backend and database. YouTube embeds are third-party videos and may become unavailable or disallow embedding. The yoga information is educational, not medical advice.
