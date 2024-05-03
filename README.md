# Next.js + Firebase Blog App

This repository contains the source code for a dynamic blog application built using Next.js and Firebase. This project demonstrates the use of server-side rendering and static generation features of Next.js along with Firebase for authentication, database, and hosting.

## Features

- **User Authentication**: Login and registration functionality using Firebase Authentication.
- **Real-time Data**: Posts are stored and retrieved from Firebase Firestore in real-time.
- **Responsive Design**: Built using CSS Modules for a responsive layout that adjusts to different screen sizes.
- **SEO Friendly**: Utilizes Next.js's SSR capabilities for improved SEO.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js 12.x or higher
- npm/yarn installed
- Firebase account

The application makes use of the following:

- **Firebase Storage** - for storing cover images for posts,
- **Firestore Database** - for saving post details, and
- **Firebase Authentication** - for authenticating post authors.

## Getting Started

- Clone the repository and run `npm i` to install the project dependencies.
- Copy your firebase config into the `firebase.ts` file.
- Set up the Firebase features on your console.


