import pandas as pd

# ==========================
# Load Dataset
# ==========================

df = pd.read_csv(
    "dataset/Lahore_Single_Panel_Dataset_with_Meteorological_Datas.csv"
)

print("Original Shape:", df.shape)

# ==========================
# Remove Night-Time Records
# ==========================

df = df[df["Power"] > 0]

print("After Removing Night Records:", df.shape)

# ==========================
# Select Features
# ==========================

features = [
    "Temperature",
    "Prectotland",
    "Rhoa",
    "Irradiance (G)",
    "Irradiance (A)",
    "Cloud"
]

target = "Power"

X = df[features]

y = df[target]

print("\nFeatures")

print(X.head())

print("\nTarget")

print(y.head())

# ==========================
# Save Clean Dataset
# ==========================

df.to_csv(
    "dataset/clean_dataset.csv",
    index=False
)

print("\nClean dataset saved successfully.")