/*
  # Create pharmaceutical database schema

  1. New Tables
    - `manufacturers` - Pharmaceutical company information
    - `drugs` - Core drug information with pricing and market data
    - `drug_price_history` - Historical price tracking
    - `drug_predictions` - AI-generated price predictions
    - `regulatory_updates` - Regulatory changes and updates
    - `market_stats` - Market statistics and indicators

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data

  3. Sample Data
    - Insert sample manufacturers, drugs, price history, predictions, and market stats
*/

-- Create manufacturers table
CREATE TABLE IF NOT EXISTS public.manufacturers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text DEFAULT 'India',
  established_year integer,
  website text,
  market_cap_usd bigint,
  employee_count integer,
  who_gmp_certified boolean DEFAULT false,
  fda_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create drugs table
CREATE TABLE IF NOT EXISTS public.drugs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  generic_name text NOT NULL,
  manufacturer_id uuid REFERENCES public.manufacturers(id),
  category text NOT NULL,
  therapeutic_class text,
  dosage_form text,
  strength text,
  pack_size text,
  current_price decimal(10,2) NOT NULL,
  launch_price decimal(10,2),
  mrp decimal(10,2),
  retail_price decimal(10,2),
  wholesale_price decimal(10,2),
  manufacturing_cost decimal(10,2),
  market_share decimal(5,2),
  monthly_volume integer,
  approval_date date,
  regulatory_status text DEFAULT 'Approved',
  patent_status text DEFAULT 'Generic',
  export_markets text[], -- Array of country codes
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create drug price history table
CREATE TABLE IF NOT EXISTS public.drug_price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drug_id uuid REFERENCES public.drugs(id) ON DELETE CASCADE,
  price decimal(10,2) NOT NULL,
  volume integer,
  recorded_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create drug predictions table
CREATE TABLE IF NOT EXISTS public.drug_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drug_id uuid REFERENCES public.drugs(id) ON DELETE CASCADE,
  predicted_price decimal(10,2) NOT NULL,
  prediction_date date NOT NULL,
  confidence_score decimal(3,2), -- 0.00 to 1.00
  model_version text,
  created_at timestamptz DEFAULT now()
);

-- Create regulatory updates table
CREATE TABLE IF NOT EXISTS public.regulatory_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  impact_level text DEFAULT 'Medium', -- Low, Medium, High
  effective_date date,
  source_url text,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create market statistics table
CREATE TABLE IF NOT EXISTS public.market_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value text NOT NULL,
  metric_type text, -- currency, percentage, count, etc.
  category text, -- market_size, growth, export, etc.
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drugs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regulatory_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for reading data (all authenticated users can read)
CREATE POLICY "Anyone can read manufacturers"
  ON public.manufacturers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read drugs"
  ON public.drugs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read drug price history"
  ON public.drug_price_history
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read drug predictions"
  ON public.drug_predictions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read regulatory updates"
  ON public.regulatory_updates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read market stats"
  ON public.market_stats
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_drugs_category ON public.drugs(category);
CREATE INDEX IF NOT EXISTS idx_drugs_manufacturer ON public.drugs(manufacturer_id);
CREATE INDEX IF NOT EXISTS idx_drugs_name ON public.drugs(name);
CREATE INDEX IF NOT EXISTS idx_drug_price_history_drug_id ON public.drug_price_history(drug_id);
CREATE INDEX IF NOT EXISTS idx_drug_price_history_date ON public.drug_price_history(recorded_date);
CREATE INDEX IF NOT EXISTS idx_drug_predictions_drug_id ON public.drug_predictions(drug_id);
CREATE INDEX IF NOT EXISTS idx_regulatory_updates_category ON public.regulatory_updates(category);

-- Insert sample manufacturers
INSERT INTO public.manufacturers (name, country, established_year, website, who_gmp_certified, fda_approved) VALUES
('Cipla Ltd', 'India', 1935, 'https://www.cipla.com', true, true),
('Sun Pharmaceutical Industries', 'India', 1983, 'https://www.sunpharma.com', true, true),
('Dr. Reddy''s Laboratories', 'India', 1984, 'https://www.drreddys.com', true, true),
('Lupin Limited', 'India', 1968, 'https://www.lupin.com', true, true),
('Aurobindo Pharma', 'India', 1986, 'https://www.aurobindo.com', true, true)
ON CONFLICT DO NOTHING;

-- Insert sample drugs data with proper date casting
WITH manufacturer_ids AS (
  SELECT id, name FROM public.manufacturers
)
INSERT INTO public.drugs (
  name, generic_name, manufacturer_id, category, therapeutic_class, 
  dosage_form, strength, pack_size, current_price, launch_price, 
  mrp, retail_price, wholesale_price, manufacturing_cost, 
  market_share, monthly_volume, approval_date, export_markets
)
SELECT 
  'Paracetamol 500mg', 'Acetaminophen', m.id, 'Analgesic', 'Non-opioid analgesic',
  'Tablet', '500mg', '10 tablets', 2.50, 2.00,
  25.00, 22.50, 20.00, 15.00,
  15.2, 50000, DATE '2020-01-15', ARRAY['USA', 'UK', 'Germany', 'Australia']
FROM manufacturer_ids m WHERE m.name = 'Cipla Ltd'
UNION ALL
SELECT 
  'Metformin 500mg', 'Metformin Hydrochloride', m.id, 'Antidiabetic', 'Biguanide',
  'Tablet', '500mg', '15 tablets', 3.20, 2.80,
  48.00, 43.20, 38.40, 28.00,
  18.7, 75000, DATE '2019-03-20', ARRAY['USA', 'Canada', 'Brazil', 'South Africa']
FROM manufacturer_ids m WHERE m.name = 'Sun Pharmaceutical Industries'
UNION ALL
SELECT 
  'Atorvastatin 10mg', 'Atorvastatin Calcium', m.id, 'Cardiovascular', 'HMG-CoA reductase inhibitor',
  'Tablet', '10mg', '10 tablets', 4.50, 5.00,
  45.00, 40.50, 36.00, 25.00,
  22.1, 85000, DATE '2018-07-10', ARRAY['USA', 'Europe', 'Japan', 'Australia']
FROM manufacturer_ids m WHERE m.name = 'Dr. Reddy''s Laboratories'
UNION ALL
SELECT 
  'Amlodipine 5mg', 'Amlodipine Besylate', m.id, 'Cardiovascular', 'Calcium channel blocker',
  'Tablet', '5mg', '10 tablets', 1.80, 2.20,
  18.00, 16.20, 14.40, 10.00,
  19.3, 95000, DATE '2017-11-05', ARRAY['USA', 'UK', 'Canada', 'Australia']
FROM manufacturer_ids m WHERE m.name = 'Dr. Reddy''s Laboratories'
UNION ALL
SELECT 
  'Omeprazole 20mg', 'Omeprazole', m.id, 'Gastrointestinal', 'Proton pump inhibitor',
  'Capsule', '20mg', '10 capsules', 3.80, 4.20,
  38.00, 34.20, 30.40, 22.00,
  16.8, 65000, DATE '2016-09-12', ARRAY['USA', 'Europe', 'Brazil', 'Mexico']
FROM manufacturer_ids m WHERE m.name = 'Lupin Limited'
ON CONFLICT DO NOTHING;

-- Insert sample price history with proper date casting
WITH drug_data AS (
  SELECT id, name FROM public.drugs
)
INSERT INTO public.drug_price_history (drug_id, price, volume, recorded_date)
SELECT 
  d.id, 2.00, 45000, DATE '2020-01-01'
FROM drug_data d WHERE d.name = 'Paracetamol 500mg'
UNION ALL
SELECT 
  d.id, 2.10, 46000, DATE '2020-06-01'
FROM drug_data d WHERE d.name = 'Paracetamol 500mg'
UNION ALL
SELECT 
  d.id, 2.20, 47000, DATE '2021-01-01'
FROM drug_data d WHERE d.name = 'Paracetamol 500mg'
UNION ALL
SELECT 
  d.id, 2.30, 48000, DATE '2021-06-01'
FROM drug_data d WHERE d.name = 'Paracetamol 500mg'
UNION ALL
SELECT 
  d.id, 2.40, 49000, DATE '2022-01-01'
FROM drug_data d WHERE d.name = 'Paracetamol 500mg'
UNION ALL
SELECT 
  d.id, 2.50, 50000, DATE '2022-06-01'
FROM drug_data d WHERE d.name = 'Paracetamol 500mg'
UNION ALL
SELECT 
  d.id, 2.80, 70000, DATE '2019-03-01'
FROM drug_data d WHERE d.name = 'Metformin 500mg'
UNION ALL
SELECT 
  d.id, 2.90, 72000, DATE '2019-09-01'
FROM drug_data d WHERE d.name = 'Metformin 500mg'
UNION ALL
SELECT 
  d.id, 3.00, 73000, DATE '2020-03-01'
FROM drug_data d WHERE d.name = 'Metformin 500mg'
UNION ALL
SELECT 
  d.id, 3.10, 74000, DATE '2020-09-01'
FROM drug_data d WHERE d.name = 'Metformin 500mg'
UNION ALL
SELECT 
  d.id, 3.15, 74500, DATE '2021-03-01'
FROM drug_data d WHERE d.name = 'Metformin 500mg'
UNION ALL
SELECT 
  d.id, 3.20, 75000, DATE '2021-09-01'
FROM drug_data d WHERE d.name = 'Metformin 500mg'
ON CONFLICT DO NOTHING;

-- Insert sample predictions with proper date casting
WITH drug_data AS (
  SELECT id, name FROM public.drugs
)
INSERT INTO public.drug_predictions (drug_id, predicted_price, prediction_date, confidence_score, model_version)
SELECT 
  d.id, 2.60, DATE '2025-01-01', 0.95, 'v1.0'
FROM drug_data d WHERE d.name = 'Paracetamol 500mg'
UNION ALL
SELECT 
  d.id, 2.70, DATE '2025-06-01', 0.92, 'v1.0'
FROM drug_data d WHERE d.name = 'Paracetamol 500mg'
UNION ALL
SELECT 
  d.id, 2.80, DATE '2026-01-01', 0.88, 'v1.0'
FROM drug_data d WHERE d.name = 'Paracetamol 500mg'
UNION ALL
SELECT 
  d.id, 3.30, DATE '2025-01-01', 0.93, 'v1.0'
FROM drug_data d WHERE d.name = 'Metformin 500mg'
UNION ALL
SELECT 
  d.id, 3.40, DATE '2025-06-01', 0.90, 'v1.0'
FROM drug_data d WHERE d.name = 'Metformin 500mg'
UNION ALL
SELECT 
  d.id, 3.50, DATE '2026-01-01', 0.87, 'v1.0'
FROM drug_data d WHERE d.name = 'Metformin 500mg'
UNION ALL
SELECT 
  d.id, 4.40, DATE '2025-01-01', 0.91, 'v1.0'
FROM drug_data d WHERE d.name = 'Atorvastatin 10mg'
UNION ALL
SELECT 
  d.id, 4.30, DATE '2025-06-01', 0.89, 'v1.0'
FROM drug_data d WHERE d.name = 'Atorvastatin 10mg'
UNION ALL
SELECT 
  d.id, 4.20, DATE '2026-01-01', 0.85, 'v1.0'
FROM drug_data d WHERE d.name = 'Atorvastatin 10mg'
ON CONFLICT DO NOTHING;

-- Insert market statistics
INSERT INTO public.market_stats (metric_name, metric_value, metric_type, category) VALUES
('Total Market Size', '50.7 Billion USD', 'currency', 'market_size'),
('Growth Rate', '12.3%', 'percentage', 'growth'),
('Export Value', '24.4 Billion USD', 'currency', 'export'),
('Total Drugs', '3,000+', 'count', 'inventory'),
('Foreign Investment', '8.2 Billion USD', 'currency', 'investment'),
('Regulatory Approvals', '450+', 'count', 'regulatory'),
('Manufacturing Units', '3,000+', 'count', 'manufacturing'),
('Employment Generated', '4.7 Million', 'count', 'employment'),
('Global Ranking', '3rd Largest', 'text', 'ranking'),
('Generic Market Share', '71%', 'percentage', 'market_share')
ON CONFLICT DO NOTHING;

-- Insert regulatory updates with proper date casting
INSERT INTO public.regulatory_updates (title, description, category, impact_level, effective_date, source_url) VALUES
('Drug Price Control Order (DPCO) 2013', 'Comprehensive regulation governing prices of essential medicines in India, covering 348+ drugs under price control', 'Pricing', 'High', DATE '2013-05-15', 'https://cdsco.gov.in/opencms/opencms/en/Drugs/'),
('Foreign Direct Investment (FDI) Policy 2024', '100% FDI allowed in pharmaceutical sector under automatic route with streamlined approval process', 'Investment', 'High', DATE '2024-02-01', 'https://dpiit.gov.in/'),
('Central Drugs Standard Control Organization (CDSCO) Guidelines', 'National regulatory authority for pharmaceuticals with updated guidelines for drug approval and manufacturing', 'Regulatory', 'High', DATE '2024-01-20', 'https://cdsco.gov.in/'),
('Production Linked Incentive (PLI) Scheme', 'Government incentive scheme with INR 15,000 crore allocation for pharmaceutical manufacturing', 'Investment', 'Medium', DATE '2023-12-10', 'https://pharmaceuticals.gov.in/')
ON CONFLICT DO NOTHING;