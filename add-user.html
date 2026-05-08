<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>הוספת משתמש</title>
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:-apple-system,BlinkMacSystemFont,sans-serif;
    background:#f0f2f5; min-height:100vh; display:flex;
    justify-content:center; align-items:flex-start; padding:20px; }
  .card { background:white; border-radius:20px; padding:36px 28px;
    width:100%; max-width:460px; margin-top:20px;
    box-shadow:0 8px 32px rgba(0,0,0,0.10); }
  .back-btn { background:none; border:none; color:#007aff;
    font-size:0.9rem; cursor:pointer; padding:0 0 20px;
    display:block; }
  .logo { font-size:2rem; margin-bottom:8px; }
  h1 { font-size:1.4rem; font-weight:700; color:#1a1a1a; margin-bottom:4px; }
  .subtitle { color:#888; font-size:0.9rem; margin-bottom:28px; line-height:1.5; }
  label { display:block; font-size:0.85rem; color:#555;
    font-weight:500; margin-bottom:6px; }
  input, select { width:100%; padding:13px 16px; border:1.5px solid #e0e0e0;
    border-radius:12px; font-size:1rem; outline:none;
    transition:border-color 0.2s; margin-bottom:14px; background:white; }
  input:focus, select:focus { border-color:#007aff; }
  input:disabled, select:disabled { background:#f8f8f8; color:#aaa; }
  .btn { width:100%; padding:16px; border:none; border-radius:14px;
    font-size:1.05rem; font-weight:600; cursor:pointer; margin-top:4px; }
  .btn-submit { background:#007aff; color:white; }
  .btn-submit:hover { background:#0066dd; }
  .btn-submit:disabled { background:#b0c8f0; cursor:not-allowed; }
  .error   { background:#fff0f0; color:#cc0000; border-radius:10px;
    padding:12px 16px; font-size:0.9rem; margin-top:12px;
    display:none; text-align:center; }
  .success-screen { display:none; text-align:center; padding:20px 0; }
  .success-screen .icon { font-size:3rem; margin-bottom:12px; }
  .success-screen h2 { font-size:1.3rem; font-weight:700; margin-bottom:8px; }
  .success-screen p { color:#666; font-size:0.9rem; line-height:1.6;
    margin-bottom:24px; }
  .btn-back-home { background:#f0f2f5; color:#333; }
  .btn-back-home:hover { background:#e4e6e9; }
  .info-note { background:#e8f4fd; color:#0066cc; border-radius:10px;
    padding:12px 14px; font-size:0.85rem; margin-bottom:16px;
    line-height:1.5; border:1px solid #b3d9f7; }
</style>
</head>
<body>
<div class="card">
  <button class="back-btn" onclick="window.location.href='dashboard.html'">
    ⬅ חזרה לדשבורד
  </button>

  <!-- Form -->
  <div id="form-section">
    <div class="logo">➕</div>
    <h1>הוספת משתמש חדש</h1>
    <p class="subtitle">הבקשה תישלח למנהל המערכת לאישור</p>

    <div class="info-note" id="dept-note" style="display:none">
      📌 כמנהל, המשתמש החדש יירשם עם המסגרת שלך אוטומטית
    </div>

    <label>שם מלא</label>
    <input type="text" id="fullName" placeholder="שם פרטי ומשפחה">

    <label>שם משתמש</label>
    <input type="text" id="username" placeholder="שם משתמש לכניסה" autocomplete="off">

    <label>סיסמה</label>
    <input type="password" id="password" placeholder="מינימום 8 תווים">

    <label>אימות סיסמה</label>
    <input type="password" id="password2" placeholder="הכנס סיסמה שוב">

    <label>כתובת אימייל</label>
    <input type="email" id="email" placeholder="your@email.com">

    <label>תפקיד מבוקש</label>
    <select id="requestedRole">
      <option value="security">אבטחה (Security)</option>
      <option value="manager">מנהל (Manager)</option>
      <option value="admin">מנהל מערכת (Admin)</option>
    </select>

    <label>מסגרת</label>
    <input type="text" id="dept" placeholder="מספר או שם מסגרת">

    <button class="btn btn-submit" id="submit-btn" onclick="doSubmit()">
      שלח בקשה לאישור
    </button>
    <div class="error" id="error"></div>
  </div>

  <!-- Success -->
  <div class="success-screen" id="success-screen">
    <div class="icon">✅</div>
    <h2>הבקשה נשלחה!</h2>
    <p>הבקשה התקבלה ומחכה לאישור מנהל המערכת.<br>
       לאחר האישור המשתמש יוכל להתחבר.</p>
    <button class="btn btn-submit" onclick="resetForm()" style="margin-bottom:10px">
      ➕ הוסף משתמש נוסף
    </button>
    <button class="btn btn-back-home" onclick="window.location.href='dashboard.html'">
      ⬅ חזרה לדשבורד
    </button>
  </div>
</div>

<script type="module">
  import { api, requireAuth } from "./js/api.js";

  const user = requireAuth("manager");
  if (!user) throw new Error("not authed");

  // If manager — lock dept to their own
  if (user.role === "manager") {
    const deptInput = document.getElementById("dept");
    deptInput.value    = user.dept || "";
    deptInput.disabled = true;
    document.getElementById("dept-note").style.display = "block";
    // Managers can't request admin
    const roleSelect = document.getElementById("requestedRole");
    const adminOpt = roleSelect.querySelector('option[value="admin"]');
    if (adminOpt) adminOpt.remove();
  }

  window.doSubmit = async function() {
    const fullName      = document.getElementById("fullName").value.trim();
    const username      = document.getElementById("username").value.trim();
    const password      = document.getElementById("password").value;
    const password2     = document.getElementById("password2").value;
    const email         = document.getElementById("email").value.trim();
    const requestedRole = document.getElementById("requestedRole").value;
    const dept          = document.getElementById("dept").value.trim();
    const btn           = document.getElementById("submit-btn");
    const errEl         = document.getElementById("error");

    errEl.style.display = "none";

    if (!fullName||!username||!password||!email) {
      errEl.textContent = "נא למלא את כל השדות";
      errEl.style.display = "block"; return;
    }
    if (password.length < 8) {
      errEl.textContent = "הסיסמה חייבת להכיל לפחות 8 תווים";
      errEl.style.display = "block"; return;
    }
    if (password !== password2) {
      errEl.textContent = "הסיסמאות אינן תואמות";
      errEl.style.display = "block"; return;
    }
    if (!email.includes("@")) {
      errEl.textContent = "כתובת אימייל לא תקינה";
      errEl.style.display = "block"; return;
    }

    btn.disabled = true;
    btn.textContent = "שולח...";

    try {
      await api.signup(username, password, email, fullName, requestedRole, dept);
      document.getElementById("form-section").style.display = "none";
      document.getElementById("success-screen").style.display = "block";
    } catch(e) {
      errEl.textContent = e.message || "שגיאה בשליחת הבקשה";
      errEl.style.display = "block";
      btn.disabled = false;
      btn.textContent = "שלח בקשה לאישור";
    }
  };

  window.resetForm = function() {
    document.getElementById("fullName").value   = "";
    document.getElementById("username").value   = "";
    document.getElementById("password").value   = "";
    document.getElementById("password2").value  = "";
    document.getElementById("email").value      = "";
    if (user.role !== "manager") {
      document.getElementById("dept").value = "";
    }
    document.getElementById("error").style.display  = "none";
    document.getElementById("submit-btn").disabled  = false;
    document.getElementById("submit-btn").textContent = "שלח בקשה לאישור";
    document.getElementById("form-section").style.display   = "block";
    document.getElementById("success-screen").style.display = "none";
  };
</script>
</body>
</html>
