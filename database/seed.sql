-- Usuários fictícios para desenvolvimento. Senha de ambos: senha123
INSERT INTO users (matriculation, name, email, password, cpf, role) VALUES
    ('2023000001', 'Estudante Demo', 'estudante@exemplo.com', '$2b$10$u6wS1pxPz6pO6ryGbiZbIuLG8UqCffgI.89JD5fGnQq2axGPSv3gG', '12345678909', 0),
    ('2023000002', 'Admin Demo', 'admin@exemplo.com', '$2b$10$u6wS1pxPz6pO6ryGbiZbIuLG8UqCffgI.89JD5fGnQq2axGPSv3gG', '12345678909', 1);

INSERT INTO ru_food_card (cod_ru, matriculation, value) VALUES
    ('RU-0001', '2023000001', '10,00'),
    ('RU-0002', '2023000002', '0,00');
