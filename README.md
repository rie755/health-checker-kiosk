# Health Self-Check Kiosk

A responsive web application that allows students and employees to check
their Body Mass Index (BMI) and receive a personalized wellness
recommendation, without needing to visit the school clinic.

## The Problem

Many students and employees on campus have no quick, private way to check
their BMI and get a basic wellness recommendation. This app solves that by
acting as a self-service kiosk: a user enters their basic information, the
system instantly computes their BMI, classifies it into a health category,
and displays a tailored recommendation — while also recording every
submission so the school nurse or HR office can monitor usage and follow
up with at-risk individuals.

## Features

- Responsive, mobile-friendly interface built with semantic HTML and CSS
  (Flexbox + media queries)
- Real-time BMI calculation and classification (Underweight, Normal,
  Overweight, Obese)
- Client-side form validation using `if-else` logic
- BMI category mapping using a `switch-case` structure
- Field validation and submission history rendering using loops
- Submission data automatically recorded to a Google Sheet via a Google
  Apps Script Web App

## Tech Stack

- HTML5
- CSS3 (Flexbox, media queries)
- Vanilla JavaScript
- Google Apps Script (backend / data recording)
- Google Sheets (data store)

## How to Run

1. Clone or download this repository.
2. Open `index.html` in any web browser.
3. Fill out the form and click **Check My BMI** to see your result.
4. Submissions are automatically sent to a connected Google Sheet.

## Live Demo

https://rie755.github.io/health-checker-kiosk/

## Author

Made for Laboratory 5: Building a Responsive Health Self-Check Web
Application — De La Salle University - Dasmariñas, College of Information
and Computer Studies, Information Technology Department.
