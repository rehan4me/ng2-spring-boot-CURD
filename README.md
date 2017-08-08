# ng2-spring-boot-demo

Simple demo app developed using Angular 4, Spring-Boot and MongoDB.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation
To run this project you will have to install following components in your environment.

Node.js: https://nodejs.org/en/
Angular-CLI: http://gulpjs.com
MongoDB: https://www.mongodb.com/
Maven: http://maven.apache.org/


### Installing/Updating npm

```
$ npm install npm@latest -g
```

Go to project directory and install following dependacies.

```
$ cd ng2-spring-boot-demo
```

### Installing Angular 4 project dependencies

```
$ npm install
```


### Run the project
#### Build and run the backend app using maven

```
$ mvn package 
$ java -jar target/todoapp-1.0.0.jar
```
Alternatively, you can run the app without packaging it using -
```
$ mvn spring-boot:run
```
The backend server will start at http://localhost:8080.

#### Run frontend app using npm 

```
$ npm start
```

Now project is ready. Try it here http://localhost:4200.
