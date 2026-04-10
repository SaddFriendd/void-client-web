// db.js - GitHub as Database
const DB_REPO = "YOUR_GITHUB_USERNAME/void-client-db";
const DB_TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN";
const API = "https://api.github.com";

async function getFile(filename) {
  const res = await fetch(`${API}/repos/${DB_REPO}/contents/${filename}`, {
    headers: {
      Authorization: `token ${DB_TOKEN}`,
      Accept: "application/vnd.github.v3+json"
    }
  });
  const data = await res.json();
  const content = atob(data.content.replace(/\n/g, ""));
  return { data: JSON.parse(content), sha: data.sha };
}

async function saveFile(filename, content, sha) {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));
  await fetch(`${API}/repos/${DB_REPO}/contents/${filename}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${DB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: `update ${filename}`,
      content: encoded,
      sha: sha
    })
  });
}

async function getUsers() { return await getFile("users.json"); }
async function getKeys()  { return await getFile("keys.json");  }

async function validateKey(inputKey) {
  const { data: keys, sha } = await getKeys();
  const keyObj = keys.find(k => k.key === inputKey && !k.used);
  if (!keyObj) return false;
  // Mark key as used
  keyObj.used = true;
  keyObj.usedAt = new Date().toISOString();
  await saveFile("keys.json", keys, sha);
  return true;
}

async function registerUser(username, password) {
  const { data: users, sha } = await getUsers();
  if (users.find(u => u.username === username)) return { ok: false, msg: "Username already taken." };
  users.push({
    username,
    password: btoa(password), // basic encoding, not true hashing
    registeredAt: new Date().toISOString()
  });
  await saveFile("users.json", users, sha);
  return { ok: true };
}

async function loginUser(username, password) {
  const { data: users } = await getUsers();
  const user = users.find(u => u.username === username && u.password === btoa(password));
  return user ? { ok: true, user } : { ok: false, msg: "Invalid username or password." };
}
