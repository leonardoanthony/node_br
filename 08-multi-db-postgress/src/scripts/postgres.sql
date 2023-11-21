DROP TABLE IF EXISTS TB_HEROIS;

CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
);

INSERT INTO TB_HEROIS (NOME, PODER)
VALUES
    ('Flash', 'Velocidade'),
    ('Aquaman', 'Falar com os animais'),
    ('Batman', 'Dinheiro');

SELECT * FROM TB_HEROIS;
SELECT * FROM TB_HEROIS WHERE NOME = 'Flash';


UPDATE TB_HEROIS
SET NOME = 'Goku', PODER = 'Sayajin'
WHERE ID = 2;

DELETE FROM TB_HEROIS WHERE ID = 2;

