import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

# STEP 1: Simulated Dataset (Replace with real data if you have)
def generate_dataset(n=1000):
    np.random.seed(42)
    data = {
        'packet_rate': np.random.randint(100, 2000, size=n),
        'avg_packet_size': np.random.randint(40, 1500, size=n),
        'syn_count': np.random.randint(10, 500, size=n),
        'label': np.random.choice([0, 1], size=n, p=[0.7, 0.3])  # 0: normal, 1: attack
    }
    return pd.DataFrame(data)

# STEP 2: Load or create dataset
df = generate_dataset()

# STEP 3: Split data
X = df[['packet_rate', 'avg_packet_size', 'syn_count']]
y = df['label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# STEP 4: Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# STEP 5: Evaluate model
y_pred = model.predict(X_test)
print("Classification Report:\n", classification_report(y_test, y_pred))

# STEP 6: Save model as pickle file
joblib.dump(model, 'model/dos_rf_model.pkl')
print("✅ Model saved as dos_rf_model.pkl")
