### WARNING

If u have problems getting to the login page, clear your localStorage.

# Project Exam 2

Feel free to log in with this "testuser":
(or you can create a new)

Login: banjo@noroff.no
password: banjo123

### Brief

An existing Social Media company has approached you to create a brand new front end for their application. While they have a list of required features, the design and user experience has not been specified. Working with the official API documentation, plan, design and build a modern front end social media application.

### API

The API I am using for this project can be found under Social EndPoints in the Noroff API documentation. [https://noroff-api-docs.netlify.app/]

### Frameworks and Libaries used

React-App
Bootstrap
Sass
Yup and react-hook-form
Axios
Moment
React-Icons

### Installation and Setup

To get started, clone this repository to your computer and make sure you have node and npm installed on your computer.

### Installation:

`npm install`

### Start live server

`Open up your command line or terminal`
Make sure you are in the correct folder.`

`npm start`

### Localhost

The app will usually start up on port 3000, if port is in use, check terminal for info.

### Getting started

To get access you must own a email account that ends with @stud.noroff.no or @noroff.no
If you have a correct email account please feel free to sign up or log in.

### Project Reflection

Koble is a social platform created on Noroff`s social API where you can create an userprofile, create your own post, read other users posts, comment and react with emojis, see other profiles, get followers and follow otherusers. You can even customize your profile with a banner and a profile picture.

The planning for the project went well, i`ve learned over the years at Noroff how to work independent and structured with the help of Trello and a Gantt chart. I`ve had some struggles/Challenges on the way with some functions way longer than i should and ended up asking for some hints/tips and trick from one of the tutors in my class. I got the help i needed to move on and learned tons of stuff from the struggle i had and the help i got from Noroff.

If i am to go deeper into the one big main issue i had that took almost all the time in my coding weeks was the usage of useEffect and state handling to update the states in realtime and make my components rerender on submit, onclick, between/cross parent and child components.
In one point i`ve read up on useReducer hook and tried to implement it but as a "newbie" to React and the way i created my components it felt like to much work to implement the useReducer hook.

The soloution was this easy: i passed functions down to the children as props and called the parent functions inside the children. And WOOPSi. there my components rerendred and displayed new posts in realtime as i created new entries, updated my avatar and so on. Perfect.

One tool i want to mention that used alot in this project was Postman, i`ve created all the POST,GET,PUT,DELETE requests that this project needed in Postman before creating the JSX. As always i enjoy using new tools and learning them and i believe im gonna deep dive into Postman abit more to learn more about it.

Other than that, i really enjoyed this project, and it made me want to create more projects in React. Every semester project and exam has tested my skills and i learned more from these project than anything else.
I have a long list of things i want to implement in my PE2 but never had the time, but the project i delivered is a project that i am proud of and i hope you enjoy testing it aswell.

Best regards Koble Creator Harald Tomter.
