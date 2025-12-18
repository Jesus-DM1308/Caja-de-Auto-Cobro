-- ============================================
-- Pharmacy Auto-Cobro Seed Data
-- ============================================

USE pharmacy_autocobro;

-- ============================================
-- Insert Default Branch
-- ============================================
INSERT INTO branches (name, address, phone, latitude, longitude, is_active) VALUES
('Farmacia Principal', 'Av. Principal #123, Ciudad', '555-0100', 19.432608, -99.133209, TRUE);

-- ============================================
-- Insert Active Ingredients
-- ============================================
INSERT INTO active_ingredients (name, description) VALUES
('Paracetamol', 'Analgésico y antipirético'),
('Ibuprofeno', 'Antiinflamatorio no esteroideo'),
('Ácido Ascórbico', 'Vitamina C'),
('Amoxicilina', 'Antibiótico betalactámico'),
('Omeprazol', 'Inhibidor de la bomba de protones'),
('Losartán', 'Antagonista de receptores de angiotensina II'),
('Metformina', 'Antidiabético oral'),
('Atorvastatina', 'Inhibidor de HMG-CoA reductasa'),
('Loratadina', 'Antihistamínico de segunda generación'),
('Ranitidina', 'Antagonista H2'),
('Diclofenaco', 'Antiinflamatorio no esteroideo'),
('Naproxeno', 'Antiinflamatorio no esteroideo'),
('Carisoprodol', 'Relajante muscular de acción central');

-- ============================================
-- Insert Medications (from frontend)
-- ============================================
INSERT INTO medications (name, description, price, image_url, pharmaceutical_company, is_bestseller, requires_prescription) VALUES
('Salpifar 500mg', 'Analgésico y antipirético', 100.00, 'images/paracetamol_pisa.jpg', 'Pisa', TRUE, FALSE),
('Dolprofen 400mg', 'Antiinflamatorio no esteroideo', 100.00, 'images/ibuprofeno400mg_collins.jpeg', 'Collins', TRUE, FALSE),
('Vitamina C 1000mg', 'Suplemento vitamínico', 100.00, 'images/vitaminaC1000mg_naturallife.jpg', 'Natural Life', TRUE, FALSE),
('Amoxicilina 500mg', 'Antibiótico de amplio espectro', 100.00, 'images/amoxicilina500mg_pisa.jpg', 'Pisa', TRUE, TRUE),
('Omeprazol 40mg', 'Inhibidor de la bomba de protones', 100.00, 'images/omeprazol40mg_amsa.png', 'Amsa', FALSE, FALSE),
('Losartán 50mg', 'Antihipertensivo', 100.00, 'images/losartan50mg_pisa.jpeg', 'Pisa', FALSE, TRUE),
('Metformina 850mg', 'Antidiabético oral', 100.00, 'images/metformina850mg_amsa.jpg', 'Amsa', FALSE, TRUE),
('Teinemia 20mg', 'Reductor de colesterol', 100.00, 'images/teinemia20mg_pisa.jpg', 'Pisa', FALSE, TRUE),
('Laritol 10mg', 'Antihistamínico', 100.00, 'images/laritol_maver.jpg', 'Maver', FALSE, FALSE),
('Ranitidina 300mg', 'Antiulceroso y antiácido', 100.00, 'images/ranitidina300mg_amsa.png', 'Amsa', FALSE, FALSE),
('Diclofenaco 50mg', 'Antiinflamatorio potente', 100.00, 'images/diclofenaco50mg_amsa.png', 'Amsa', FALSE, FALSE),
('Caridoxen', 'Relajante muscular con analgésico', 100.00, 'images/caridoxen_mavi.jpg', 'Mavi', FALSE, TRUE);

-- ============================================
-- Link Medications with Active Ingredients
-- ============================================
INSERT INTO medication_ingredients (medication_id, ingredient_id) VALUES
-- Salpifar 500mg
(1, 1),
-- Dolprofen 400mg
(2, 2),
-- Vitamina C 1000mg
(3, 3),
-- Amoxicilina 500mg
(4, 4),
-- Omeprazol 40mg
(5, 5),
-- Losartán 50mg
(6, 6),
-- Metformina 850mg
(7, 7),
-- Teinemia 20mg
(8, 8),
-- Laritol 10mg
(9, 9),
-- Ranitidina 300mg
(10, 10),
-- Diclofenaco 50mg
(11, 11),
-- Caridoxen (multiple ingredients)
(12, 12),
(12, 13);

-- ============================================
-- Insert Medication Details
-- ============================================
INSERT INTO medication_details (medication_id, instructions, warnings, side_effects, contraindications) VALUES
(1, 'Tomar 1 tableta cada 6-8 horas. No exceder 4 gramos al día.', 
    'No consumir con alcohol. Consultar al médico en caso de enfermedad hepática.', 
    'Náuseas, reacciones alérgicas en casos raros.', 
    'Alergia al paracetamol, enfermedad hepática grave.'),

(2, 'Tomar 1 tableta cada 8 horas con alimentos.', 
    'No usar en caso de úlcera gástrica. Evitar durante el embarazo.', 
    'Malestar estomacal, mareos, dolor de cabeza.', 
    'Úlcera péptica activa, tercer trimestre del embarazo.'),

(3, 'Tomar 1 tableta al día preferentemente con alimentos.', 
    'Dosis altas pueden causar malestar estomacal.', 
    'Diarrea, náuseas en dosis altas.', 
    'Ninguna conocida en dosis normales.'),

(4, 'Tomar 1 cápsula cada 8 horas durante 7-10 días. Completar el tratamiento.', 
    'No usar si es alérgico a penicilinas. Consultar al médico durante el embarazo.', 
    'Diarrea, náuseas, erupciones cutáneas.', 
    'Alergia a penicilinas o cefalosporinas.'),

(5, 'Tomar 1 cápsula en ayunas, 30 minutos antes del desayuno.', 
    'Uso prolongado puede afectar la absorción de vitamina B12 y magnesio.', 
    'Dolor de cabeza, diarrea, náuseas.', 
    'Alergia a inhibidores de bomba de protones.'),

(6, 'Tomar 1 tableta al día a la misma hora.', 
    'No recomendado para mujeres embarazadas. Puede causar mareos al inicio.', 
    'Mareos, fatiga, hipotensión.', 
    'Embarazo, lactancia, estenosis arterial renal bilateral.'),

(7, 'Tomar 1 tableta con alimentos, 2-3 veces al día según indicación médica.', 
    'Puede causar malestar gastrointestinal. No consumir alcohol.', 
    'Diarrea, náuseas, sabor metálico.', 
    'Insuficiencia renal, acidosis metabólica.'),

(8, 'Tomar 1 tableta al día, preferentemente por la noche.', 
    'Evitar consumo excesivo de toronja. Reportar dolor muscular inusual.', 
    'Dolor muscular, dolor de cabeza, náuseas.', 
    'Enfermedad hepática activa, embarazo, lactancia.'),

(9, 'Tomar 1 tableta al día. No causa somnolencia en la mayoría de personas.', 
    'Consultar al médico si tiene enfermedad hepática.', 
    'Dolor de cabeza, somnolencia leve (raro).', 
    'Alergia a loratadina.'),

(10, 'Tomar 1 tableta 30 minutos antes de las comidas o al acostarse.', 
    'Consultar al médico si los síntomas persisten más de 2 semanas.', 
    'Dolor de cabeza, mareos, estreñimiento.', 
    'Porfiria aguda, alergia a ranitidina.'),

(11, 'Tomar 1 tableta cada 8-12 horas con alimentos.', 
    'No usar en caso de úlcera gástrica. Evitar durante el embarazo y lactancia.', 
    'Malestar estomacal, mareos, erupciones cutáneas.', 
    'Úlcera péptica, tercer trimestre del embarazo.'),

(12, 'Tomar 1 tableta cada 8 horas. Tratamiento no debe exceder 2-3 semanas.', 
    'Puede causar somnolencia. No conducir ni operar maquinaria. No consumir alcohol.', 
    'Somnolencia, mareos, náuseas.', 
    'Porfiria aguda, miastenia gravis, embarazo.');

-- ============================================
-- Insert Initial Inventory
-- ============================================
INSERT INTO inventory (medication_id, branch_id, quantity, min_stock) VALUES
(1, 1, 100, 20),
(2, 1, 80, 20),
(3, 1, 60, 15),
(4, 1, 50, 15),
(5, 1, 70, 15),
(6, 1, 45, 10),
(7, 1, 55, 10),
(8, 1, 40, 10),
(9, 1, 65, 15),
(10, 1, 50, 10),
(11, 1, 45, 10),
(12, 1, 35, 10);

-- ============================================
-- Insert Admin User
-- Password: admin123 (hashed with bcrypt)
-- ============================================
INSERT INTO users (username, email, password_hash, role, branch_id, is_active) VALUES
('admin', 'admin@farmacia.com', '$2a$10$YourHashedPasswordHere', 'admin', 1, TRUE);

-- Note: The password hash will be generated properly when creating users via the API
-- For initial setup, you should use the API endpoint to create the first admin user
