# Starter Repository for Assignment
You are required to build your folder structures for your project.



##############################################################################################################################################


Edit the scripts section in package.json as follow
"scripts": {
    "init_tables": "node src/configs/initTables.js",
    "start": "node index.js",
    "dev": "nodemon index.js"
  }

Open integrated terminal and install required dependencies
'npm install express mysql2 dotenv nodemon jsonwebtoken bcrypt'

Create a new schema in your MySQL Workbench and name the schema as 'CA2'

In the project root directory, create a .env file and copy the following to set up the environment
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= (YOUR MySQL PASSWORD)
DB_DATABASE= CA2
JWT_SECRET_KEY=12345678
JWT_EXPIRES_IN=15m
JWT_ALGORITHM=HS256
NOTE: Please replace '(YOUR MySQL PASSWORD)' with your actual MySQL password

In the integrated terminal, 'npm run init_tables' to initialize the database with required tables.
For initially empty tables, please use the demo data provided for each task below for testing.

In the integrated terminal, 'npm run dev' to start the program
'npm run dev' will console.log to 'http://localhost:3000/index.html'
Ctrl+click to access my project's index page.


##############################################################################################################################################


HTML pages 
HTML pages serve as the front-end interface for the user starting with {index.html}
Because user is neither logged in nor registered, cosidered public, feature and accessibilities will be limited.


##############################################################################################################################################


## Public accessible


As user land onto {index.html}, user will publicly accessible only to 3 read-only pages
                                Home page : {index.html},
                                Users page : {users.html}, 
                                Tasks page : {task.html} 
and 2 interactable pages which are 
                                Log in page : {login.html},
                                Register page : {register.html}

{index.html}
This page contain the global message part where user can read all of the messages posted by registered users publicly
Main caption says "What's new?" on the top, reflecting that these messages are expected to be in newest message on top sequence. 
Each message posted by registered users are displayed as cards with the following information --->
                                The {username} of the owner
                                The {message} content he/she wrote and 
                                The {created_at} timestamp of the creation 

{users.html}
This page show the list of registered users in the User table.
Labelled as "Users" on the top and displays the list of all users with their {username}, {user_id} and {email}

{tasks.html}
This page shoe the list of tasks that user can carry out to gain ecoPoints.
{task_id},{title},{description} and {points} of each task is publicly displayed.

{login.html}
This page essentially is a form that will take user input and authenticate the user into deeper features of the app for the already registered users.
{username} and {password}, which is hashed and stored in the database are required to pass the authentication.
Both fields are marked "required" in the code so that user is compulsory to input both fields with correct username and password pair in order to be logged in.
Upon successful login, user can access the full feature to user, tasks and taskProgress tables.

{register.html}
This page is also a form that will take user particulars and get them registered inside the user table for future, for new users.
{username} and {email} are expected to be unique to avoid authentication conflict.
A {password} is also compulsory to get oneself registered.


##############################################################################################################################################


## Private accessible

Upon successfully authenticated to be a registered user, i.e, log in or register successful, now user can interact and access one step deeper.

{profile.html}
This is the welcome page that the user will first land on upon successfully authenticated.
Will be labelled as "PROFILE" and start with a personalized Welcome message for each logged in user.
eg. if logged in username is "John', it will greet with personalized message "Welcome JOHN!,
Card is used to display the owner information which is then followed by "Update information" and "Delete User" buttons.
If the old user just logged in and he/she had taskprogress in the past, the total ecopoints gained and list of taks he/she have achieved will also be displayed.
On the other hand, if new user just logged in, and he/she has not made any progress, it will show "You do not have any task points", and provide a {Make Task} button for him/her to get started. 
"Update information" button will redirect the user to {updateUser.html} where user can change his/her informations such as {username} and {email}, but still have to be unique.
"Delete user" button will permanently delete the owner's account form User table.


{index.html}
The home page which used to be the view-only to global messages now become the platform where the authenticated can share the message he/she have himself/herself.
While the owner of the message can delete or edit his/her own message, other registered users do not access this features, yet they will still be able to delete or edit thier own ones


{user.html}
After logging in or register, now these two pages become more than just information. 
In the {user.html}, user can interact with two buttons: "Enroll to magic academy" and "Update information".
The first button is for the user to go one more step into the app but on certain condition.
Only the sustainable users, i.e, the user who have made tasks, have taskProgress and earned ecopoints, are eligible to enroll to the magic academy.
Only then, success message will be shown and user will be listed under the Student table for next step access to app's features.
Otherwise, user's request for enrollment will be denied and will be suggested to "Make task".
All the "Make task" buttons mentioned so far will redirect the user to {taskProgress.html} to get themselves achieve a sustainable task and earn points.


{tasks.html}
{task.html} is also now coming to offer a interaciton where the registered users can create a new task that all other users and come down and Make and achieve progress with points.
The data fields are coded as required and user must provide all information needed for a new task to be created.


{taskProgress.html}
A newly poped up page for user with dynamic diaplay where they can see all their task progress with time.
User without prior completed task will only see the greeting message and a form to complete tasks.
Users with prior points will see both the form and their existing task progress.


{enroll.html}
The sustainable users who are eligible for enrollment to magic academy upon hitting the "Enroll to magic academy" will be redirected to {enroll.htm} page where they will able to see all of their work along with the congratulating message from the app. 
He/she will be able to see the "Proceed" button on this page as well which will get them enrolled to the magic academy, listed in the Student table.
Moreover, they will also be assigned to a {house} randomly as they are enrolled. 
Students of the sam {house} are to stick together that they are not allowed to fight each other, not even in a tournament, which is forbidden.
For enrollment, user do not need to input his/her particulars, the app will take the required information through authenticated token to avoid conflict.


{school.html}
When a user is authenticated to be both registered and enrolled, he/she is now accessible to the {school.html} page.
This page is just like the SP brightspace. 
As in not all SP student, but only to DIT student, can accesss the DIT modules, user have to be both registered and enrolled to access this {school.html}
Three main features this page can redirect are {students.html} {tournament.html} and {alumni.html}


{students.html} 
The list of all students are shown and only logged in student himself/herself can learn spells, register tournaments and propose for graduation.
{register tournament} button will take the required information from the current URL and straight away POST the student informatin to the registration table where eligible, because students with less than 10 damage points are not allowed to register for competition.
{propose for graduation} button also will take the required information without user having to manually input straight away POST student information to ALUMNI table where applicable because Students with less than 50  graduation points are not qualified to graduate.
Graduation points are calculated by 30% of EcoPoints from doing task and gaining taskProgress plus 70% from learning spells and getting damage points.
{spells.html} 
will be redirected from "Spells" button where students can learn spells and earn damage points.
Again, user no need to provide information such as user_id, spell_id as in CA1, user only need to click on the "Learn this spell button".


{tournament.html}
Here will check if the visiting student is registered to be in the tournament or not. 
If no, will ask the student to register first.
If registered, student can challenge one of the other registrants. Winning and loosing is again calculated by 30% ecoPoint and 70% damage point.
Winner is awared 10 damage points and looser is awarded 5 damage points for participarion.


{alumni.html}
This page is to honour our successfully graduated students. 
GOAT (greatest of all time) alumni is dynamically displayed that whoever with the most points in the Alumni list is shown.


What is special about this app?
Graduation points cut off at the time of graduation proposal. Damage points from learning spells is limited becuase the number of spells is fixed and they cannot learn a spell more than one time. Meaning that if a student is aiming to be the GOAT, the only way he/she can score beyond, is to do and/or create a lot of sustainable task and thus this app promote sustainability. 



















##CA1#############################################################################################################################################

 ## SECTION A ENDPOINT, SAMPLE BODY and DEMO DATA
(1)  POST /users
METHOD: POST
ENDPOINT:  http://localhost:3000/users
SAMPLE BODY:
    {
    "username": "greenUser123",
    "email": "user123@example.com"
    }

(2)  GET /users
METHOD: GET
ENDPOINT:  http://localhost:3000/users
SAMPLE BODY: NULL
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(3)  GET /users/{user_id}
METHOD: GET
ENDPOINT: http://localhost:3000/users/:user_id
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(4)  PUT /users/{user_id}
METHOD: PUT
ENDPOINT: http://localhost:3000/users/:user_id
SAMPLE BODY: 
    {
    "username": "sustainableUser",
    "email": "user123_updated@example.com"
    }
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(5)  DELETE /users/{user_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/users/:user_id
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
   (1, 1, '2023-07-30', 'Planted two trees'),
   (1, 1, '2023-08-30', 'Planted two trees'),
   (1, 3, '2023-07-30', 'Recycled a plastic bag'),
   (2, 2, '2023-08-30', 'Took MRT'),
   (2, 4, '2023-07-30', 'Turned off lights');

(6)  POST /tasks
METHOD: POST
ENDPOINT: http://localhost:3000/tasks
SAMPLE BODY: 
    {
    "title": "No Plastic Bottles",
    "description": "Avoid purchasing bottled water and use a reusable water bottle instead.",
    "points": 40
    }

(7)  GET /tasks
METHOD: GET
ENDPOINT: http://localhost:3000/tasks

(8)  GET /tasks/{task_id}
METHOD: GET
ENDPOINT: http://localhost:3000/tasks/:{task_id}

(9)  PUT /tasks/{task_id}
METHOD: PUT
ENDPOINT: http://localhost:3000/tasks/:{task_id}
SAMPLE BODY: 
    {
    "title": "Plant Two Trees",
    "description": "Plant two trees in your neighborhood or a designated green area.",
    "points": 60
    }

(10) . DELETE /tasks/{task_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/tasks/:{task_id}

(11)  POST /task_progresss
METHOD: POST
ENDPOINT: http://localhost:3000/task_progress
SAMPLE BODY:
    {
    "user_id": 1,
    "task_id": 1,
    "completion_date": "2023-07-30",
    "notes": "Planted a tree in the park near my house."
    }
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(12)  GET /task_progress/{progress_id}
METHOD: GET
ENDPOINT: http://localhost:3000/task_progress/:{progress_id}
DEMO DATA:
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted two trees'),
    (1, 1, '2023-08-30', 'Planted two trees'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights');

(13)  PUT /task_progress/{progress_id}
METHOD: PUT
ENDPOINT: http://localhost:3000/task_progress/:{progress_id}
SAMPLE BODY:
    {
    "notes": "Planted two trees this time!"
    }
DEMO DATA: 
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted a tree near my house'),
    (1, 1, '2023-08-30', 'Planted a tree near my house'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights');

(14)  DELETE/task_progress/{progress_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/task_progress/:{progress_id}
DEMO DATA: 
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted a tree near my house'),
    (1, 1, '2023-08-30', 'Planted a tree near my house'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights');


##############################################################################################################################################


## SECTION B ENDPOINT, SAMPLE BODY, DEMO DATA and DESCRIPTION OF THE TASK
(1)  POST /student
METHOD : POST 
ENDPOINT: http://localhost:3000/student 
SAMPLE BODY:
    {
        "user_id" : 1
    }
DEMO DATA : 
   INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

   INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
   (1, 1, '2023-07-30', 'Planted two trees'),
   (1, 1, '2023-08-30', 'Planted two trees'),
   (1, 3, '2023-07-30', 'Recycled a plastic bag'),
   (2, 2, '2023-08-30', 'Took MRT'),
   (2, 4, '2023-07-30', 'Turned off lights');
DESCRIPTION:
    Body will take user_id eg.{user_id : 1} 
    Will check the following:
    If provided user_id is already a student, will response 409 conflict with message: "User is already enrolled as a student"
    If user_id is not defined in the body, will response 400 with "Error: "Missing required data"
    If provided user_id does not exist, will response 404 with message: "User not found"
    Otherwise, continue
    Will check the total_points gained by the provided user_id from the "taskProgress" table
    Only the user who did tasks and have earned points in the past will be allowed to admission as a student
    And if the user has no points, admission to the school will be rejected
    The user who are accepted as stuents will be randomly assigned to one of the three SOC inspired houses
    'Asile Tea'- inspired by DIT ,'Triple Aye'- inspired by DAAA (D triple A) or 'Issac Emp'- inspired by DISM
    const houseList = ['Asile Tea','Triple Aye','Issac Emp']


(2)  GET /student
METHOD: GET
ENDPOINT: http://localhost:3000/student 
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCRIPTON:
    Will display all the students in the 'Student' table


(3)  GET /student/:{student_id}
METHOD: GET
ENDPOINT: http://localhost:3000/student/:{student_id}
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCRIPTON:
    Will take student_id as a param 
    If the provided student_id does not exist, response 404 with message: "Student not found"
    Otherwise, display from table Student where the student_id is equal to the taken param


(4)  GET /student/house/:{house}
METHOD: GET
ENDPOINT: http://localhost:3000/student/:{house}
LIST OF HOUSE: const houseList = ['Asile_Tea','Triple_Aye','Issac_Emp']
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (3, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCTIPTION:
    Will take the housename as a param
    If the provied housename is not included in the randomized house list, will response 404 with message : 'Invalid House'
    If there are no students with the provide housename, will response 404 with  message: `No Students under ${req.params.housename}`
    Otherwise, will diaplay all from table Student where the house is equal to the taken param


(5)  GET /spells
METHOD: GET
ENDPOINT: http://localhost:3000/spells
SAMPLE BODY: 
    {
        "user_id" : 1
    }
DEMO DATA:
    INSERT INTO User (username, email) VALUES
    ('ecowarrior', 'ecowarrior@example.com'),
    ('ecowarrior2', 'ecowarrior2@example.com'),
    ('ecowarrior3', 'ecowarrior3@example.com');

    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye');
DESCRIPTION:
    Will take user_id as body
    If the body is missing, response 400 with "Error: Please indicate your user_id in body"
    If the provided user_id does not exist, will response 404 with message : "User does not exist"
    If the provided user_id exist but not enrolled as student, will response 404 with message : "Provided user is not a student. Only students are accessible to the full list of spells"
    Otherwise, read all data from "Spells" table


(6)  GET /spells/:{id}
METTHOD: GET
ENDPOINT:  http://localhost:3000/spells/:{id}
DESCRIPTION:
    Will take spell_id as a param 
    If the provided spell_id does not exist, will response 404 with message: "spell not found"
    Otherwise, display all from table spell where the spell_id is equal to the taken param


(7)  POST /learn
METHOD: POST
ENDPOINT: http://localhost:3000/learn
SAMPLE BODY: 
{
    "student_id" : 1 ,
    "spell_id" : 3
}
DEMO DATA: 
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCRIPTION:
    Will take the student_id and spell_id as body
    If the required data are missing, will response 400 with "Error: Missing required data"
    If the provided student_id does not exist, will response 404 with message : "Student not found"
    If spell_id 1 and 2 are provided, will responde 400 with message: `Cannot learn this spell - spell_id ${req.body.spell_id} is reserved for tournament`
    If the provided spell_id does not exist, will response 404 with message : "Spell not found"
    If the provided student_id has already learnt the provide spell_id, will response 409 with message : `The student id ${data.student_id} has already learnt the spell id ${data.spell_id}`
    Otherwise the provided student_id will be listed in the LearntSpells table as he has learned the provided spell_id on the CURRENT_TIMESTAMP time
    Response will be 201 and will display all from LearntSpells table where learnt_id = LAST_INSERT_ID();


(8)  GET /learn/student_id/:{student_id}
METHOD: GET
ENDPOINT: http://localhost:3000/learn/student_id/:{student_id}
DEMO DATA :
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');

    INSERT INTO LearntSpells (student_id, spell_id) VALUES 
    (1,3),
    (1,4),
    (1,5),
    (2,6),
    (2,7),
    (2,8),
    (3,9),
    (3,10);
DESCRIPTION:
    Will take the student_id as param
    If the provided student_id does not exist, will response 404 with message : "Student not found"
    If the provided student_id has not learnt any spells, will response 404 with message : `Student id ${data.id} has not learnt any spells`
    Otherwise, will display the student_id and his total damage points which is the sum of damage points of all the spells he has learnt,
    together with the list of all the spells he learnt


(9)  POST /tournament/registration/:{student_id}
METHOD: POST
ENDPOINT: http://localhost:3000/tournament/registration/:{student_id}
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');

    INSERT INTO LearntSpells (student_id, spell_id) VALUES 
    (1,3),
    (1,4),
    (1,5),
    (1,6),
    (2,7),
    (2,8),
    (2,9),
    (3,10);
DESCRIPTION:
    Will take the student_id as param
    If the required data are missing, will response 400 with "Error: Missing required data"
    If the provided student_id does not exist, will response 404 with message : "Student not found"
    If the provided student_id has already registered for the tournament, will response 409 with message : "Student has already registered for the tournament"
    If the provided student_id has damage level less than 10, will response 400 with message : `Student id ${data.id} is not eligible for the tournament because damage is lower than 10`
    Otherwise will list the student_id into registration table along with his assigned house plus total ecoPoints and  total damage points as of registration time
    Response will be 201 and will display {message : `Tournament registration of student id ${data.student_id} successful!`,
                                        registration_id : results.insertId}


(10)  DELETE /tournament/registration/:{registration_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/tournament/registration/:{registration_id}
DEMO DATA : 
    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will take the registration_id as param
    If the required data are missing, will response 400 with "Error: Missing required data"
    If the provided registration_id does not exist, will response 404 with message : "registration not found"
    Otherwise, will delete the provided applicaiton_id from the "registration" table


(11) . GET/tournament/registration
METHOD: GET
ENDPOINT: http://localhost:3000/tournament/registration
DEMO DATA: 
    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will display all registered students from "Registration" table


(12)  GET/tournament/registration/:{registration_id}
METHOD: GET
ENDPOINT: http://localhost:3000/tournament/registration
DEMO DATA: 
    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will display all registered students from "Registration" table where registration_id = req.params.registration_id


(13)  POST/tournament/p1/:{student_id1}/p2/:{student_id2}
METHOD: POST
ENDPOINT: http://localhost:3000/tournament/p1/:{student_id1}/p2/:{student_id2}
DEMO DATA: 
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Issac_Emp'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Asile_Tea'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Triple_Aye'),
    (5, 'ecowarrior5', 'ecowarrior5@example.com', 'Issac_Emp'),
    (6, 'ecowarrior6', 'ecowarrior6@example.com', 'Asile_Tea'),
    (7, 'ecowarrior7', 'ecowarrior7@example.com', 'Issac_Emp');

    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will take the student_id1 and student_id2 as params
    If one or both of the students is/are not registered for tournament, will response 404 with message : `Student id ${data.player_id} is not registered to be in the tournament`
    If both students are from the same house, will response 400 with `Both students are from ${req.p1_house}! Students of the same house are not allowed to compete`;
    Otherwise, will compare player1 and player2 based on their ecoPoints gained by doing tasks in Section A, and damage points gained by learning spells in Section B
    EcoPoints will weight 30% and damage will weight 70% regarding the comparism and will POST all tournament data into "tournament" table
    In the case where one of the players have more points,
    Will POST id, ecopoints and damage of the two players along with the winner_id into tournament table
    Will POST the spell_id : 1 (For winning ; 10 damage points) to learntSpell table for the winning player_id
    Will POST the spell_id : 2 (For participating; 5 damage points) to learntSpell table for the losing player_id
    In the case where the compare points are equavalent,
    Will POST id, ecopoints and damage of the two players along with the winner_id as 0 into tournament table
    Will POST the spell_id : 2 (For participating; 5 damage points) to learntSpell table for both players
    In both cases 
    Will delete the two players from the "registration" table after the tournament because the ecopoints and damage points were taken as of the regisration time
    Considering a player will upgrade himself in terms of both ecoPoints and Damage points before next tournament, that a new register for him with his new ecopoints and damage points is allowed


(14)  POST /student/graduate/:{student_id}
METHOD: POST
ENDPOINT: http://localhost:3000/student/graduate/:{student_id}
DEMO DATA:
    INSERT INTO User (username, email) VALUES
    ('ecowarrior', 'ecowarrior@example.com'),
    ('ecowarrior2', 'ecowarrior2@example.com'),
    ('ecowarrior3', 'ecowarrior3@example.com'),
    ('ecowarrior4', 'ecowarrior4@example.com');

    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted two trees'),
    (1, 1, '2023-08-30', 'Planted two trees'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 1, '2023-07-30', 'Planted two trees'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights'),
    (3, 1, '2023-07-30', 'Planted two trees'),
    (3, 1, '2023-08-30', 'Planted two trees'),
    (3, 3, '2023-07-30', 'Recycled a plastic bag'),
    (4, 1, '2023-07-30', 'Planted two trees'),
    (4, 1, '2023-08-30', 'Planted two trees'),
    (4, 3, '2023-07-30', 'Recycled a plastic bag');

    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Issac_Emp'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Triple_Aye'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Asile_Tea');

    INSERT INTO LearntSpells (student_id, spell_id) VALUES 
    (1,3),
    (1,4),
    (1,5),
    (1,6),
    (2,7),
    (2,8),
    (2,12),
    (2,6),
    (2,10),
    (2,9),
    (3,10);
DESCRIPTION:
    Will take the student_id as a param
    If the provided student_id does not exist, will response 404 with  message: "Student not found"
    If the provided student_id has (30% of ecoPoints + 70% of damage points) < 50, proposal for graduation will be denied
    If the provided student_id has (30% of ecoPoints + 70% of damage points) > 50 , proposal for graduation will be accepted
    student_id, ecoPoints, damage and total_score will be posted to the "Alumni" table
    (According to the demo data, student1 is meant to graduate with 58 points,
    Student2 is meant to graguate with 62 points,
    Student3 is meant to not graduate with 46 points, and
    Student4 is meant to not graduate with 0 damage points)


(15)  GET /student/alumni
METHOD: GET
ENDPOINT: http://localhost:3000/student/alumni
DEMO DATA:
    INSERT INTO Alumni (student_id, ecoPoints, damage, total_score) VALUES 
    (1, 100, 44, 60),
    (2, 200, 80, 116),
    (3, 80, 90, 87),
    (4, 40, 50, 47),
    (5, 50, 59, 56),
DESCRIPTION:
    Will diaplay the list of graduated students (Magic Academy's Alumni list)


(16)  GET /student/alumni/goat
METHOD: GET
ENDPOINT: http://localhost:3000/student/alumni/goat
DEMO DATA:
    INSERT INTO Alumni (student_id, ecoPoints, damage, total_score) VALUES 
    (1, 100, 44, 60),
    (2, 200, 80, 116),
    (3, 80, 90, 87),
    (4, 40, 50, 47),
    (5, 50, 59, 56),
DESCRIPTION:
    To find the GREATEST OF ALL TIME
    Will display all information of the alumni whose total_score is the highest of all



##############################################################################################################################################


Edit the scripts section in package.json as follow
"scripts": {
    "init_tables": "node src/configs/initTables.js",
    "start": "node index.js",
    "dev": "nodemon index.js"
  }

Open integrated terminal and install required dependencies
'npm install express mysql2 dotenv nodemon jsonwebtoken bcrypt'

Create a new schema in your MySQL Workbench and name the schema as 'CA2'

In the project root directory, create a .env file and copy the following to set up the environment
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= (YOUR MySQL PASSWORD)
DB_DATABASE= CA2
NOTE: Please replace '(YOUR MySQL PASSWORD)' with your actual MySQL password

In the integrated terminal, 'npm run init_tables' to initialize the database with required tables.
For initially empty tables, please use the demo data provided for each task below for testing.

In the integrated terminal, 'npm run dev' to start the program


##############################################################################################################################################


 ## SECTION A ENDPOINT, SAMPLE BODY and DEMO DATA
(1)  POST /users
METHOD: POST
ENDPOINT:  http://localhost:3000/users
SAMPLE BODY:
    {
    "username": "greenUser123",
    "email": "user123@example.com"
    }

(2)  GET /users
METHOD: GET
ENDPOINT:  http://localhost:3000/users
SAMPLE BODY: NULL
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(3)  GET /users/{user_id}
METHOD: GET
ENDPOINT: http://localhost:3000/users/:user_id
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(4)  PUT /users/{user_id}
METHOD: PUT
ENDPOINT: http://localhost:3000/users/:user_id
SAMPLE BODY: 
    {
    "username": "sustainableUser",
    "email": "user123_updated@example.com"
    }
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(5)  DELETE /users/{user_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/users/:user_id
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
   (1, 1, '2023-07-30', 'Planted two trees'),
   (1, 1, '2023-08-30', 'Planted two trees'),
   (1, 3, '2023-07-30', 'Recycled a plastic bag'),
   (2, 2, '2023-08-30', 'Took MRT'),
   (2, 4, '2023-07-30', 'Turned off lights');

(6)  POST /tasks
METHOD: POST
ENDPOINT: http://localhost:3000/tasks
SAMPLE BODY: 
    {
    "title": "No Plastic Bottles",
    "description": "Avoid purchasing bottled water and use a reusable water bottle instead.",
    "points": 40
    }

(7)  GET /tasks
METHOD: GET
ENDPOINT: http://localhost:3000/tasks

(8)  GET /tasks/{task_id}
METHOD: GET
ENDPOINT: http://localhost:3000/tasks/:{task_id}

(9)  PUT /tasks/{task_id}
METHOD: PUT
ENDPOINT: http://localhost:3000/tasks/:{task_id}
SAMPLE BODY: 
    {
    "title": "Plant Two Trees",
    "description": "Plant two trees in your neighborhood or a designated green area.",
    "points": 60
    }

(10) . DELETE /tasks/{task_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/tasks/:{task_id}

(11)  POST /task_progresss
METHOD: POST
ENDPOINT: http://localhost:3000/task_progress
SAMPLE BODY:
    {
    "user_id": 1,
    "task_id": 1,
    "completion_date": "2023-07-30",
    "notes": "Planted a tree in the park near my house."
    }
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(12)  GET /task_progress/{progress_id}
METHOD: GET
ENDPOINT: http://localhost:3000/task_progress/:{progress_id}
DEMO DATA:
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted two trees'),
    (1, 1, '2023-08-30', 'Planted two trees'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights');

(13)  PUT /task_progress/{progress_id}
METHOD: PUT
ENDPOINT: http://localhost:3000/task_progress/:{progress_id}
SAMPLE BODY:
    {
    "notes": "Planted two trees this time!"
    }
DEMO DATA: 
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted a tree near my house'),
    (1, 1, '2023-08-30', 'Planted a tree near my house'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights');

(14)  DELETE/task_progress/{progress_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/task_progress/:{progress_id}
DEMO DATA: 
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted a tree near my house'),
    (1, 1, '2023-08-30', 'Planted a tree near my house'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights');


##############################################################################################################################################


## SECTION B ENDPOINT, SAMPLE BODY, DEMO DATA and DESCRIPTION OF THE TASK
(1)  POST /student
METHOD : POST 
ENDPOINT: http://localhost:3000/student 
SAMPLE BODY:
    {
        "user_id" : 1
    }
DEMO DATA : 
   INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

   INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
   (1, 1, '2023-07-30', 'Planted two trees'),
   (1, 1, '2023-08-30', 'Planted two trees'),
   (1, 3, '2023-07-30', 'Recycled a plastic bag'),
   (2, 2, '2023-08-30', 'Took MRT'),
   (2, 4, '2023-07-30', 'Turned off lights');
DESCRIPTION:
    Body will take user_id eg.{user_id : 1} 
    Will check the following:
    If provided user_id is already a student, will response 409 conflict with message: "User is already enrolled as a student"
    If user_id is not defined in the body, will response 400 with "Error: "Missing required data"
    If provided user_id does not exist, will response 404 with message: "User not found"
    Otherwise, continue
    Will check the total_points gained by the provided user_id from the "taskProgress" table
    Only the user who did tasks and have earned points in the past will be allowed to admission as a student
    And if the user has no points, admission to the school will be rejected
    The user who are accepted as stuents will be randomly assigned to one of the three SOC inspired houses
    'Asile Tea'- inspired by DIT ,'Triple Aye'- inspired by DAAA (D triple A) or 'Issac Emp'- inspired by DISM
    const houseList = ['Asile Tea','Triple Aye','Issac Emp']


(2)  GET /student
METHOD: GET
ENDPOINT: http://localhost:3000/student 
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCRIPTON:
    Will display all the students in the 'Student' table


(3)  GET /student/:{student_id}
METHOD: GET
ENDPOINT: http://localhost:3000/student/:{student_id}
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCRIPTON:
    Will take student_id as a param 
    If the provided student_id does not exist, response 404 with message: "Student not found"
    Otherwise, display from table Student where the student_id is equal to the taken param


(4)  GET /student/house/:{house}
METHOD: GET
ENDPOINT: http://localhost:3000/student/:{house}
LIST OF HOUSE: const houseList = ['Asile_Tea','Triple_Aye','Issac_Emp']
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (3, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCTIPTION:
    Will take the housename as a param
    If the provied housename is not included in the randomized house list, will response 404 with message : 'Invalid House'
    If there are no students with the provide housename, will response 404 with  message: `No Students under ${req.params.housename}`
    Otherwise, will diaplay all from table Student where the house is equal to the taken param


(5)  GET /spells
METHOD: GET
ENDPOINT: http://localhost:3000/spells
SAMPLE BODY: 
    {
        "user_id" : 1
    }
DEMO DATA:
    INSERT INTO User (username, email) VALUES
    ('ecowarrior', 'ecowarrior@example.com'),
    ('ecowarrior2', 'ecowarrior2@example.com'),
    ('ecowarrior3', 'ecowarrior3@example.com');

    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye');
DESCRIPTION:
    Will take user_id as body
    If the body is missing, response 400 with "Error: Please indicate your user_id in body"
    If the provided user_id does not exist, will response 404 with message : "User does not exist"
    If the provided user_id exist but not enrolled as student, will response 404 with message : "Provided user is not a student. Only students are accessible to the full list of spells"
    Otherwise, read all data from "Spells" table


(6)  GET /spells/:{id}
METTHOD: GET
ENDPOINT:  http://localhost:3000/spells/:{id}
DESCRIPTION:
    Will take spell_id as a param 
    If the provided spell_id does not exist, will response 404 with message: "spell not found"
    Otherwise, display all from table spell where the spell_id is equal to the taken param


(7)  POST /learn
METHOD: POST
ENDPOINT: http://localhost:3000/learn
SAMPLE BODY: 
{
    "student_id" : 1 ,
    "spell_id" : 3
}
DEMO DATA: 
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCRIPTION:
    Will take the student_id and spell_id as body
    If the required data are missing, will response 400 with "Error: Missing required data"
    If the provided student_id does not exist, will response 404 with message : "Student not found"
    If spell_id 1 and 2 are provided, will responde 400 with message: `Cannot learn this spell - spell_id ${req.body.spell_id} is reserved for tournament`
    If the provided spell_id does not exist, will response 404 with message : "Spell not found"
    If the provided student_id has already learnt the provide spell_id, will response 409 with message : `The student id ${data.student_id} has already learnt the spell id ${data.spell_id}`
    Otherwise the provided student_id will be listed in the LearntSpells table as he has learned the provided spell_id on the CURRENT_TIMESTAMP time
    Response will be 201 and will display all from LearntSpells table where learnt_id = LAST_INSERT_ID();


(8)  GET /learn/student_id/:{student_id}
METHOD: GET
ENDPOINT: http://localhost:3000/learn/student_id/:{student_id}
DEMO DATA :
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');

    INSERT INTO LearntSpells (student_id, spell_id) VALUES 
    (1,3),
    (1,4),
    (1,5),
    (2,6),
    (2,7),
    (2,8),
    (3,9),
    (3,10);
DESCRIPTION:
    Will take the student_id as param
    If the provided student_id does not exist, will response 404 with message : "Student not found"
    If the provided student_id has not learnt any spells, will response 404 with message : `Student id ${data.id} has not learnt any spells`
    Otherwise, will display the student_id and his total damage points which is the sum of damage points of all the spells he has learnt,
    together with the list of all the spells he learnt


(9)  POST /tournament/registration/:{student_id}
METHOD: POST
ENDPOINT: http://localhost:3000/tournament/registration/:{student_id}
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');

    INSERT INTO LearntSpells (student_id, spell_id) VALUES 
    (1,3),
    (1,4),
    (1,5),
    (1,6),
    (2,7),
    (2,8),
    (2,9),
    (3,10);
DESCRIPTION:
    Will take the student_id as param
    If the required data are missing, will response 400 with "Error: Missing required data"
    If the provided student_id does not exist, will response 404 with message : "Student not found"
    If the provided student_id has already registered for the tournament, will response 409 with message : "Student has already registered for the tournament"
    If the provided student_id has damage level less than 10, will response 400 with message : `Student id ${data.id} is not eligible for the tournament because damage is lower than 10`
    Otherwise will list the student_id into registration table along with his assigned house plus total ecoPoints and  total damage points as of registration time
    Response will be 201 and will display {message : `Tournament registration of student id ${data.student_id} successful!`,
                                        registration_id : results.insertId}


(10)  DELETE /tournament/registration/:{registration_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/tournament/registration/:{registration_id}
DEMO DATA : 
    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will take the registration_id as param
    If the required data are missing, will response 400 with "Error: Missing required data"
    If the provided registration_id does not exist, will response 404 with message : "registration not found"
    Otherwise, will delete the provided applicaiton_id from the "registration" table


(11) . GET/tournament/registration
METHOD: GET
ENDPOINT: http://localhost:3000/tournament/registration
DEMO DATA: 
    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will display all registered students from "Registration" table


(12)  GET/tournament/registration/:{registration_id}
METHOD: GET
ENDPOINT: http://localhost:3000/tournament/registration
DEMO DATA: 
    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will display all registered students from "Registration" table where registration_id = req.params.registration_id


(13)  POST/tournament/p1/:{student_id1}/p2/:{student_id2}
METHOD: POST
ENDPOINT: http://localhost:3000/tournament/p1/:{student_id1}/p2/:{student_id2}
DEMO DATA: 
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Issac_Emp'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Asile_Tea'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Triple_Aye'),
    (5, 'ecowarrior5', 'ecowarrior5@example.com', 'Issac_Emp'),
    (6, 'ecowarrior6', 'ecowarrior6@example.com', 'Asile_Tea'),
    (7, 'ecowarrior7', 'ecowarrior7@example.com', 'Issac_Emp');

    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will take the student_id1 and student_id2 as params
    If one or both of the students is/are not registered for tournament, will response 404 with message : `Student id ${data.player_id} is not registered to be in the tournament`
    If both students are from the same house, will response 400 with `Both students are from ${req.p1_house}! Students of the same house are not allowed to compete`;
    Otherwise, will compare player1 and player2 based on their ecoPoints gained by doing tasks in Section A, and damage points gained by learning spells in Section B
    EcoPoints will weight 30% and damage will weight 70% regarding the comparism and will POST all tournament data into "tournament" table
    In the case where one of the players have more points,
    Will POST id, ecopoints and damage of the two players along with the winner_id into tournament table
    Will POST the spell_id : 1 (For winning ; 10 damage points) to learntSpell table for the winning player_id
    Will POST the spell_id : 2 (For participating; 5 damage points) to learntSpell table for the losing player_id
    In the case where the compare points are equavalent,
    Will POST id, ecopoints and damage of the two players along with the winner_id as 0 into tournament table
    Will POST the spell_id : 2 (For participating; 5 damage points) to learntSpell table for both players
    In both cases 
    Will delete the two players from the "registration" table after the tournament because the ecopoints and damage points were taken as of the regisration time
    Considering a player will upgrade himself in terms of both ecoPoints and Damage points before next tournament, that a new register for him with his new ecopoints and damage points is allowed


(14)  POST /student/graduate/:{student_id}
METHOD: POST
ENDPOINT: http://localhost:3000/student/graduate/:{student_id}
DEMO DATA:
    INSERT INTO User (username, email) VALUES
    ('ecowarrior', 'ecowarrior@example.com'),
    ('ecowarrior2', 'ecowarrior2@example.com'),
    ('ecowarrior3', 'ecowarrior3@example.com'),
    ('ecowarrior4', 'ecowarrior4@example.com');

    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted two trees'),
    (1, 1, '2023-08-30', 'Planted two trees'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 1, '2023-07-30', 'Planted two trees'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights'),
    (3, 1, '2023-07-30', 'Planted two trees'),
    (3, 1, '2023-08-30', 'Planted two trees'),
    (3, 3, '2023-07-30', 'Recycled a plastic bag'),
    (4, 1, '2023-07-30', 'Planted two trees'),
    (4, 1, '2023-08-30', 'Planted two trees'),
    (4, 3, '2023-07-30', 'Recycled a plastic bag');

    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Issac_Emp'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Triple_Aye'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Asile_Tea');

    INSERT INTO LearntSpells (student_id, spell_id) VALUES 
    (1,3),
    (1,4),
    (1,5),
    (1,6),
    (2,7),
    (2,8),
    (2,12),
    (2,6),
    (2,10),
    (2,9),
    (3,10);
DESCRIPTION:
    Will take the student_id as a param
    If the provided student_id does not exist, will response 404 with  message: "Student not found"
    If the provided student_id has (30% of ecoPoints + 70% of damage points) < 50, proposal for graduation will be denied
    If the provided student_id has (30% of ecoPoints + 70% of damage points) > 50 , proposal for graduation will be accepted
    student_id, ecoPoints, damage and total_score will be posted to the "Alumni" table
    (According to the demo data, student1 is meant to graduate with 58 points,
    Student2 is meant to graguate with 62 points,
    Student3 is meant to not graduate with 46 points, and
    Student4 is meant to not graduate with 0 damage points)


(15)  GET /student/alumni
METHOD: GET
ENDPOINT: http://localhost:3000/student/alumni
DEMO DATA:
    INSERT INTO Alumni (student_id, ecoPoints, damage, total_score) VALUES 
    (1, 100, 44, 60),
    (2, 200, 80, 116),
    (3, 80, 90, 87),
    (4, 40, 50, 47),
    (5, 50, 59, 56),
DESCRIPTION:
    Will diaplay the list of graduated students (Magic Academy's Alumni list)


(16)  GET /student/alumni/goat
METHOD: GET
ENDPOINT: http://localhost:3000/student/alumni/goat
DEMO DATA:
    INSERT INTO Alumni (student_id, ecoPoints, damage, total_score) VALUES 
    (1, 100, 44, 60),
    (2, 200, 80, 116),
    (3, 80, 90, 87),
    (4, 40, 50, 47),
    (5, 50, 59, 56),
DESCRIPTION:
    To find the GREATEST OF ALL TIME
    Will display all information of the alumni whose total_score is the highest of all


##############################################################################################################################################


Edit the scripts section in package.json as follow
"scripts": {
    "init_tables": "node src/configs/initTables.js",
    "start": "node index.js",
    "dev": "nodemon index.js"
  }

Open integrated terminal and install required dependencies
'npm install express mysql2 dotenv nodemon jsonwebtoken bcrypt'

Create a new schema in your MySQL Workbench and name the schema as 'CA2'

In the project root directory, create a .env file and copy the following to set up the environment
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= (YOUR MySQL PASSWORD)
DB_DATABASE= CA2
NOTE: Please replace '(YOUR MySQL PASSWORD)' with your actual MySQL password

In the integrated terminal, 'npm run init_tables' to initialize the database with required tables.
For initially empty tables, please use the demo data provided for each task below for testing.

In the integrated terminal, 'npm run dev' to start the program


##############################################################################################################################################


 ## SECTION A ENDPOINT, SAMPLE BODY and DEMO DATA
(1)  POST /users
METHOD: POST
ENDPOINT:  http://localhost:3000/users
SAMPLE BODY:
    {
    "username": "greenUser123",
    "email": "user123@example.com"
    }

(2)  GET /users
METHOD: GET
ENDPOINT:  http://localhost:3000/users
SAMPLE BODY: NULL
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(3)  GET /users/{user_id}
METHOD: GET
ENDPOINT: http://localhost:3000/users/:user_id
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(4)  PUT /users/{user_id}
METHOD: PUT
ENDPOINT: http://localhost:3000/users/:user_id
SAMPLE BODY: 
    {
    "username": "sustainableUser",
    "email": "user123_updated@example.com"
    }
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(5)  DELETE /users/{user_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/users/:user_id
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
   (1, 1, '2023-07-30', 'Planted two trees'),
   (1, 1, '2023-08-30', 'Planted two trees'),
   (1, 3, '2023-07-30', 'Recycled a plastic bag'),
   (2, 2, '2023-08-30', 'Took MRT'),
   (2, 4, '2023-07-30', 'Turned off lights');

(6)  POST /tasks
METHOD: POST
ENDPOINT: http://localhost:3000/tasks
SAMPLE BODY: 
    {
    "title": "No Plastic Bottles",
    "description": "Avoid purchasing bottled water and use a reusable water bottle instead.",
    "points": 40
    }

(7)  GET /tasks
METHOD: GET
ENDPOINT: http://localhost:3000/tasks

(8)  GET /tasks/{task_id}
METHOD: GET
ENDPOINT: http://localhost:3000/tasks/:{task_id}

(9)  PUT /tasks/{task_id}
METHOD: PUT
ENDPOINT: http://localhost:3000/tasks/:{task_id}
SAMPLE BODY: 
    {
    "title": "Plant Two Trees",
    "description": "Plant two trees in your neighborhood or a designated green area.",
    "points": 60
    }

(10) . DELETE /tasks/{task_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/tasks/:{task_id}

(11)  POST /task_progresss
METHOD: POST
ENDPOINT: http://localhost:3000/task_progress
SAMPLE BODY:
    {
    "user_id": 1,
    "task_id": 1,
    "completion_date": "2023-07-30",
    "notes": "Planted a tree in the park near my house."
    }
DEMO DATA: 
    INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

(12)  GET /task_progress/{progress_id}
METHOD: GET
ENDPOINT: http://localhost:3000/task_progress/:{progress_id}
DEMO DATA:
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted two trees'),
    (1, 1, '2023-08-30', 'Planted two trees'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights');

(13)  PUT /task_progress/{progress_id}
METHOD: PUT
ENDPOINT: http://localhost:3000/task_progress/:{progress_id}
SAMPLE BODY:
    {
    "notes": "Planted two trees this time!"
    }
DEMO DATA: 
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted a tree near my house'),
    (1, 1, '2023-08-30', 'Planted a tree near my house'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights');

(14)  DELETE/task_progress/{progress_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/task_progress/:{progress_id}
DEMO DATA: 
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted a tree near my house'),
    (1, 1, '2023-08-30', 'Planted a tree near my house'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights');


##############################################################################################################################################


## SECTION B ENDPOINT, SAMPLE BODY, DEMO DATA and DESCRIPTION OF THE TASK
(1)  POST /student
METHOD : POST 
ENDPOINT: http://localhost:3000/student 
SAMPLE BODY:
    {
        "user_id" : 1
    }
DEMO DATA : 
   INSERT INTO User (username, email) VALUES
   ('ecowarrior', 'ecowarrior@example.com'),
   ('ecowarrior2', 'ecowarrior2@example.com'),
   ('ecowarrior3', 'ecowarrior3@example.com');

   INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
   (1, 1, '2023-07-30', 'Planted two trees'),
   (1, 1, '2023-08-30', 'Planted two trees'),
   (1, 3, '2023-07-30', 'Recycled a plastic bag'),
   (2, 2, '2023-08-30', 'Took MRT'),
   (2, 4, '2023-07-30', 'Turned off lights');
DESCRIPTION:
    Body will take user_id eg.{user_id : 1} 
    Will check the following:
    If provided user_id is already a student, will response 409 conflict with message: "User is already enrolled as a student"
    If user_id is not defined in the body, will response 400 with "Error: "Missing required data"
    If provided user_id does not exist, will response 404 with message: "User not found"
    Otherwise, continue
    Will check the total_points gained by the provided user_id from the "taskProgress" table
    Only the user who did tasks and have earned points in the past will be allowed to admission as a student
    And if the user has no points, admission to the school will be rejected
    The user who are accepted as stuents will be randomly assigned to one of the three SOC inspired houses
    'Asile Tea'- inspired by DIT ,'Triple Aye'- inspired by DAAA (D triple A) or 'Issac Emp'- inspired by DISM
    const houseList = ['Asile Tea','Triple Aye','Issac Emp']


(2)  GET /student
METHOD: GET
ENDPOINT: http://localhost:3000/student 
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCRIPTON:
    Will display all the students in the 'Student' table


(3)  GET /student/:{student_id}
METHOD: GET
ENDPOINT: http://localhost:3000/student/:{student_id}
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCRIPTON:
    Will take student_id as a param 
    If the provided student_id does not exist, response 404 with message: "Student not found"
    Otherwise, display from table Student where the student_id is equal to the taken param


(4)  GET /student/house/:{house}
METHOD: GET
ENDPOINT: http://localhost:3000/student/:{house}
LIST OF HOUSE: const houseList = ['Asile_Tea','Triple_Aye','Issac_Emp']
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (3, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCTIPTION:
    Will take the housename as a param
    If the provied housename is not included in the randomized house list, will response 404 with message : 'Invalid House'
    If there are no students with the provide housename, will response 404 with  message: `No Students under ${req.params.housename}`
    Otherwise, will diaplay all from table Student where the house is equal to the taken param


(5)  GET /spells
METHOD: GET
ENDPOINT: http://localhost:3000/spells
SAMPLE BODY: 
    {
        "user_id" : 1
    }
DEMO DATA:
    INSERT INTO User (username, email) VALUES
    ('ecowarrior', 'ecowarrior@example.com'),
    ('ecowarrior2', 'ecowarrior2@example.com'),
    ('ecowarrior3', 'ecowarrior3@example.com');

    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye');
DESCRIPTION:
    Will take user_id as body
    If the body is missing, response 400 with "Error: Please indicate your user_id in body"
    If the provided user_id does not exist, will response 404 with message : "User does not exist"
    If the provided user_id exist but not enrolled as student, will response 404 with message : "Provided user is not a student. Only students are accessible to the full list of spells"
    Otherwise, read all data from "Spells" table


(6)  GET /spells/:{id}
METTHOD: GET
ENDPOINT:  http://localhost:3000/spells/:{id}
DESCRIPTION:
    Will take spell_id as a param 
    If the provided spell_id does not exist, will response 404 with message: "spell not found"
    Otherwise, display all from table spell where the spell_id is equal to the taken param


(7)  POST /learn
METHOD: POST
ENDPOINT: http://localhost:3000/learn
SAMPLE BODY: 
{
    "student_id" : 1 ,
    "spell_id" : 3
}
DEMO DATA: 
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');
DESCRIPTION:
    Will take the student_id and spell_id as body
    If the required data are missing, will response 400 with "Error: Missing required data"
    If the provided student_id does not exist, will response 404 with message : "Student not found"
    If spell_id 1 and 2 are provided, will responde 400 with message: `Cannot learn this spell - spell_id ${req.body.spell_id} is reserved for tournament`
    If the provided spell_id does not exist, will response 404 with message : "Spell not found"
    If the provided student_id has already learnt the provide spell_id, will response 409 with message : `The student id ${data.student_id} has already learnt the spell id ${data.spell_id}`
    Otherwise the provided student_id will be listed in the LearntSpells table as he has learned the provided spell_id on the CURRENT_TIMESTAMP time
    Response will be 201 and will display all from LearntSpells table where learnt_id = LAST_INSERT_ID();


(8)  GET /learn/student_id/:{student_id}
METHOD: GET
ENDPOINT: http://localhost:3000/learn/student_id/:{student_id}
DEMO DATA :
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');

    INSERT INTO LearntSpells (student_id, spell_id) VALUES 
    (1,3),
    (1,4),
    (1,5),
    (2,6),
    (2,7),
    (2,8),
    (3,9),
    (3,10);
DESCRIPTION:
    Will take the student_id as param
    If the provided student_id does not exist, will response 404 with message : "Student not found"
    If the provided student_id has not learnt any spells, will response 404 with message : `Student id ${data.id} has not learnt any spells`
    Otherwise, will display the student_id and his total damage points which is the sum of damage points of all the spells he has learnt,
    together with the list of all the spells he learnt


(9)  POST /tournament/registration/:{student_id}
METHOD: POST
ENDPOINT: http://localhost:3000/tournament/registration/:{student_id}
DEMO DATA:
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Triple_Aye'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Issac_Emp'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Issac_Emp');

    INSERT INTO LearntSpells (student_id, spell_id) VALUES 
    (1,3),
    (1,4),
    (1,5),
    (1,6),
    (2,7),
    (2,8),
    (2,9),
    (3,10);
DESCRIPTION:
    Will take the student_id as param
    If the required data are missing, will response 400 with "Error: Missing required data"
    If the provided student_id does not exist, will response 404 with message : "Student not found"
    If the provided student_id has already registered for the tournament, will response 409 with message : "Student has already registered for the tournament"
    If the provided student_id has damage level less than 10, will response 400 with message : `Student id ${data.id} is not eligible for the tournament because damage is lower than 10`
    Otherwise will list the student_id into registration table along with his assigned house plus total ecoPoints and  total damage points as of registration time
    Response will be 201 and will display {message : `Tournament registration of student id ${data.student_id} successful!`,
                                        registration_id : results.insertId}


(10)  DELETE /tournament/registration/:{registration_id}
METHOD: DELETE
ENDPOINT: http://localhost:3000/tournament/registration/:{registration_id}
DEMO DATA : 
    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will take the registration_id as param
    If the required data are missing, will response 400 with "Error: Missing required data"
    If the provided registration_id does not exist, will response 404 with message : "registration not found"
    Otherwise, will delete the provided applicaiton_id from the "registration" table


(11) . GET/tournament/registration
METHOD: GET
ENDPOINT: http://localhost:3000/tournament/registration
DEMO DATA: 
    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will display all registered students from "Registration" table


(12)  GET/tournament/registration/:{registration_id}
METHOD: GET
ENDPOINT: http://localhost:3000/tournament/registration
DEMO DATA: 
    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will display all registered students from "Registration" table where registration_id = req.params.registration_id


(13)  POST/tournament/p1/:{student_id1}/p2/:{student_id2}
METHOD: POST
ENDPOINT: http://localhost:3000/tournament/p1/:{student_id1}/p2/:{student_id2}
DEMO DATA: 
    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Issac_Emp'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Asile_Tea'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Triple_Aye'),
    (5, 'ecowarrior5', 'ecowarrior5@example.com', 'Issac_Emp'),
    (6, 'ecowarrior6', 'ecowarrior6@example.com', 'Asile_Tea'),
    (7, 'ecowarrior7', 'ecowarrior7@example.com', 'Issac_Emp');

    INSERT INTO registration (student_id, house, damage, ecoPoint) VALUES 
    (1, 'Asile_Tea', 44, 100),
    (2, 'Issac_Emp', 44, 100),
    (3, 'Asile_Tea', 55, 80),
    (4, 'Triple_Aye', 40, 40),
    (5, 'Issac_Emp', 30, 50);
DESCRIPTION:
    Will take the student_id1 and student_id2 as params
    If one or both of the students is/are not registered for tournament, will response 404 with message : `Student id ${data.player_id} is not registered to be in the tournament`
    If both students are from the same house, will response 400 with `Both students are from ${req.p1_house}! Students of the same house are not allowed to compete`;
    Otherwise, will compare player1 and player2 based on their ecoPoints gained by doing tasks in Section A, and damage points gained by learning spells in Section B
    EcoPoints will weight 30% and damage will weight 70% regarding the comparism and will POST all tournament data into "tournament" table
    In the case where one of the players have more points,
    Will POST id, ecopoints and damage of the two players along with the winner_id into tournament table
    Will POST the spell_id : 1 (For winning ; 10 damage points) to learntSpell table for the winning player_id
    Will POST the spell_id : 2 (For participating; 5 damage points) to learntSpell table for the losing player_id
    In the case where the compare points are equavalent,
    Will POST id, ecopoints and damage of the two players along with the winner_id as 0 into tournament table
    Will POST the spell_id : 2 (For participating; 5 damage points) to learntSpell table for both players
    In both cases 
    Will delete the two players from the "registration" table after the tournament because the ecopoints and damage points were taken as of the regisration time
    Considering a player will upgrade himself in terms of both ecoPoints and Damage points before next tournament, that a new register for him with his new ecopoints and damage points is allowed


(14)  POST /student/graduate/:{student_id}
METHOD: POST
ENDPOINT: http://localhost:3000/student/graduate/:{student_id}
DEMO DATA:
    INSERT INTO User (username, email) VALUES
    ('ecowarrior', 'ecowarrior@example.com'),
    ('ecowarrior2', 'ecowarrior2@example.com'),
    ('ecowarrior3', 'ecowarrior3@example.com'),
    ('ecowarrior4', 'ecowarrior4@example.com');

    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes) VALUES 
    (1, 1, '2023-07-30', 'Planted two trees'),
    (1, 1, '2023-08-30', 'Planted two trees'),
    (1, 3, '2023-07-30', 'Recycled a plastic bag'),
    (2, 1, '2023-07-30', 'Planted two trees'),
    (2, 2, '2023-08-30', 'Took MRT'),
    (2, 4, '2023-07-30', 'Turned off lights'),
    (3, 1, '2023-07-30', 'Planted two trees'),
    (3, 1, '2023-08-30', 'Planted two trees'),
    (3, 3, '2023-07-30', 'Recycled a plastic bag'),
    (4, 1, '2023-07-30', 'Planted two trees'),
    (4, 1, '2023-08-30', 'Planted two trees'),
    (4, 3, '2023-07-30', 'Recycled a plastic bag');

    INSERT INTO Student (user_id, username, email, house) VALUES
    (1, 'ecowarrior', 'ecowarrior@example.com', 'Asile_Tea'),
    (2, 'ecowarrior2', 'ecowarrior2@example.com', 'Issac_Emp'),
    (3, 'ecowarrior3', 'ecowarrior3@example.com', 'Triple_Aye'),
    (4, 'ecowarrior4', 'ecowarrior4@example.com', 'Asile_Tea');

    INSERT INTO LearntSpells (student_id, spell_id) VALUES 
    (1,3),
    (1,4),
    (1,5),
    (1,6),
    (2,7),
    (2,8),
    (2,12),
    (2,6),
    (2,10),
    (2,9),
    (3,10);
DESCRIPTION:
    Will take the student_id as a param
    If the provided student_id does not exist, will response 404 with  message: "Student not found"
    If the provided student_id has (30% of ecoPoints + 70% of damage points) < 50, proposal for graduation will be denied
    If the provided student_id has (30% of ecoPoints + 70% of damage points) > 50 , proposal for graduation will be accepted
    student_id, ecoPoints, damage and total_score will be posted to the "Alumni" table
    (According to the demo data, student1 is meant to graduate with 58 points,
    Student2 is meant to graguate with 62 points,
    Student3 is meant to not graduate with 46 points, and
    Student4 is meant to not graduate with 0 damage points)


(15)  GET /student/alumni
METHOD: GET
ENDPOINT: http://localhost:3000/student/alumni
DEMO DATA:
    INSERT INTO Alumni (student_id, ecoPoints, damage, total_score) VALUES 
    (1, 100, 44, 60),
    (2, 200, 80, 116),
    (3, 80, 90, 87),
    (4, 40, 50, 47),
    (5, 50, 59, 56),
DESCRIPTION:
    Will diaplay the list of graduated students (Magic Academy's Alumni list)


(16)  GET /student/alumni/goat
METHOD: GET
ENDPOINT: http://localhost:3000/student/alumni/goat
DEMO DATA:
    INSERT INTO Alumni (student_id, ecoPoints, damage, total_score) VALUES 
    (1, 100, 44, 60),
    (2, 200, 80, 116),
    (3, 80, 90, 87),
    (4, 40, 50, 47),
    (5, 50, 59, 56),
DESCRIPTION:
    To find the GREATEST OF ALL TIME
    Will display all information of the alumni whose total_score is the highest of all