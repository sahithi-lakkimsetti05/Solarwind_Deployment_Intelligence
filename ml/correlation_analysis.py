import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# ==========================================
# Load Dataset
# ==========================================

df = pd.read_csv("dataset/clean_dataset.csv")

# ==========================================
# Correlation Matrix
# ==========================================

corr = df.corr(numeric_only=True)

print("\nCorrelation Matrix\n")
print(corr)

# ==========================================
# Plot Heatmap
# ==========================================

plt.figure(figsize=(10,8))

sns.heatmap(
    corr,
    annot=True,
    cmap="coolwarm",
    fmt=".2f",
    linewidths=0.5
)

plt.title("Correlation Matrix")

plt.tight_layout()

plt.savefig(
    "models/correlation_matrix.png",
    dpi=300
)

print("\nCorrelation matrix saved successfully!")

plt.show()