# Smart-timetable

## ER Diagram

![1716366873481](image/README/1716366873481.png)

## Technologies

* **Nodejs - Run time for javascript for bulding server-side applications**
* **ExpressJs - FrameWork for building apis**
* **MongoDb - Nosql database**
* **Mongoose - object modeling tool for javascript and nodejs**

## Api Endpoints

| Endpoint              | Method | Description                                                    |
| --------------------- | ------ | -------------------------------------------------------------- |
| /api/courses          | GET    | Get all courses with the total students appended               |
| /api/roomAvailability | GET    | Get all rooms available for scheduling( ie  exluding Offices) |
| /api/rooms            | GET    | Get all rooms                                                  |
| /api/populate         | GET    | Populate the database with test data                           |
| /api/students         | POST   | Add  a student to the database                                |
| /api/schedule/:code   | GET    | Get timetable based on the code for uniqueness                 |
| /api/schedule/:code   | POST   | Generate timetable for with code for uniqueness                |

## Setup Maunual

### Setting Server

1. Navigate to  C:\Users\HP\Desktop\mini-p\smart-timetable\backend
2. Run   ""npm install""
3. run npm run start to start the server

### Setting up Client Web

* Navigate to  C:\Users\HP\Desktop\mini-p\smart-timetable\Web\smart-timetable
* Run   ""npm install""
* run npm run dev to start the server
