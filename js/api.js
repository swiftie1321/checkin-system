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
    if (data.pendingMessage) {
      localStorage.setItem("pendingMessage", data.pendingMessage);
    }
    return data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("pendingMessage");
    window.location.href = "index.html";
  },

  async getEmployee(code) {
    const res = await fetch(`${WORKER_URL}/employee?code=${code}`,
      { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async updateStatus(rowIndex, status, location, isWarningStay = false) {
    const res = await fetch(`${WORKER_URL}/update`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ rowIndex, status, location, isWarningStay }),
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

  async editUser(rowIndex, role, dept, message) {
    const res = await fetch(`${WORKER_URL}/user/edit`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ rowIndex, role, dept, message }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async deleteUser(rowIndex, reason) {
    const res = await fetch(`${WORKER_URL}/user`, {
      method:"DELETE", headers: this.headers(),
      body: JSON.stringify({ rowIndex, reason }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async restoreUser(rowIndex, role, dept) {
    const res = await fetch(`${WORKER_URL}/user/restore`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ rowIndex, role, dept }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async warnDeletedScan(code, username) {
    const res = await fetch(`${WORKER_URL}/deleted/warn`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ code, username }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getUserHistory(username) {
    const res = await fetch(
      `${WORKER_URL}/user/history?username=${encodeURIComponent(username)}`,
      { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async addEmployee(name, dept, svc) {
    const res = await fetch(`${WORKER_URL}/addEmployee`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ name, dept, svc }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async deleteDepartment(dept) {
    const res = await fetch(`${WORKER_URL}/department`, {
      method:"DELETE", headers: this.headers(),
      body: JSON.stringify({ dept }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getMessage() {
    const res = await fetch(`${WORKER_URL}/message`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async setMessage(message) {
    const res = await fetch(`${WORKER_URL}/message`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async leaveScanMessage(code, employeeName, previousStatus, newStatus, message) {
    const res = await fetch(`${WORKER_URL}/scanmessage`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ code, employeeName, previousStatus, newStatus, message }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async signup(username, password, email, fullName, requestedRole, dept) {
    const res = await fetch(`${WORKER_URL}/signup`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ username, password, email, fullName, requestedRole, dept }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getPending() {
    const res = await fetch(`${WORKER_URL}/pending`, { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async approvePending(rowIndex, approvedRole, dept) {
    const res = await fetch(`${WORKER_URL}/pending/approve`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ rowIndex, approvedRole, dept }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async rejectPending(rowIndex) {
    const res = await fetch(`${WORKER_URL}/pending/reject`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ rowIndex }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getPendingCount() {
    const res = await fetch(`${WORKER_URL}/pending/count`, { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getAuditLog() {
    const res = await fetch(`${WORKER_URL}/auditlog`, { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getTempAccess() {
    const res = await fetch(`${WORKER_URL}/tempaccess`, { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async requestTempAccess(reason) {
    const res = await fetch(`${WORKER_URL}/tempaccess/request`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ reason }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async approveTempAccess(rowIndex) {
    const res = await fetch(`${WORKER_URL}/tempaccess/approve`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ rowIndex }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async rejectTempAccess(rowIndex) {
    const res = await fetch(`${WORKER_URL}/tempaccess/reject`, {
      method:"POST", headers: this.headers(),
      body: JSON.stringify({ rowIndex }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getTempAccessMine() {
    const res = await fetch(`${WORKER_URL}/tempaccess/mine`, { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },
};

export function requireAuth(minRole = "security") {
  const user = api.user();
  const roles = { security:1, manager:2, admin:3 };
  if (!user || !api.token()) {
    window.location.href = "index.html";
    return null;
  }
  if ((roles[user.role]||0) < (roles[minRole]||0)) {
    alert("אין לך הרשאה לצפות בעמוד זה");
    window.location.href = "index.html";
    return null;
  }
  return user;
}
