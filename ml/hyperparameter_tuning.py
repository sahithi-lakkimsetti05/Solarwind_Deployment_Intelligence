import pandas as pd
import joblib

from sklearn.model_selection import (
    train_test_split,
    GridSearchCV
)

from sklearn.ensemble import RandomForestRegressor

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

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
# Train/Test Split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ==========================================
# Parameter Grid
# ==========================================

param_grid = {

    "n_estimators": [100, 200],

    "max_depth": [10, 20, None],

    "min_samples_split": [2, 5],

    "min_samples_leaf": [1, 2]

}

# ==========================================
# Grid Search
# ==========================================

grid_search = GridSearchCV(

    estimator=RandomForestRegressor(
        random_state=42
    ),

    param_grid=param_grid,

    cv=5,

    scoring="r2",

    n_jobs=-1,

    verbose=2

)

print("\nSearching Best Parameters...\n")

grid_search.fit(
    X_train,
    y_train
)

# ==========================================
# Best Model
# ==========================================

best_model = grid_search.best_estimator_

print("\n=============================")
print("Best Parameters")
print("=============================")

print(grid_search.best_params_)

# ==========================================
# Prediction
# ==========================================

predictions = best_model.predict(X_test)

# ==========================================
# Evaluation
# ==========================================

mae = mean_absolute_error(
    y_test,
    predictions
)

rmse = mean_squared_error(
    y_test,
    predictions
) ** 0.5

r2 = r2_score(
    y_test,
    predictions
)

print("\n=============================")
print("Optimized Model Performance")
print("=============================")

print(f"MAE  : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"R²   : {r2:.4f}")

# ==========================================
# Save Model
# ==========================================

joblib.dump(
    best_model,
    "models/solar_random_forest_optimized.pkl"
)

print("\nOptimized Model Saved Successfully!")