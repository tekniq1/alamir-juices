-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS offers CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS site_content CASCADE;

-- 2. Categories Table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  tagline_ar TEXT,
  tagline_en TEXT,
  emoji TEXT,
  accent TEXT
);

-- 3. Products Table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES categories(id) ON DELETE CASCADE,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  base_price NUMERIC NOT NULL,
  kg_price NUMERIC,
  size_price JSONB,
  calories INTEGER DEFAULT 0,
  carbs INTEGER DEFAULT 0,
  image TEXT,
  color TEXT,
  rating NUMERIC DEFAULT 5.0,
  in_stock BOOLEAN DEFAULT true,
  tags JSONB
);

-- 4. Offers Table
CREATE TABLE offers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  discount TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  emoji TEXT
);

-- 5. Site Settings Table (Single Row)
CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  whatsapp TEXT,
  phone TEXT,
  maps_link TEXT,
  working_hours_ar TEXT,
  working_hours_en TEXT
);

-- 6. Site Content Table (Single Row)
CREATE TABLE site_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_title_ar TEXT,
  hero_title_en TEXT,
  hero_desc_ar TEXT,
  hero_desc_en TEXT,
  about_title_ar TEXT,
  about_title_en TEXT,
  about_story_ar TEXT,
  about_story_en TEXT
);

-- 7. Insert Initial Categories
INSERT INTO categories (id, name_ar, name_en, tagline_ar, tagline_en, emoji, accent) VALUES
('juices', 'العصائر', 'Juices', 'عصائر طازجة يومياً', 'Fresh daily juices', '🧃', 'mango'),
('sandwiches', 'السندوتشات', 'Sandwiches', 'وجبات خفيفة شهية', 'Light & tasty bites', '🥪', 'primary'),
('hot_drinks', 'المشروبات الساخنة', 'Hot Drinks', 'دفء في كل كوب', 'Warmth in every cup', '☕', 'berry'),
('fruits', 'الفواكه', 'Fruits', 'بالحبة والكيلو', 'By piece or by kilo', '🍎', 'lime');

-- 8. Insert Initial Products
INSERT INTO products (id, category_id, name_ar, name_en, description_ar, description_en, base_price, calories, carbs, image, color, rating, in_stock, tags) VALUES
('j104', 'juices', 'مانجو طبيعي', 'Natural Mango', 'مانجو طبيعي طازج.', 'Fresh natural mango juice.', 500, 150, 35, 'mango', 'mango', 4.9, true, '[{"ar":"الأكثر مبيعاً","en":"Best seller"}]'),
('j122', 'juices', 'أفوكادو', 'Avocado', 'أفوكادو كريمي طازج.', 'Fresh creamy avocado.', 800, 310, 18, 'avocado', 'lime', 4.9, true, '[{"ar":"توقيع الأمير","en":"Signature"}]'),
('j152', 'juices', 'برتقال', 'Orange', 'برتقال طازج.', 'Fresh orange juice.', 500, 110, 26, 'orange', 'mango', 4.9, true, '[{"ar":"الأكثر مبيعاً","en":"Best seller"}]'),
('j114', 'juices', 'فراولة', 'Strawberry', 'فراولة طازجة.', 'Fresh strawberry juice.', 400, 120, 28, 'strawberry', 'berry', 4.8, true, '[]');

-- 9. Insert Initial Offers
INSERT INTO offers (id, title, discount, status, emoji) VALUES
('o1', 'عرض الجمعة', '20%', 'active', '🔥'),
('o2', 'عرض العائلة الكبير', '1+2', 'ending_soon', '👨‍👩‍👧‍👦'),
('o3', 'اشتراك الموظفين الشهري', '900 ر.ي', 'upcoming', '💼');

-- 10. Insert Initial Settings & Content
INSERT INTO site_settings (whatsapp, phone, maps_link, working_hours_ar, working_hours_en) VALUES
('967776655876', '+967 776 655 876', 'https://maps.app.goo.gl/UPmkHrs8SMTnCn2Q6', 'يومياً من 8 صباحاً إلى 12 منتصف الليل', 'Daily from 8 AM to 12 AM');

INSERT INTO site_content (hero_title_ar, hero_title_en, hero_desc_ar, hero_desc_en, about_title_ar, about_title_en, about_story_ar, about_story_en) VALUES
('الأمير.. ملك العصائر', 'Alamir.. King of Juices', 'عصائر طبيعية ومزيج فريد محضر خصيصاً لك.', 'Premium fresh juices blended to order and delivered chilled.', 'عن الأمير', 'About Alamir', 'بدأت قصة من شغفنا بتقديم عصائر طبيعية ومزيج من الطبيعة في كأس...', 'We bring you the essence of nature in a cup...');

-- Note: In a real production setup, you would enable RLS (Row Level Security)
-- and create policies. For now, since this is a public frontend, we leave it open for read.
-- But let's create a simple read policy to be safe if RLS is enabled:
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);
