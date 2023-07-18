"use strict";
// Task No.1 at TAHAKOM (Solo Projects and Code Review)
// Notes App using Express
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const notesApp = (0, express_1.default)();
notesApp.use(body_parser_1.default.json());
// Create an initial list of Notes
let notes = [
    {
        id: 1,
        title: "Day 1 at TAHAKOM",
        content: "Signing the training contract",
        date: "Jul 9, 2023, 10:00 AM",
    },
    {
        id: 2,
        title: "Day 2 at TAHAKOM",
        content: "Hold the first meeting with our training supervisor",
        date: "Jul 10, 2023, 12:04 PM",
    },
    {
        id: 3,
        title: "Day 3 at TAHAKOM",
        content: "Starting the first task: solo development",
        date: "Jul 11, 2023, 3:34 PM",
    },
];
// Add Note /notes - create a new note
notesApp.post("/notes", (req, res) => {
    const { title, content } = req.body;
    const id = notes.length + 1;
    const today = new Date();
    const date = today.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    // Formatted date: "Jul 13, 2023, 11:07 AM"
    const newNote = { id, title, content, date };
    notes.push(newNote);
    res.status(201).json(newNote);
});
// Get Note /notes/:id - returns a specific note details
notesApp.get("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find((n) => n.id === id);
    if (note) {
        res.json(note);
    }
    else {
        res.status(404).send("Note not found!");
    }
});
// List Notes /notes - returns a list of all notes
notesApp.get("/notes", (req, res) => {
    res.json(notes);
});
// Update Note /notes/:id - updates an existing note
notesApp.put("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find((n) => n.id === id);
    if (note) {
        const { title, content } = req.body;
        note.title = title || note.title;
        note.content = content || note.content;
        const today = new Date();
        const date = today.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        note.date = date;
        res.json(note);
    }
    else {
        res.status(404).send("Note not found!");
    }
});
// Delete Note /notes/:id - delete a specific note
notesApp.delete("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = notes.findIndex((n) => n.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        res.status(201).send("Note deleted successfully");
    }
    else {
        res.status(404).send("Note not found!");
    }
});
// Start the server
notesApp.listen(3000, () => {
    console.log("Server is running on port 3000");
});
