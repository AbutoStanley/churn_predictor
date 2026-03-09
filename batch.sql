CREATE TABLE prediction_batches (
    id SERIAL PRIMARY KEY,
    batch_name VARCHAR(100),
    total_customers INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);