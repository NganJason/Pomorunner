export class User {
  constructor(axios) {
    this.axios = axios;
  }

  async login(tokenId) {
    const payload = {
      tokenId: tokenId,
    };

    const res = await this.axios.post("/user/login", payload);

    return res;
  }

  async update(updateObj) {
    const payload = updateObj;

    const res = await this.axios.post("/user/update", payload);

    return res;
  }

  async delete(user_id) {
    const params = {
      user_id: user_id,
    };

    const res = await this.axios.get("/user/delete", { params });

    return res;
  }

  async getTasks(user_id, task_date = Date.parse(new Date().toDateString())) {
    const params = {
      user_id: user_id,
      task_date: task_date,
    };

    const res = await this.axios.get("/user/get_tasks", { params });

    return res;
  }

  async checkAuth() {
    const res = await this.axios.get("/user/check_auth");

    return res;
  }
}