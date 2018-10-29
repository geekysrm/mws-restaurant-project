# Mobile Web Specialist Certification Course

---

Current Stage: Completed Stage 2 and working on Stage 3

#### _Three Stage Course Material Project - Restaurant Reviews_

## Project Overview: Stage 1

For the **Restaurant Reviews** projects, you will incrementally convert a static webpage to a mobile-ready web application. In **Stage One**, you will take a static design that lacks accessibility and convert the design to be responsive on different sized displays and accessible for screen reader use. You will also add a service worker to begin the process of creating a seamless offline experience for your users.

### Specification

You have been provided the code for a restaurant reviews website. The code has a lot of issues. It’s barely usable on a desktop browser, much less a mobile device. It also doesn’t include any standard accessibility features, and it doesn’t work offline at all. Your job is to update the code to resolve these issues while still maintaining the included functionality.

### What do I do from here?

1. In this folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer.

In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

2. With your server running, visit the site: `http://localhost:8000`, and look around for a bit to see what the current experience looks like.
3. Explore the provided code, and start making a plan to implement the required features in three areas: responsive design, accessibility and offline use.
4. Write code to implement the updates to get this site on its way to being a mobile-ready website.

## Leaflet.js and Mapbox:

This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/). You need to replace `<your MAPBOX API KEY HERE>` with a token from [Mapbox](https://www.mapbox.com/). Mapbox is free to use, and does not require any payment information.

### Note about ES6

Most of the code in this project has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future proofing JavaScript code. As much as possible, try to maintain use of ES6 in any additional JavaScript you write.

## Project Overview: Stage 2

### Specification

According to the stage 2 rubric,

- The client application should pull restaurant data from the development server, parse the JSON response, and use the information to render the appropriate sections of the application UI.
- The client application works offline. JSON responses are cached using the IndexedDB API. Any data previously accessed while connected is reachable while offline.
- The application maintains a responsive design on mobile, tablet and desktop viewports.
- The application retains accessibility features from the Stage 1 project. Images have alternate text, the application uses appropriate focus management for navigation, and semantic elements and ARIA attributes are used correctly.
- Lighthouse targets for each category exceed:

```
Progressive Web App: >90
Performance: >70
Accessibility: >90
```

### How to Run (for stage 2)

1. First, clone the [server repo](https://github.com/geekysrm/mws-restaurant-stage-2-server) and `cd` into the folder
2. In your terminal, run the follwing commands:

   - `npm i sails -g`
   - `npm i`
   - `node server`

3. Now, clone [this](https://github.com/geekysrm/mws-restaurant-project) repo.
4. Open another terminal window, `cd` into the folder and run the follwing commands:
   - `npm i`
   - `gulp`
5. Go to http://localhost:8081 to view the site.

### My Lighthouse scores

These scores are taken in Chrome Browser in Incognito Mode:

```
Progressive Web App: 92
Performance: 99
Accessibility: 94
```
