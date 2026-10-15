-- Estrutura do banco usada pelos models (Knex).
-- Requer lc_monetary = pt_BR (veja database/Dockerfile).

CREATE TABLE ru_roles (
    id_role     integer PRIMARY KEY,
    name        varchar(30) NOT NULL,
    description varchar(100)
);

CREATE TABLE users (
    matriculation varchar(30) PRIMARY KEY,
    name          varchar(255) NOT NULL,
    email         varchar(255) NOT NULL UNIQUE,
    password      varchar(64) NOT NULL,
    cpf           varchar(11),
    role          integer NOT NULL DEFAULT 0 REFERENCES ru_roles (id_role)
);

CREATE TABLE ru_food_card (
    cod_ru        varchar(64) PRIMARY KEY,
    matriculation varchar(30) NOT NULL UNIQUE REFERENCES users (matriculation),
    value         money NOT NULL DEFAULT 0,
    created_on    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tokenusers (
    token          varchar(36) PRIMARY KEY,
    "idUser"       varchar(30) NOT NULL REFERENCES users (matriculation),
    expiration     timestamp NOT NULL,
    "useSituation" integer NOT NULL DEFAULT 0
);

CREATE TABLE ru_food_value (
    id          serial PRIMARY KEY,
    name        varchar(30) NOT NULL,
    description varchar(100),
    value       numeric(10, 2) NOT NULL
);

CREATE TABLE ru_order_status_type (
    id_order_status_type integer PRIMARY KEY,
    name                 varchar(30) NOT NULL,
    description          varchar(100),
    created_on           timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_on            timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ru_type_order (
    id_type_order   serial PRIMARY KEY,
    name            varchar(30) NOT NULL,
    description     varchar(100),
    percentage_rate numeric NOT NULL DEFAULT 0,
    flat_rate       money NOT NULL DEFAULT 0,
    created_on      timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_on       timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Uma linha por cobrança Pix (txid gerado pela Efí)
CREATE TABLE ru_purchase_order (
    devedor_txid         varchar(64) PRIMARY KEY,
    matriculation        varchar(30) NOT NULL REFERENCES users (matriculation),
    devedor_loc          integer NOT NULL,
    devedor_cpf          varchar(11),
    devedor_location     varchar(255),
    devedor_valor        money NOT NULL,
    pagamento_cod_pix    text,
    devedor_data_criacao varchar(64),
    expiration           timestamp NOT NULL,
    status               integer NOT NULL DEFAULT 0 REFERENCES ru_order_status_type (id_order_status_type),
    type                 integer NOT NULL REFERENCES ru_type_order (id_type_order),
    created_on           timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- A chave primária em "idPurchaseOrder" impede creditar a mesma cobrança duas vezes
CREATE TABLE ru_movement_history (
    "idPurchaseOrder" varchar(64) PRIMARY KEY REFERENCES ru_purchase_order (devedor_txid),
    idfoodcard        varchar(64) NOT NULL REFERENCES ru_food_card (cod_ru),
    value             money NOT NULL,
    typemove          integer NOT NULL, -- 1 = recarga
    created_on        timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Dados de domínio
INSERT INTO ru_roles (id_role, name, description) VALUES
    (0, 'estudante', 'Recarrega e consulta o próprio cartão'),
    (1, 'administrador', 'Gerencia cartões, valores e usuários');

INSERT INTO ru_order_status_type (id_order_status_type, name, description) VALUES
    (0, 'Pendente', 'Aguardando o pagamento'),
    (1, 'Pago', 'Pagamento confirmado e saldo creditado');

INSERT INTO ru_type_order (name, description) VALUES ('Recarga', 'Recarga do cartão do RU via Pix');

INSERT INTO ru_food_value (name, description, value) VALUES ('Refeição', 'Almoço ou jantar', 2.00);
