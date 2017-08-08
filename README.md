# ng4-spring-boot-mongodb-demo

Simple demo app developed using Angular 4, Spring-Boot and MongoDB.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Requirements
To run this project you will have to install following components in your environment.

- Node.js: https://nodejs.org/en/
- Angular-CLI: http://gulpjs.com
- MongoDB: https://www.mongodb.com/
- Maven: http://maven.apache.org/


#### Go to project directory and install following dependacies.

```
$ cd ng4-spring-boot-mongodb-demo
```

### Installing Angular 4 project dependencies

```
$ npm install
```


## Step to run the project
#### 1. Build and run the backend app using maven

```
$ mvn package 
$ java -jar target/ems-1.0.0.jar
```
Alternatively, you can run the app without packaging it using -
```
$ mvn spring-boot:run
```
The backend server will start at http://localhost:8080.

#### 2. Run frontend app using npm 

```
$ npm start
```

Now project is ready. Try it here http://localhost:4200.
