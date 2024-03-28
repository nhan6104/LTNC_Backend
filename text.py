import json

# Đầu tiên, đọc JSON vào một đối tượng Python
with open('C://Users//Admin//source//repos//LTNC_Backend//data.json', 'r') as file:
    data = json.load(file)

for item in data:
    del item["id"]
    del item["maidenName"]
    del item["image"]
    del item["eyeColor"]
    del item["hair"]
    del item["domain"]
    del item["ip"]
    del item["macAddress"]
    del item["university"]
    del item["bank"]
    del item["company"]
    del item["ein"]
    del item["ssn"]
    del item["userAgent"]
    del item["username"]
    del item["password"]
    del item["crypto"]
    

# Cuối cùng, ghi dữ liệu đã cập nhật vào tệp JSON
with open('C://Users//Admin//source//repos//LTNC_Backend//dataNew.json', 'w') as file:
    json.dump(data, file, indent=4)
    
    