import pandas as pd
import matplotlib.pyplot as plt
import joblib

from sklearn.model_selection import train_test_split

# ==========================
# Load Dataset
# ==========================

df = pd.read_csv(
    "dataset/clean_dataset.csv"
)

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

# ==========================
# Train/Test Split
# ==========================

_, X_test, _, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ==========================
# Load Model
# ==========================

model = joblib.load(
    "models/solar_random_forest.pkl"
)

predictions = model.predict(X_test)

# ==========================
# Scatter Plot
# ==========================

plt.figure(figsize=(8,8))

plt.scatter(
    y_test,
    predictions,
    alpha=0.7
)

plt.plot(
    [y_test.min(), y_test.max()],
    [y_test.min(), y_test.max()],
    color="red",
    linewidth=2
)

plt.xlabel("Actual Power")

plt.ylabel("Predicted Power")

plt.title("Actual vs Predicted Power")

plt.tight_layout()

plt.savefig(
    "models/actual_vs_predicted.png"
)

plt.show()