import Task from "../models/task.js";
import { rootPath } from "../app.js";
export default class GetControllers {
    static homecontroller(req, res) {
        const tasks = Task.getAllTasks();
        res.render("home", { tasks });
    }
}
