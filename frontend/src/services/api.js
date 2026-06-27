const API_URL = "https://api.yourdomain.com";

export async function saveMatch(match) {
  return fetch(`${API_URL}/matches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(match)
  });
}