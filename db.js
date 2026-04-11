const API = "https://void-client-api.insane44gaming.workers.dev";

// ── Existing endpoints ───────────────────────────────────────────────────────

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

/**
 * Delete a registered user by MC username.
 * The worker will also un-use their key so it can be re-activated.
 */
async function adminDeleteUser(adminPass, mcUsername) {
  const res = await fetch(`${API}/admin/deleteuser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminPass, mcUsername })
  });
  return await res.json();
}

/**
 * Fully revoke a key — removes it from keys.json and removes
 * any user entry bound to it. Use when you want to invalidate
 * a compromised or shared key.
 */
async function adminRevokeKey(adminPass, key) {
  const res = await fetch(`${API}/admin/revokekey`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminPass, key })
  });
  return await res.json();
}
