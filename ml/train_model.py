import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)

# ==========================
# Load Clean Dataset
# ==========================

df = pd.read_csv(
    "dataset/clean_dataset.csv"
)

# ==========================
# Features
# ==========================

X = df[
    [
        "Temperature",
        "Prectotland",
        "Rhoa",
        "Irradiance (G)",
        "Irradiance (A)",
        "Cloud",
    ]
]

# ==========================
# Target
# ==========================

y = df["Power"]

# ==========================
# Train/Test Split
# ==========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

print("Training Samples :", len(X_train))
print("Testing Samples  :", len(X_test))

# ==========================
# Train Model
# ==========================

model = RandomForestRegressor(
    n_estimators=200,
    random_state=42,
)

model.fit(X_train, y_train)

print("\nModel Training Completed!")

# ==========================
# Prediction
# ==========================

predictions = model.predict(X_test)

# ==========================
# Evaluation
# ==========================

mae = mean_absolute_error(y_test, predictions)
rmse = mean_squared_error(y_test, predictions) ** 0.5
r2 = r2_score(y_test, predictions)

print("\n==============================")
print("Model Evaluation")
print("==============================")

print(f"MAE  : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"R²   : {r2:.4f}")

# ==========================
# Save Model
# ==========================

joblib.dump(
    model,
    "models/solar_random_forest.pkl"
)

print("\nModel Saved Successfully!")