# Spacetagram

[Visit Site](https://nasa-spacestagram.herokuapp.com/ "Spacestagram")

A web application built using React and deployed with Heroku that allows users to view NASA's Astronomy Picture of the Day and photos from NASA's Image and Video Library. Users can search for photos and query them by a range of dates, as well as like and unlike photos (likes persist in localStorage).

[NASA APIs](https://api.nasa.gov/ "https://api.nasa.gov/") used:

- APOD API
- NASA Image and Video Library API

## Development Log

**1/9/22:**

- Created React app
- Experimented by connecting to NASA APOD API and displaying the picture and data
- Connected to NASA Image and Video Library API to pull more images and info

**1/10/22:**

- Added styling to header, APOC section, and image roll
- Implemented hover effect for images in image roll
- Started work on pop-up description for images when clicked

**1/11/22:**

- Reordered file structure and components
- Finished functionality of pop-up description for images
- Added search functionality
- Revamped CSS styling and changed background styling

**1/12/22:**

- Applied pop-up functionality to APOD
- Added loading states
- Added try catch to api calls
- Displayed number of search hits
- Added a "Scroll to Top" button

**1/13/22:**

- Added a simple like feature
- Added media query
- Implemented a date picker for search
- Favicon and title changes
- Deployed app

**1/14/22:**

- Changed like feature to save like on leaving / reload (saved in local storage)
