// ── Replace this with your deployed Worker URL ────────────────
const WORKER_URL = "https://checkin-api.lihishaul21.workers.dev";

export const api = {
  token: () => localStorage.getItem("token"),
  user:  () => JSON.parse(localStorage.getItem("user") || "null"),

  headers() {
    return { "Content-Type":"application/json",
      Authorization: `Bearer ${this.token()}` };
  },

  async login(username, password) {
    const res = await fetch(`${WORKER_URL}/login`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(
      { username:data.username, role:data.role, dept:data.dept }
    ));
    return data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/index.html";
  },

  async getEmployee(code) {
    const res = await fetch(`${WORKER_URL}/employee?code=${code}`,
      { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async updateStatus(rowIndex, status, location) {
    const res = await fetch(`${WORKER_URL}/update`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ rowIndex, status, location }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getStats() {
    const res = await fetch(`${WORKER_URL}/stats`, { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getLocations() {
    const res = await fetch(`${WORKER_URL}/locations`, { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getUsers() {
    const res = await fetch(`${WORKER_URL}/users`, { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async createUser(username, password, role, dept) {
    const res = await fetch(`${WORKER_URL}/users`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ username, password, role, dept }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },
};

export function requireAuth(minRole = "security") {
  const user = api.user();
  const roles = { security:1, manager:2, admin:3 };
  if (!user || !api.token()) { window.location.href="/index.html"; return null; }
  if ((roles[user.role]||0) < (roles[minRole]||0)) {
    alert("אין לך הרשאה לצפות בעמוד זה");
    window.location.href="/index.html";
    return null;
  }
  return user;
}
