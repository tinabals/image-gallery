# Image Gallery App

A responsive and visually appealing image gallery app built using React and Tailwind CSS. Users can view a collection of images, search by title, and sign up or log in to access the gallery.

## Features

- View a collection of images.
- Search for images by title.
- Sign up and log in to access the gallery.
- Responsive design for various screen sizes.
- Drag and drop images to rearrange them (disabled by request).
- Display loading state during sign-up and login.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- React Router: For routing and navigation.
- Firebase: For user authentication.
- Unsplash API: For fetching random images.
- Tailwind CSS: A utility-first CSS framework for styling.

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/image-gallery-app.git

Navigate to the project directory: cd image-gallery-app
Install dependencies:npm install
Create a Firebase project and configure Firebase Authentication. Replace the Firebase configuration in firebase-config.js with your project's configuration.

Create a .env file in the root directory of the project and add your Unsplash API access key:
REACT_APP_UNSPLASH_API_KEY=your-unsplash-api-key

Start the development server:npm start

Open your web browser and go to http://localhost:3000 to access the application.
Usage
Sign Up
Click on the "Sign Up" button.

Enter your email and password.

Click the "Sign Up" button.

You'll receive a success message once you're signed up.
Login
Click on the "Login" button.

Enter your email and password.

Click the "Login" button.

Image Gallery
Once logged in, you can view the image gallery.

Use the search bar to filter images by title.

Enjoy browsing the gallery!