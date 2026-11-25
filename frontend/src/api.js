
const API_BASE_URL = "http://127.0.0.1:8000";

export async function analyzeContent(content) {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content })
  });

  if (!response.ok) {
    throw new Error("Unable to analyse content.");
  }

  return await response.json();
}
