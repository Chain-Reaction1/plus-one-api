[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)


# plusOne
A social event application that allows users publicly post events as an invitation to other users on the platform. Unauthorized users are able to see all of the events, but must sign-up to RSVP to an event and see the event details.


## Link to the site

LIVE URL: https://chain-reaction1.github.io/plus-one-client

## CLIENT Repository

https://github.com/Chain-Reaction1/plus-one-client

Deployed API Link: https://whispering-ridge-76247.herokuapp.com


## User Stories

[User Stories](https://imgur.com/fEkJUPv)


## ERD

[plusONE App ERD](https://imgur.com/Qf4ZtBC)


## Technologies Used

Javascript, Mongodb, Mongoose, Express.js


## Paths and Methods

**Methods used:**
- GET
- POST
- PATCH
- DELETE

**Paths used:**
- /kickbacks/:kickbackId/rsvps/:id
- /kickbacks/:id
- /sign-up
- /sign-in
- /change-password
- /sign-out

## Planning & Development

We started this project by planning out the features we wanted the app to have. We then made a wireframe for guidance on how we wanted the app to look. We mostly took the 'mob-programming' approach. We let one person code for some time while the others followed along and assisted. We primarly focused on achieving our 'MVP', and then we used the little time left over for styling and the stretch goal of making 'RSVP' available for users.


## Unsolved Problems and Future Goals

- Feature for users to un-RSVP
- Preventing non owners of an event from accessing the 'update' and 'delete' buttons
- More styling on the landing Page
- Adding back buttons
