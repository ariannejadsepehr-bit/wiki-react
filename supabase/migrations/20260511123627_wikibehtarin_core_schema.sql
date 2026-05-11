
/*
  # WikiBehtarin Core Schema

  ## Overview
  Complete enterprise-grade Persian business directory platform database schema.

  ## Tables Created
  1. profiles - Extended user profiles linked to auth.users
  2. provinces - Iranian provinces
  3. cities - Cities within provinces
  4. categories - Business categories with hierarchy
  5. businesses - Core business listings
  6. business_branches - Multiple locations per business
  7. business_services - Services offered by businesses
  8. business_hours - Operating hours per day
  9. business_gallery - Photo/video gallery
  10. business_faqs - Frequently asked questions
  11. reviews - User reviews and ratings
  12. review_responses - Business owner responses to reviews
  13. seo_pages - Programmatic SEO landing pages
  14. subscriptions - Business subscription plans
  15. payments - Payment transactions
  16. leads - Contact/inquiry leads
  17. analytics_events - Page/action tracking
  18. ai_content - AI-generated content cache
  19. redirects - URL redirect management
  20. categories_businesses - Many-to-many junction

  ## Security
  - RLS enabled on all tables
  - Policies enforce ownership and role-based access
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- =====================
-- ENUMS
-- =====================

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('guest', 'user', 'business_owner', 'editor', 'seo_manager', 'admin', 'super_admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE business_status AS ENUM ('pending', 'active', 'suspended', 'rejected', 'draft');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE subscription_plan AS ENUM ('free', 'basic', 'premium', 'enterprise');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('active', 'expired', 'cancelled', 'pending');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE payment_gateway AS ENUM ('zarinpal', 'idpay', 'nextpay');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'converted', 'closed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE seo_page_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- =====================
-- PROFILES (extends auth.users)
-- =====================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  avatar_url text,
  role user_role DEFAULT 'user',
  is_verified boolean DEFAULT false,
  email_verified boolean DEFAULT false,
  phone_verified boolean DEFAULT false,
  bio text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Public profiles are viewable"
  ON profiles FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admins can manage all profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('admin', 'super_admin')
    )
  );

-- =====================
-- PROVINCES
-- =====================
CREATE TABLE IF NOT EXISTS provinces (
  id serial PRIMARY KEY,
  name text NOT NULL,
  name_en text,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Provinces are publicly readable"
  ON provinces FOR SELECT USING (true);

CREATE POLICY "Admins can manage provinces"
  ON provinces FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- CITIES
-- =====================
CREATE TABLE IF NOT EXISTS cities (
  id serial PRIMARY KEY,
  province_id integer REFERENCES provinces(id) ON DELETE CASCADE,
  name text NOT NULL,
  name_en text,
  slug text UNIQUE NOT NULL,
  latitude decimal(10,8),
  longitude decimal(11,8),
  is_major boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cities are publicly readable"
  ON cities FOR SELECT USING (true);

CREATE POLICY "Admins can manage cities"
  ON cities FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- CATEGORIES
-- =====================
CREATE TABLE IF NOT EXISTS categories (
  id serial PRIMARY KEY,
  parent_id integer REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  name_en text,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  image_url text,
  color text DEFAULT '#0066CC',
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  seo_title text,
  seo_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'editor'))
  );

-- =====================
-- BUSINESSES
-- =====================
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  name text NOT NULL,
  name_en text,
  slug text UNIQUE NOT NULL,
  description text,
  short_description text,
  status business_status DEFAULT 'pending',
  is_featured boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  is_claimed boolean DEFAULT false,

  -- Location
  city_id integer REFERENCES cities(id) ON DELETE SET NULL,
  province_id integer REFERENCES provinces(id) ON DELETE SET NULL,
  address text,
  postal_code text,
  latitude decimal(10,8),
  longitude decimal(11,8),

  -- Contact
  phone text,
  phone2 text,
  whatsapp text,
  email text,
  website text,

  -- Social Media
  instagram text,
  telegram text,
  linkedin text,
  twitter text,

  -- Media
  logo_url text,
  cover_url text,

  -- Business Details
  founded_year integer,
  employee_count text,
  license_number text,

  -- SEO
  seo_title text,
  seo_description text,
  seo_keywords text[],

  -- Metrics (denormalized for performance)
  review_count integer DEFAULT 0,
  avg_rating decimal(3,2) DEFAULT 0,
  view_count integer DEFAULT 0,
  lead_count integer DEFAULT 0,
  ai_score decimal(5,2) DEFAULT 0,
  ranking_score decimal(10,4) DEFAULT 0,

  -- Subscription
  subscription_plan subscription_plan DEFAULT 'free',
  subscription_expires_at timestamptz,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active businesses are publicly viewable"
  ON businesses FOR SELECT
  USING (status = 'active' OR owner_id = auth.uid());

CREATE POLICY "Business owners can insert their businesses"
  ON businesses FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Business owners can update their businesses"
  ON businesses FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Admins can manage all businesses"
  ON businesses FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'editor'))
  );

-- =====================
-- CATEGORY <-> BUSINESS (Junction)
-- =====================
CREATE TABLE IF NOT EXISTS business_categories (
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  category_id integer REFERENCES categories(id) ON DELETE CASCADE,
  is_primary boolean DEFAULT false,
  PRIMARY KEY (business_id, category_id)
);

ALTER TABLE business_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business categories are publicly readable"
  ON business_categories FOR SELECT USING (true);

CREATE POLICY "Owners can manage their business categories"
  ON business_categories FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- BUSINESS BRANCHES
-- =====================
CREATE TABLE IF NOT EXISTS business_branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  name text NOT NULL,
  address text,
  city_id integer REFERENCES cities(id) ON DELETE SET NULL,
  phone text,
  latitude decimal(10,8),
  longitude decimal(11,8),
  is_main boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE business_branches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Branches are publicly readable"
  ON business_branches FOR SELECT USING (true);

CREATE POLICY "Owners can manage branches"
  ON business_branches FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- BUSINESS SERVICES
-- =====================
CREATE TABLE IF NOT EXISTS business_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price text,
  price_unit text,
  duration text,
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE business_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are publicly readable"
  ON business_services FOR SELECT USING (true);

CREATE POLICY "Owners can manage services"
  ON business_services FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- BUSINESS HOURS
-- =====================
CREATE TABLE IF NOT EXISTS business_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  open_time time,
  close_time time,
  is_closed boolean DEFAULT false,
  UNIQUE (business_id, day_of_week)
);

ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hours are publicly readable"
  ON business_hours FOR SELECT USING (true);

CREATE POLICY "Owners can manage hours"
  ON business_hours FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- BUSINESS GALLERY
-- =====================
CREATE TABLE IF NOT EXISTS business_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  url text NOT NULL,
  thumbnail_url text,
  type text DEFAULT 'image' CHECK (type IN ('image', 'video')),
  title text,
  alt_text text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE business_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery is publicly readable"
  ON business_gallery FOR SELECT USING (true);

CREATE POLICY "Owners can manage gallery"
  ON business_gallery FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- BUSINESS FAQs
-- =====================
CREATE TABLE IF NOT EXISTS business_faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE business_faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "FAQs are publicly readable"
  ON business_faqs FOR SELECT USING (true);

CREATE POLICY "Owners can manage FAQs"
  ON business_faqs FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- REVIEWS
-- =====================
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  body text,
  is_verified boolean DEFAULT false,
  is_approved boolean DEFAULT true,
  is_spam boolean DEFAULT false,
  spam_score decimal(4,3) DEFAULT 0,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved reviews are publicly readable"
  ON reviews FOR SELECT
  USING (is_approved = true AND is_spam = false);

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- REVIEW RESPONSES
-- =====================
CREATE TABLE IF NOT EXISTS review_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES reviews(id) ON DELETE CASCADE,
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE review_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Responses are publicly readable"
  ON review_responses FOR SELECT USING (true);

CREATE POLICY "Owners can manage responses"
  ON review_responses FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- SEO PAGES (Programmatic)
-- =====================
CREATE TABLE IF NOT EXISTS seo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  h1 text NOT NULL,
  meta_title text,
  meta_description text,
  canonical_url text,
  intro text,
  content text,
  faq jsonb DEFAULT '[]',
  schema_data jsonb DEFAULT '{}',
  status seo_page_status DEFAULT 'draft',
  category_id integer REFERENCES categories(id) ON DELETE SET NULL,
  city_id integer REFERENCES cities(id) ON DELETE SET NULL,
  province_id integer REFERENCES provinces(id) ON DELETE SET NULL,
  view_count integer DEFAULT 0,
  is_ai_generated boolean DEFAULT false,
  ai_model text,
  last_generated_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published SEO pages are publicly readable"
  ON seo_pages FOR SELECT
  USING (status = 'published');

CREATE POLICY "Editors and admins can manage SEO pages"
  ON seo_pages FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'editor', 'seo_manager'))
  );

-- =====================
-- SUBSCRIPTIONS
-- =====================
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  plan subscription_plan NOT NULL,
  status subscription_status DEFAULT 'pending',
  started_at timestamptz,
  expires_at timestamptz,
  price integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view their subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE POLICY "Admins can manage subscriptions"
  ON subscriptions FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- PAYMENTS
-- =====================
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  business_id uuid REFERENCES businesses(id) ON DELETE SET NULL,
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount integer NOT NULL,
  currency text DEFAULT 'IRR',
  gateway payment_gateway NOT NULL,
  gateway_ref text,
  gateway_track_id text,
  status payment_status DEFAULT 'pending',
  description text,
  metadata jsonb DEFAULT '{}',
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE POLICY "Users can create payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all payments"
  ON payments FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- =====================
-- LEADS
-- =====================
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  name text,
  phone text,
  email text,
  message text,
  type text DEFAULT 'contact' CHECK (type IN ('contact', 'phone_click', 'whatsapp_click', 'website_click', 'direction')),
  status lead_status DEFAULT 'new',
  source_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view their leads"
  ON leads FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE POLICY "Anyone can create leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- =====================
-- ANALYTICS EVENTS
-- =====================
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  seo_page_id uuid REFERENCES seo_pages(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  session_id text,
  referrer text,
  user_agent text,
  ip_address text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view their analytics"
  ON analytics_events FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE POLICY "Anyone can insert analytics"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

-- =====================
-- AI CONTENT CACHE
-- =====================
CREATE TABLE IF NOT EXISTS ai_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL CHECK (entity_type IN ('business', 'seo_page', 'category', 'faq')),
  entity_id text NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('description', 'seo_title', 'seo_description', 'faq', 'intro', 'summary')),
  content text NOT NULL,
  model text,
  tokens_used integer,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ai_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage AI content"
  ON ai_content FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'editor', 'seo_manager'))
  );

-- =====================
-- REDIRECTS
-- =====================
CREATE TABLE IF NOT EXISTS redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path text UNIQUE NOT NULL,
  to_path text NOT NULL,
  status_code integer DEFAULT 301 CHECK (status_code IN (301, 302)),
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Redirects are publicly readable"
  ON redirects FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage redirects"
  ON redirects FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'seo_manager'))
  );

-- =====================
-- INDEXES FOR PERFORMANCE
-- =====================

CREATE INDEX IF NOT EXISTS idx_businesses_city_id ON businesses(city_id);
CREATE INDEX IF NOT EXISTS idx_businesses_province_id ON businesses(province_id);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_featured ON businesses(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_businesses_ranking ON businesses(ranking_score DESC);
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug);
CREATE INDEX IF NOT EXISTS idx_businesses_owner ON businesses(owner_id);
CREATE INDEX IF NOT EXISTS idx_businesses_name_trgm ON businesses USING gin(name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_reviews_business_id ON reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved, is_spam);

CREATE INDEX IF NOT EXISTS idx_seo_pages_slug ON seo_pages(slug);
CREATE INDEX IF NOT EXISTS idx_seo_pages_city_cat ON seo_pages(city_id, category_id);
CREATE INDEX IF NOT EXISTS idx_seo_pages_status ON seo_pages(status);

CREATE INDEX IF NOT EXISTS idx_analytics_business ON analytics_events(business_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_business ON leads(business_id);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_business ON payments(business_id);

CREATE INDEX IF NOT EXISTS idx_cities_province ON cities(province_id);
CREATE INDEX IF NOT EXISTS idx_cities_slug ON cities(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- =====================
-- SEED: Provinces
-- =====================
INSERT INTO provinces (name, name_en, slug) VALUES
('تهران', 'Tehran', 'tehran'),
('اصفهان', 'Isfahan', 'isfahan'),
('فارس', 'Fars', 'fars'),
('خراسان رضوی', 'Khorasan Razavi', 'khorasan-razavi'),
('البرز', 'Alborz', 'alborz'),
('آذربایجان شرقی', 'East Azerbaijan', 'east-azerbaijan'),
('مازندران', 'Mazandaran', 'mazandaran'),
('گیلان', 'Gilan', 'Gilan'),
('خوزستان', 'Khuzestan', 'khuzestan'),
('کرمانشاه', 'Kermanshah', 'kermanshah')
ON CONFLICT (slug) DO NOTHING;

-- =====================
-- SEED: Cities
-- =====================
INSERT INTO cities (province_id, name, name_en, slug, is_major, latitude, longitude) VALUES
(1, 'تهران', 'Tehran', 'tehran', true, 35.6892, 51.3890),
(2, 'اصفهان', 'Isfahan', 'isfahan', true, 32.6546, 51.6680),
(3, 'شیراز', 'Shiraz', 'shiraz', true, 29.5918, 52.5837),
(4, 'مشهد', 'Mashhad', 'mashhad', true, 36.2605, 59.6168),
(5, 'کرج', 'Karaj', 'karaj', true, 35.8327, 50.9915),
(6, 'تبریز', 'Tabriz', 'tabriz', true, 38.0962, 46.2738),
(7, 'ساری', 'Sari', 'sari', false, 36.5633, 53.0601),
(8, 'رشت', 'Rasht', 'rasht', true, 37.2808, 49.5832),
(9, 'اهواز', 'Ahvaz', 'ahvaz', true, 31.3183, 48.6706),
(10, 'کرمانشاه', 'Kermanshah', 'kermanshah', true, 34.3142, 47.0650),
(1, 'شهر ری', 'Rey', 'rey', false, 35.5939, 51.4353)
ON CONFLICT (slug) DO NOTHING;

-- =====================
-- SEED: Categories
-- =====================
INSERT INTO categories (name, name_en, slug, icon, color, is_featured, sort_order) VALUES
('وکیل', 'Lawyer', 'vakil', 'scale', '#1a4a8a', true, 1),
('پزشک', 'Doctor', 'pezeshk', 'stethoscope', '#16a34a', true, 2),
('رستوران', 'Restaurant', 'restaurant', 'utensils', '#dc2626', true, 3),
('کلینیک زیبایی', 'Beauty Clinic', 'klinik-zibai', 'sparkles', '#db2777', true, 4),
('کاشت مو', 'Hair Transplant', 'kasht-mu', 'scissors', '#9333ea', false, 5),
('مدرسه', 'School', 'madrese', 'graduation-cap', '#0891b2', false, 6),
('آموزشگاه', 'Training Center', 'amuzeshgah', 'book', '#7c3aed', false, 7),
('آرایشگاه', 'Hair Salon', 'arayeshgah', 'scissors', '#ec4899', false, 8),
('خودرو', 'Automobile', 'khodro', 'car', '#374151', false, 9),
('ساختمان', 'Construction', 'sakhteman', 'building', '#92400e', false, 10),
('فروشگاه', 'Shop', 'forushgah', 'shopping-bag', '#065f46', false, 11),
('هتل', 'Hotel', 'hotel', 'hotel', '#1e40af', false, 12),
('داروخانه', 'Pharmacy', 'darukhaneh', 'pill', '#047857', false, 13),
('دندانپزشک', 'Dentist', 'dandanpezeshk', 'smile', '#0369a1', false, 14),
('روانپزشک', 'Psychiatrist', 'ravanpezeshk', 'brain', '#6d28d9', false, 15)
ON CONFLICT (slug) DO NOTHING;

-- =====================
-- TRIGGER: Update business avg_rating on review
-- =====================
CREATE OR REPLACE FUNCTION update_business_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE businesses
  SET
    avg_rating = (
      SELECT COALESCE(AVG(rating::decimal), 0)
      FROM reviews
      WHERE business_id = COALESCE(NEW.business_id, OLD.business_id)
      AND is_approved = true
      AND is_spam = false
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE business_id = COALESCE(NEW.business_id, OLD.business_id)
      AND is_approved = true
      AND is_spam = false
    )
  WHERE id = COALESCE(NEW.business_id, OLD.business_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_business_rating ON reviews;
CREATE TRIGGER trg_update_business_rating
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_business_rating();

-- =====================
-- TRIGGER: Auto-create profile on user signup
-- =====================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, email_verified)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.email_confirmed_at IS NOT NULL), false)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();
