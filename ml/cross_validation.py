import pandas as pd
import numpy as np

from sklearn.model_selection import (
    KFold,
    cross_val_score
)

from sklearn.ensemble import RandomForestRegressor

# ==========================================
# Load Dataset
# ==========================================

df = pd.read_csv("dataset/clean_dataset.csv")

X = df[
    [
        "Temperature",
        "Prectotland",
        "Rhoa",
        "Irradiance (G)",
        "Irradiance (A)",
        "Cloud"
    ]
]

y = df["Power"]

# ==========================================
# Model (Original Best Model)
# ==========================================

model = RandomForestRegressor(
    random_state=42
)

# ==========================================
# K-Fold Cross Validation
# ==========================================

kfold = KFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

scores = cross_val_score(
    model,
    X,
    y,
    cv=kfold,
    scoring="r2"
)

# ==========================================
# Results
# ==========================================

print("\n==============================")
print("5-Fold Cross Validation")
print("==============================")

for i, score in enumerate(scores, start=1):
    print(f"Fold {i}: {score:.4f}")

print("\n==============================")
print(f"Average R² : {np.mean(scores):.4f}")
print(f"Std Dev    : {np.std(scores):.4f}")
print("==============================")