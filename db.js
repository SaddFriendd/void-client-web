const API = "https://void-client-api.insane44gaming.workers.dev";

async function loginUser(username, password) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return await res.json();
}

async function registerUser(username, password, key) {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, key })
  });
  return await res.json();
}

async function getUploads() {
  const res = await fetch(`${API}/uploads`);
  return await res.json();
}

async function adminGetUsers(adminPass) {
  const res = await fetch(`${API}/admin/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminPass })
  });
  return await res.json();
}

async function adminGetKeys(adminPass) {
  const res = await fetch(`${API}/admin/keys`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminPass })
  });
  return await res.json();
}

async function adminAddKey(adminPass, key) {
  const res = await fetch(`${API}/admin/addkey`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminPass, key })
  });
  return await res.json();
}

async function adminDeleteUser(adminPass, username) {
  const res = await fetch(`${API}/admin/deleteuser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminPass, username })
  });
  return await res.json();
}

async function adminAddUpload(adminPass, name, version, url) {
  const res = await fetch(`${API}/admin/uploads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminPass, name, version, url })
  });
  return await res.json();
}
