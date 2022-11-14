Project Status: Completed :heavy_check_mark:

### Leonardo Crispim

## Scentronix - Back End Test Project

**My Communication Channels**:
- [Linkedin](https://www.linkedin.com/in/leonardo-crispim-371a23134/)
- [Github](https://github.com/leocrispim)
- <leonardo.crispim@outlook.com.br>
<br>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/leocrispim/scentronix-backend">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/leocrispim/scentronix-backend">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/leocrispim/scentronix-backend">
  <a href="https://github.com/leocrispim/scentronix-backend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/leocrispim/scentronix-backend">
  </a>
</p>

<br>

## Project Scope <br>

<br>

Create a node module that can assess a list of webservers and then returns a server with the lowest priority. Also create a unit test that can check if the function is running properly. <br>

<br>

<img src="https://user-images.githubusercontent.com/59870721/108924797-2102f000-761a-11eb-9028-e6a6cd4ac423.png" />

<br>

## Requirements: <br>

### A node module that has a findServer() function which returns a Promise that either: <br>

* Resolves and return an online server with the lowest priority.
* Reject with an error if no servers are online.


### The HTTP server requests should be used to check if the server is online or offline depending on the following requirements: <br>

* All server GET requests should be run in parallel.
* The GET request should timeout after 5 seconds.
* When the GET request responds with a statuscode of 200-299 it is considered online.


### A unit test that checks all the underlying components/requirements. <br>

* The server requests should be mocked.

### JSON Array to usee

``` [
  {
    "url": "https://does-not-work.perfume.new",
    "priority": 1
  },
  {
    "url": "https://gitlab.com",
    "priority": 4
  },
  {
    "url": "http://app.scnt.me",
    "priority": 3
  },
  {
    "url": "https://offline.scentronix.com",
    "priority": 2
  }
]
```

### Languages
* Javascript
### Technologies/Tools
* Git
* Node.js
* Jest

### What are the project's functionalities? :checkered_flag:
:trophy: Simulate a node module that attempts to connect to multiple servers to return the server with the lowest priority.
<br>
### Languages and Libs :books:
- [Axios](https://www.npmjs.com/package/axios): version 0.21.1
- [Axios-Mock-Adapter](https://www.npmjs.com/package/axios-mock-adapter): version 1.19.0
- [Jest](https://jestjs.io/): version 26.0.1

### How to run :arrow_forward:
Open your terminal and clone the project: 
```
git clone https://github.com/leocrispim/scentronix-backend.git
```
Go to the project root folder
```
cd scentronix-backend
```
Install dependencies
```
npm i
```
Run "index.js" node file
```
node index.js
```
You may also run the tests built in this project with the following line:
```
npm run test
```
<br>
