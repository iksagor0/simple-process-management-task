const cron = require("node-cron");
const express = require("express");
const app = express();

app.use(express.json());

// global variables
const database = [];
const scheduler = {};
let nextPid = 1;

/********************************************************
 *                   CREATE PROCESS
 ********************************************************/
app.post("/create-process", (_req, res) => {
  try {
    const process = {
      pid: nextPid++,
      createdAt: new Date().toISOString(),
      log: [],
    };

    // save process to database
    database.push(process);

    // set scheduler for logging
    scheduler[process.pid] = cron.schedule("*/5 * * * * *", async () => {
      process.log.push(new Date().toISOString());
    });

    // send response with process
    res.status(201).json({ success: true, process });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to create process" });
  }
});

/********************************************************
 *                   GET ALL PROCESSES
 ********************************************************/
app.get("/get-all", (_req, res) => {
  try {
    if (database.length <= 0) {
      throw new Error("No process available");
    }

    const processes = database.map((process) => ({ pid: process.pid, createdAt: process.createdAt }));

    res.json(processes);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message || "Failed to create process" });
  }
});

/********************************************************
 *                   GET SINGLE PROCESS
 ********************************************************/
app.get("/get-single/:pid", (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const process = database.find((p) => p.pid === pid);

    if (!process) {
      throw new Error("Process not found");
    }

    res.json({ success: true, process });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message || "Failed to retrieve process" });
  }
});

/********************************************************
 *                   DELETE PROCESS
 ********************************************************/
app.delete("/delete-process/:pid", (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const index = database.findIndex((p) => p.pid === pid);

    if (index === -1) {
      throw new Error("Process not found");
    }

    scheduler[pid].stop();
    delete scheduler[pid];

    database.splice(index, 1);

    res.status(200).send({ success: true, message: "Successfully deleted the process" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to delete process" });
  }
});

// ******************* Server Running Listener *******************
app.listen(1200, () => {
  console.log(`Server is running on http://localhost:1200`);
});
