export class Subtask {
    constructor(axios) {
        this.axios = axios
    }

    async get(subtask_id) {
        const params = { subtask_id };

        const res = await this.axios.get("/subtask/get", { params });

        return res;
    }

    async create(subtaskObj) {
        const payload = subtaskObj

        const res = await this.axios.post("/subtask/create", payload)

        return res
    }

    async update(updateObj) {
        const payload = updateObj

        const res = await this.axios.post("/subtask/update", payload);

        return res
    }

    async delete(subtask_id) {
        const params = { subtask_id }

        const res = await this.axios.get("/subtask/delete", { params })

        return res
    }
}