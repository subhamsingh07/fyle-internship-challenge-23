# Fyle Frontend Challenge

## Overview

This Angular single-page application (SPA) allows users to search for GitHub users and display their public repositories. The application provides a search bar where users can input a GitHub username to fetch and display user information along with their repositories. Server-side pagination is implemented to efficiently handle large numbers of repositories.

## Features

- **Search Functionality**: Users can search for GitHub users by entering a username.
- **User Profile Display**: Once a user is found, their profile information including name, location, bio, and number of public repositories is displayed.
- **Repository Listing**: The application displays the user's public repositories with details such as name, description, language, and number of stars. Each repository also shows associated topics.
- **Pagination**: Server-side pagination allows users to navigate through multiple pages of repositories.
- **Customizable Page Size**: Users can select the number of repositories to display per page from a dropdown menu.
- **Skeleton Loader**: A skeleton loader is displayed while user data is being fetched.
- **Error Handling**: Error messages are displayed if a user is not found or if there is an issue fetching repositories.

## Installation

- **Clone the repository:**

```bash
git clone https://github.com/subhamsingh07/fyle-internship-challenge-23.git
```

- **Navigate to the project directory:**
 
```bash
cd fyle-internship-challenge-23
```

- **Install dependencies:**

```bash
npm install
```

- **Run the development server:**

```bash
ng serve
```

- **Open the application in your browser:**

Navigate to http://localhost:4200/ in your web browser.

## Usage

- **Enter a GitHub username in the search bar and press Enter or click the "Search" button.**
- **View the user profile information and their public repositories.**
- **Navigate through multiple pages of repositories using pagination buttons.**
- **Customize the number of repositories displayed per page using the dropdown menu.**

## Deployment

The application is deployed to Netlify for easy access. You can check the live demo [here](https://user-repo-search.netlify.app/).

## Credits

- **This project was created as a part of the Fyle Internship Challenge.**
- **Tailwind CSS is used for styling the user interface.**
- **Angular CLI is used for project scaffolding and development.**