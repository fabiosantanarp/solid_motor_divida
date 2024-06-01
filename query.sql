CREATE DATABASE motor_divida;
CREATE TABLE motor_divida.debits (
    uuid VARCHAR(36) NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    PRIMARY KEY (uuid)
);