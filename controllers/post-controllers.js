import Task from "../models/task.js";
import DB from "../models/db.js";
export default class PostController {
    static addTask(req, res) {
        if (req.body.title) {
            const title = req.body.title;
            const completed = req.body.completed ? true : false;
            try {
                const task = new Task(title, completed);
                task.save();
                res.json(task.id);
            } catch (e) {
                res.status(400).json(`${e.message}`);
            }
        } else {
            res.status(400).json(`enter a title`);
        }
    }
    static toggleTask(req, res) {
        const id = req.body?.id;
        if (id) {
            const task = Task.getTaskById(id);
            if (task) {
                task.completed = !task.completed;
                try {
                    task.save();
                    res.json(true);
                } catch (e) {
                    res.send("Error");
                }
            } else {
                res.status(404).send("Task not found");
            }
        } else {
            res.status(400).json("Invalid request");
        }
    }
    static editTask(req, res) {
        const id = req.body?.id;
        const title = req.body?.title;
        if (id && title) {
            const task = Task.getTaskById(id);
            if (task) {
                try {
                    task.title = title;
                    task.save();
                    res.json(true);
                } catch (e) {
                    res.send(e.message);
                }
            } else {
                res.status(404).send("Task not found");
            }
        } else {
            res.status(400).send("Invalid request");
        }
    }
    static deleteTask(req, res) {
        const id = req.body?.id;
        if (id) {
            try {
                if (DB.deleteTask(id)) {
                    res.json(true);
                } else {
                    res.status(404).json("Task not found.");
                }
            } catch (e) {
                res.status(500).send("server error");
            }
        } else {
            res.status(400).json("invalid request");
        }
    }
}
