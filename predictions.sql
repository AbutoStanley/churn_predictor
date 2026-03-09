CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,

    batch_id INTEGER REFERENCES prediction_batches(id),
    customer_id INTEGER REFERENCES customers(id),

    churn_probability NUMERIC,
    churn_prediction BOOLEAN,

    shap_values JSONB,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);