-- Casa Blanca Restaurant Database Schema for Supabase
-- This schema includes all necessary tables for a complete restaurant website

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled');
CREATE TYPE user_role AS ENUM ('customer', 'staff', 'admin');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    role user_role DEFAULT 'customer',
    avatar_url TEXT,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu categories
CREATE TABLE menu_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_sv TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_de TEXT NOT NULL,
    description_sv TEXT,
    description_en TEXT,
    description_de TEXT,
    slug TEXT UNIQUE NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu items
CREATE TABLE menu_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
    name_sv TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_de TEXT NOT NULL,
    description_sv TEXT,
    description_en TEXT,
    description_de TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    preparation_time INTEGER, -- in minutes
    calories INTEGER,
    is_vegetarian BOOLEAN DEFAULT false,
    is_vegan BOOLEAN DEFAULT false,
    is_gluten_free BOOLEAN DEFAULT false,
    is_popular BOOLEAN DEFAULT false,
    spicy_level INTEGER DEFAULT 0, -- 0-5 scale
    allergens TEXT[], -- array of allergen names
    ingredients TEXT[],
    is_available BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table bookings/reservations
CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    guests INTEGER NOT NULL CHECK (guests > 0 AND guests <= 20),
    message TEXT,
    status booking_status DEFAULT 'pending',
    table_number INTEGER,
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure no double booking for same table at same time
    CONSTRAINT unique_table_datetime UNIQUE (table_number, date, time)
);

-- Restaurant tables
CREATE TABLE restaurant_tables (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    table_number INTEGER UNIQUE NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    location TEXT, -- e.g., 'main dining', 'patio', 'private room'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders (for takeaway/delivery and dine-in)
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT,
    order_type TEXT NOT NULL CHECK (order_type IN ('dine_in', 'takeaway', 'delivery')),
    delivery_address TEXT,
    status order_status DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    delivery_fee DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    payment_status payment_status DEFAULT 'pending',
    payment_method TEXT,
    special_instructions TEXT,
    estimated_ready_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping cart (for logged-in users)
CREATE TABLE cart_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one cart item per user per menu item
    CONSTRAINT unique_user_menu_item UNIQUE (user_id, menu_item_id)
);

-- Reviews and ratings
CREATE TABLE reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Gallery images
CREATE TABLE gallery_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title_sv TEXT,
    title_en TEXT,
    title_de TEXT,
    description_sv TEXT,
    description_en TEXT,
    description_de TEXT,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant settings and configuration
CREATE TABLE restaurant_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Opening hours
CREATE TABLE opening_hours (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday
    open_time TIME,
    close_time TIME,
    is_closed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_day_of_week UNIQUE (day_of_week)
);

-- Special events and promotions
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title_sv TEXT NOT NULL,
    title_en TEXT NOT NULL,
    title_de TEXT NOT NULL,
    description_sv TEXT,
    description_en TEXT,
    description_de TEXT,
    image_url TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    start_time TIME,
    end_time TIME,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff management
CREATE TABLE staff (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    employee_id TEXT UNIQUE NOT NULL,
    position TEXT NOT NULL,
    department TEXT,
    hire_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory management (basic)
CREATE TABLE inventory_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    unit TEXT NOT NULL, -- kg, liter, pieces, etc.
    current_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
    minimum_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
    unit_cost DECIMAL(10,2),
    supplier TEXT,
    last_restocked TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu item ingredients (for inventory tracking)
CREATE TABLE menu_item_ingredients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
    inventory_item_id UUID REFERENCES inventory_items(id) ON DELETE CASCADE,
    quantity_needed DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_menu_ingredient UNIQUE (menu_item_id, inventory_item_id)
);

-- Create indexes for better performance
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_menu_items_popular ON menu_items(is_popular);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_date ON orders(created_at);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_cart_items_user ON cart_items(user_id);
CREATE INDEX idx_reviews_menu_item ON reviews(menu_item_id);
CREATE INDEX idx_reviews_approved ON reviews(is_approved);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_menu_categories_updated_at BEFORE UPDATE ON menu_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_opening_hours_updated_at BEFORE UPDATE ON opening_hours FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_items_updated_at BEFORE UPDATE ON inventory_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Cart policies
CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Users can view approved reviews" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);

-- Public read access for menu and general info
CREATE POLICY "Anyone can view menu categories" ON menu_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view menu items" ON menu_items FOR SELECT USING (is_available = true);
CREATE POLICY "Anyone can view gallery images" ON gallery_images FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view opening hours" ON opening_hours FOR SELECT USING (true);
CREATE POLICY "Anyone can view events" ON events FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view restaurant tables" ON restaurant_tables FOR SELECT USING (is_active = true);

-- Insert sample data
INSERT INTO menu_categories (name_sv, name_en, name_de, slug, sort_order) VALUES
('Förrätter', 'Appetizers', 'Vorspeisen', 'appetizers', 1),
('À la Carte', 'À la Carte', 'À la Carte', 'alacarte', 2),
('Gourmet Pizza', 'Gourmet Pizza', 'Gourmet Pizza', 'pizza', 3),
('Efterrätter', 'Desserts', 'Desserts', 'desserts', 4),
('Drycker', 'Beverages', 'Getränke', 'drinks', 5);

INSERT INTO restaurant_tables (table_number, capacity, location) VALUES
(1, 2, 'main dining'),
(2, 2, 'main dining'),
(3, 4, 'main dining'),
(4, 4, 'main dining'),
(5, 6, 'main dining'),
(6, 8, 'main dining'),
(7, 2, 'patio'),
(8, 4, 'patio'),
(9, 6, 'patio'),
(10, 10, 'private room');

INSERT INTO opening_hours (day_of_week, open_time, close_time) VALUES
(1, '11:00', '22:00'), -- Monday
(2, '11:00', '22:00'), -- Tuesday
(3, '11:00', '22:00'), -- Wednesday
(4, '11:00', '22:00'), -- Thursday
(5, '11:00', '22:00'), -- Friday
(6, '12:00', '23:00'), -- Saturday
(0, '12:00', '23:00'); -- Sunday

INSERT INTO restaurant_settings (key, value, description) VALUES
('restaurant_name', '{"sv": "Casa Blanca", "en": "Casa Blanca", "de": "Casa Blanca"}', 'Restaurant name in different languages'),
('contact_email', '"info@casablanca-trelleborg.se"', 'Main contact email'),
('contact_phone', '"+46 410 123 456"', 'Main contact phone'),
('address', '{"sv": "Corfitz-Beck-Friisgatan 11, Trelleborg", "en": "Corfitz-Beck-Friisgatan 11, Trelleborg", "de": "Corfitz-Beck-Friisgatan 11, Trelleborg"}', 'Restaurant address'),
('delivery_fee', '50', 'Delivery fee in SEK'),
('minimum_order_delivery', '200', 'Minimum order amount for delivery in SEK'),
('tax_rate', '0.25', 'Tax rate (25% VAT in Sweden)'),
('booking_advance_days', '30', 'How many days in advance bookings can be made'),
('max_guests_per_booking', '20', 'Maximum number of guests per booking');

-- Create a function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
    RETURN 'CB' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE order_number_seq START 1;

-- Create a function to automatically set order number
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
        NEW.order_number := generate_order_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for order number generation
CREATE TRIGGER set_order_number_trigger
    BEFORE INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION set_order_number();

-- Create a function to calculate order totals
CREATE OR REPLACE FUNCTION calculate_order_total()
RETURNS TRIGGER AS $$
DECLARE
    order_subtotal DECIMAL(10,2);
    tax_rate DECIMAL(4,4);
    delivery_fee_amount DECIMAL(10,2);
BEGIN
    -- Calculate subtotal from order items
    SELECT COALESCE(SUM(total_price), 0) INTO order_subtotal
    FROM order_items
    WHERE order_id = NEW.order_id;
    
    -- Get tax rate from settings
    SELECT (value::TEXT)::DECIMAL INTO tax_rate
    FROM restaurant_settings
    WHERE key = 'tax_rate';
    
    -- Get delivery fee if applicable
    delivery_fee_amount := 0;
    IF NEW.order_type = 'delivery' THEN
        SELECT (value::TEXT)::DECIMAL INTO delivery_fee_amount
        FROM restaurant_settings
        WHERE key = 'delivery_fee';
    END IF;
    
    -- Update order totals
    UPDATE orders SET
        subtotal = order_subtotal,
        delivery_fee = delivery_fee_amount,
        tax_amount = (order_subtotal + delivery_fee_amount) * tax_rate,
        total_amount = (order_subtotal + delivery_fee_amount) * (1 + tax_rate)
    WHERE id = NEW.order_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for order total calculation
CREATE TRIGGER calculate_order_total_trigger
    AFTER INSERT OR UPDATE OR DELETE ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION calculate_order_total();

-- Comments for documentation
COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE menu_categories IS 'Menu categories with multilingual support';
COMMENT ON TABLE menu_items IS 'Menu items with detailed information and multilingual support';
COMMENT ON TABLE bookings IS 'Table reservations and bookings';
COMMENT ON TABLE restaurant_tables IS 'Restaurant table configuration';
COMMENT ON TABLE orders IS 'Customer orders for dine-in, takeaway, and delivery';
COMMENT ON TABLE order_items IS 'Individual items within an order';
COMMENT ON TABLE cart_items IS 'Shopping cart for logged-in users';
COMMENT ON TABLE reviews IS 'Customer reviews and ratings for menu items';
COMMENT ON TABLE contact_submissions IS 'Contact form submissions from website';
COMMENT ON TABLE newsletter_subscriptions IS 'Email newsletter subscriptions';
COMMENT ON TABLE gallery_images IS 'Restaurant gallery images with multilingual metadata';
COMMENT ON TABLE restaurant_settings IS 'Configuration settings for the restaurant';
COMMENT ON TABLE opening_hours IS 'Restaurant opening hours by day of week';
COMMENT ON TABLE events IS 'Special events and promotions';
COMMENT ON TABLE staff IS 'Staff management and information';
COMMENT ON TABLE inventory_items IS 'Basic inventory management';
COMMENT ON TABLE menu_item_ingredients IS 'Relationship between menu items and inventory items'; 