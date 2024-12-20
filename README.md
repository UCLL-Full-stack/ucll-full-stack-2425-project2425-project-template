[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/twPj_hbU)

# KanbanCord

To get started, open the Readme.md files in the analysis, back-end and front-end folders.

A Discord-integrated kanban board that allows servers to manage tasks with user/role based access and permissions, allowing for more efficient handling of goals or projects.

### Alan Kim / Eddy Ndacasaba

# Extra notes:

After reading the instructions for the final version, it was clear we weren't supposed to actually connect with the discord OAuth2 api which gets the user, guild and role data. Hence, many validations and database changes related to the id of objects is convoluted and undesirable in a practically viable project and would be done vastly differently.

Given that the original idea was to let OAuth2 handle the login process using Discord, aside from user id and other miscellaneous data we do not get any user credentials such as passwords. As such the "login process" in this process will merely receive the "user id" with no password combination.