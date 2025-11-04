CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_account_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.type = 'income' THEN
            UPDATE accounts SET balance = balance + NEW.amount WHERE id = NEW.account_id;
        ELSE
            UPDATE accounts SET balance = balance - NEW.amount WHERE id = NEW.account_id;
        END IF;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Remove old amount
        IF OLD.type = 'income' THEN
            UPDATE accounts SET balance = balance - OLD.amount WHERE id = OLD.account_id;
        ELSE
            UPDATE accounts SET balance = balance + OLD.amount WHERE id = OLD.account_id;
        END IF;
        
        -- Add new amount
        IF NEW.type = 'income' THEN
            UPDATE accounts SET balance = balance + NEW.amount WHERE id = NEW.account_id;
        ELSE
            UPDATE accounts SET balance = balance - NEW.amount WHERE id = NEW.account_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.type = 'income' THEN
            UPDATE accounts SET balance = balance - OLD.amount WHERE id = OLD.account_id;
        ELSE
            UPDATE accounts SET balance = balance + OLD.amount WHERE id = OLD.account_id;
        END IF;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_groups(user_id UUID)
RETURNS TABLE (
    group_id UUID,
    group_name TEXT,
    user_role TEXT,
    member_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        g.id,
        g.name,
        gm.role,
        (SELECT COUNT(*) FROM group_members WHERE group_id = g.id AND status = 'active')
    FROM groups g
    JOIN group_members gm ON g.id = gm.group_id
    WHERE gm.user_id = get_user_groups.user_id AND gm.status = 'active';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_group_financial_summary(group_id UUID)
RETURNS TABLE (
    total_income DECIMAL,
    total_expense DECIMAL,
    balance DECIMAL,
    transaction_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0),
        COUNT(*)
    FROM transactions
    WHERE transactions.group_id = get_group_financial_summary.group_id;
END;
$$ LANGUAGE plpgsql;

-- Function untuk refresh semua materialized views
CREATE OR REPLACE FUNCTION refresh_all_materialized_views()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY financial_dashboard;
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_activity_summary;
    REFRESH MATERIALIZED VIEW CONCURRENTLY group_health_monitor;
END;
$$ LANGUAGE plpgsql;

-- Scheduled refresh function
CREATE OR REPLACE FUNCTION scheduled_view_refresh()
RETURNS void AS $$
BEGIN
    -- Refresh setiap hari jam 2 pagi
    IF EXTRACT(HOUR FROM CURRENT_TIME) = 2 THEN
        PERFORM refresh_all_materialized_views();
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function untuk conditional refresh
CREATE OR REPLACE FUNCTION conditional_view_refresh()
RETURNS TRIGGER AS $$
BEGIN
    -- Refresh hanya jika perubahan signifikan
    IF TG_OP = 'INSERT' OR TG_OP = 'DELETE' OR 
       (TG_OP = 'UPDATE' AND (OLD.amount != NEW.amount OR OLD.date != NEW.date)) THEN
        PERFORM refresh_all_materialized_views();
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


-- Function untuk mendapatkan current group user
CREATE OR REPLACE FUNCTION get_user_current_group(user_uuid UUID)
RETURNS UUID AS $$
DECLARE
    current_group_id UUID;
BEGIN
    SELECT group_id INTO current_group_id
    FROM user_current_group
    WHERE user_id = user_uuid;
    
    RETURN current_group_id;
END;
$$ LANGUAGE plpgsql;

-- Function untuk set current group
CREATE OR REPLACE FUNCTION set_user_current_group(
    user_uuid UUID,
    group_uuid UUID
)
RETURNS void AS $$
BEGIN
    INSERT INTO user_current_group (user_id, group_id)
    VALUES (user_uuid, group_uuid)
    ON CONFLICT (user_id)
    DO UPDATE SET 
        group_id = EXCLUDED.group_id,
        last_accessed = NOW(),
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function untuk get current group dengan detail
CREATE OR REPLACE FUNCTION get_user_current_group_details(user_uuid UUID)
RETURNS TABLE (
    group_id UUID,
    group_name TEXT,
    group_description TEXT,
    user_role TEXT,
    member_count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        g.id,
        g.name,
        g.description,
        gm.role,
        (SELECT COUNT(*) FROM group_members WHERE group_id = g.id AND status = 'active')
    FROM groups g
    JOIN group_members gm ON g.id = gm.group_id
    LEFT JOIN user_current_group ucg ON g.id = ucg.group_id
    WHERE gm.user_id = user_uuid 
    AND gm.status = 'active'
    AND ucg.user_id = user_uuid
    ORDER BY ucg.last_accessed DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Set current group otomatis ketika user join group baru
CREATE OR REPLACE FUNCTION auto_set_current_group()
RETURNS TRIGGER AS $$
BEGIN
    -- Jika user tidak memiliki current group, set group yang baru dijoin
    IF NOT EXISTS (
        SELECT 1 FROM user_current_group WHERE user_id = NEW.user_id
    ) THEN
        PERFORM set_user_current_group(NEW.user_id, NEW.group_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update last_accessed ketika user berinteraksi dengan group
CREATE OR REPLACE FUNCTION update_group_access_time()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE user_current_group
    SET last_accessed = NOW(),
        updated_at = NOW()
    WHERE user_id = NEW.created_by
    AND group_id = NEW.group_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;