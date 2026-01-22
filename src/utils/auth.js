const LS_USERS = "medilink_users";
const LS_SESSION = "medilink_session";

/* =====================
   USERS
===================== */
export function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS)) || [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

/* =====================
   SESSION
===================== */
export function setSession(session) {
  localStorage.setItem(LS_SESSION, JSON.stringify(session));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(LS_SESSION));
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(LS_SESSION);
}

/* =====================
   ADMIN DEMO
===================== */
export const ADMIN_DEMO = {
  email: "admin@medilink.com",
  password: "admin123",
};
