import requests

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def get_ai_response(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "mixtral-8x7b-32768",
        "messages": [
            {"role": "system", "content": "You are a helpful customer support agent for an e-commerce clothing store. Ask clarifying questions if necessary before responding."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }
    response = requests.post(GROQ_API_URL, headers=headers, json=data)
    if response.status_code != 200:
        return "Sorry, I couldn't process your request right now."
    return response.json()["choices"][0]["message"]["content"]
