import requests
import json

url = "http://localhost:3000/titulo"  # coloque aqui a URL da sua API

payload = {
    "link": "https://youtu.be/Pm2VGpQ3VB4"
}

headers = {
    "Content-Type": "application/json"
}

print("Enviando requisição...")
response = requests.post(url, data=json.dumps(payload), headers=headers)

print("\nStatus Code:", response.status_code)

try:
    print("Resposta JSON:")
    print(response.json())
except:
    print("Resposta bruta:")
    print(response.text)
