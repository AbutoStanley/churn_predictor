CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    customer_identifier VARCHAR(100),
    
    tenure INTEGER,
    monthly_charges NUMERIC,
    total_charges NUMERIC,

    contract_type VARCHAR(50),
    payment_method VARCHAR(50),
    internet_service VARCHAR(50),

    support_tickets INTEGER,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);