
const API_BASE_URL = "http://127.0.0.1:8000";

export async function checkBackend() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      throw new Error("Backend connection failed");
    }

    return await response.json();
  } catch (error) {
    console.error("ScamSense API error:", error);
    throw error;
  }
}
