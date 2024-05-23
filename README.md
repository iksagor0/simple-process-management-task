# Simple Process Management System

This project is a simple process management system using Node.js, and Express.js. The application demonstrates how to create, retrieve, and delete processes, with each process logging the current time every 5 seconds.

## Features

- **Create Process**: Adds a new process with a unique PID and creation timestamp. Also, the process starts logging time after every 5 seconds.
- **Get All Processes**: Retrieves a list of all created processes.
- **Get Single Process**: Retrieves details of a specific process including its log entries.
- **Delete Process**: Removes a specific process and stops its logging.

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Dependencies

- express: "^4.19.2
- node-cron: "^3.0.3
- nodemon: "^3.1.0 (dev)

## Installation

1. Clone/Download this repository.

2. Go to the project folder and Open Terminal from the project root folder.

3. Then run `npm install ` command to install the dependencies.

4. After installing all dependencies then run `npm run dev`.

5. Now the project is running in your local sever with `1200` port.

```
URL: http://localhost:1200/
```

&nbsp;

## Database

The application uses an in-memory array (database) to store process data. This is a simple approach for demonstration purposes. In a real-world application, you would likely use a persistent database like MongoDB or PostgreSQL.

```javascript
const database = [];
```

## Scheduling

The `node-cron` library is used to schedule automatic logging for each process. A cron job is created that runs every 5 seconds and adds the current timestamp to the process log.

&nbsp;

&nbsp;

# API Endpoints

### Note: I have added a Postman collection in `postman` folder. Please check it out.

### 1. Create Process

When this API is requested, a new process will be created with a unique PID and creation timestamp. Also, the process starts logging time after every 5 seconds.

```javascript
URL: /create-process
Method: POST

Response Sample
{
  "success": true,
  "process": {
    "pid": 1,
    "createdAt": "2024-05-22T05:23:03.633Z",
    "log": []
  }
}
```

### 2. Get All Processes

This API sends all the process data which are saved in the database.

```javascript
URL: /get-all
Method: GET

Response Sample
{
  "success": true,
  "processes": [
    {
      "pid": 1,
      "createdAt": "2024-05-22T05:23:03.633Z"
    },
    {
      "pid": 2,
      "createdAt": "2024-05-22T05:25:58.633Z"
    }
  ]
}
```

### 3. Get Single Process

This API receives a process ID as parameter and then sends the specific process with its log data.

```javascript
URL: /get-single/:pid
Method: POST

Response Sample
{
  "success": true,
  "process": {
    "pid": 1,
    "createdAt": "2024-05-22T05:23:10.633Z",
    "log": [
      "2024-05-22T05:23:15.633Z",
      "2024-05-22T05:23:20.633Z",
      "2024-05-22T05:23:25.633Z",
      "2024-05-22T05:23:30.633Z",
      "2024-05-22T05:23:35.633Z",
      "2024-05-22T05:23:40.633Z"
    ]
  }
}
```

### 4. Delete Process

This API receives a process ID as parameter then deletes the specific process and stops its logging.

```javascript
URL: /delete-process/:pid
Method: DELETE

Response Sample
{
  "success": true,
  "message": "Successfully deleted the process"
}
```

&nbsp;

# Interval Version

I think you've noticed a js file named `interval-version.js`. I've completed this task another way by using `setInterval` to replace node-cron. You can also run this interval version by running `npm run interval` command from the terminal.

However, running numerous intervals can indeed hamper server performance. That's because I used cron job instead of interval in `index.js`.
