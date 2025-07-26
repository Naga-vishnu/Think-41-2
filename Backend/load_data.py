# ✅ Updated load_data.py

import zipfile
import os
import pandas as pd
from app.db import SessionLocal, engine
from app.models import Product, Base

# Step 1: Extract ZIP
zip_path = "C:\Users\G NAGAVISHNU\Downloads\archive (1).zip"
extract_dir = "C:\Users\G NAGAVISHNU\OneDrive\Documents\Desktop\Think41(2)\Backend"
os.makedirs(extract_dir, exist_ok=True)

with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(extract_dir)

# Step 2: Read CSV (assuming only 1 CSV inside)
csv_file = next((f for f in os.listdir(extract_dir) if f.endswith('.csv')), None)
csv_path = os.path.join(extract_dir, csv_file)

# Step 3: Load into database
Base.metadata.create_all(bind=engine)

df = pd.read_csv(csv_path)

db = SessionLocal()
for _, row in df.iterrows():
    product = Product(
        name=row['name'],
        category=row['category'],
        price=row['price'],
        stock=row['stock']
    )
    db.add(product)

db.commit()
db.close()
