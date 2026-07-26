import joblib
import pandas as pd
import matplotlib.pyplot as plt

# ==========================
# Load Model
# ==========================

model = joblib.load("models/solar_random_forest.pkl")

# ==========================
# Feature Names
# ==========================

features = [
    "Temperature",
    "Prectotland",
    "Rhoa",
    "Irradiance (G)",
    "Irradiance (A)",
    "Cloud"
]

# ==========================
# Feature Importance
# ==========================

importance = model.feature_importances_

importance_df = pd.DataFrame({
    "Feature": features,
    "Importance": importance
})

importance_df = importance_df.sort_values(
    by="Importance",
    ascending=False
)

print("\nFeature Importance\n")
print(importance_df)

# ==========================
# Plot
# ==========================

plt.figure(figsize=(10,6))

plt.bar(
    importance_df["Feature"],
    importance_df["Importance"]
)

plt.title("Random Forest Feature Importance")

plt.xlabel("Environmental Features")

plt.ylabel("Importance")

plt.xticks(rotation=20)

plt.tight_layout()

plt.savefig("models/feature_importance.png")

plt.show()