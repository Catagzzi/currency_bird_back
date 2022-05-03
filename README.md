# Currency Bird Backend
The backend of a platform that implements a referral system.

## **1) Requirements**
To run in a local environment, it only requires **Docker** and **Docker Compose**.

## **2) Installation**
After clonning the repository, make a copy of the ```.env.template``` file. Then, rename the copy to ```.env``` and add your environment variables.
> **_NOTE:_**  For local execution you can just leave everything as it is.

## **3) Execution**

### **Step 1**
#### Recommended Mode
With the following commands, the database and the application will be executed, but only the application logs will be shown in the console, hidding those of the database.
```
docker-compose up -d db
docker-compose up app
```
#### Simple Mode
With this command, the database and the application will be executed, showing all the logs on the screen.
```
docker-compose up
```
### **Step 2**
After that, run the following command to execute the database.
```
docker-compose exec db sh
```
### **Step 3**
Now, you are connected to the shell inside the database container. So you have to enter the database with these command.
```
mysql -u root -proot currency_bird
```
### **Step 4**
To load the tables, notice that you have a folder called "migrations", where you'll find the "migration_01.sql" file. Please run the SQL queries from that file to create the tables.

## **4) Assumptions**
1) The total that must be shown in the table must be all the money that the person has earned, both for entering with a link and for referring a link.

2) It is not necessary to save history of each record (date and time of each record).

3) The value earned for each referral is unique and permanent over time.

4) There is an administrator user who knows how the page works and therefore only he knows the link to see the summary table.

5) The application does not require a login with user authentication, users must only be known by their email.

6) If a user is not registered on the page, he cannot generate an access link, so registration without a referral link should be allowed.

    6.1) If a user registers without a referral link, this user does not earn 5000 CLP.

    6.2) As this link does not belong to anyone, no other person earns 5000 CLP if this user registers without a referral link.

7) It is assumed that the email is unique for each user, because the entry of a rut is not requested.

8) If the referral link isn't associated with any user, it shouldn't be functional.


## **5) Posible Improvements**

1) Implementation of validations for each request sent from the frontend.

2) Implementation of unit tests and integration tests.

3) Improve the scalability of the database to be able to have a history of the records. This implies that the Referral table must contain:

    * Origin user id
    * Referred user id
    * Registration entry date
    * Amount to earn (currently 5000, but can change over time).

4) Creation of a login/logout page to be able to authenticate users with a username and password. For this, JWT would be used to handle tokens.

5) Creation of user permissions to create administrators of the application whose view is different from that of a common user. This administrator would have a view with the invitation summary table. As there would be 2 types of users, a column could be added in the users table that is 1 if it is an administrator and 0 if it is a user.





