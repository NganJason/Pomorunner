export class Task {
    constructor(axios) {
        this.axios = axios
    }

    async get(task_id) {
        const params = {task_id}

        const res = await this.axios.get("/task/get", {params})

        return res
    }

    async create(taskObj) {
        const payload = taskObj

        const res = await this.axios.post("/task/create", payload)

        return res
    }

    async update(updateObj) {
        const payload = updateObj

        const res = await this.axios.post("/task/update", payload)

        return res
    }

    async delete(task_id) {
        const params = {task_id}

        const res = await this.axios.get("/task/delete", {params})

        return res
    }
}