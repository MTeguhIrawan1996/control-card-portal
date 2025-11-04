-- File: supabase/migrations/014_current_group_triggers.sql

-- Trigger: Auto set current group ketika user join group pertama kali
CREATE OR REPLACE FUNCTION auto_set_initial_current_group()
RETURNS TRIGGER AS $$
BEGIN
  -- Jika user tidak memiliki current group, set group yang baru dijoin
  IF NEW.status = 'active' AND NOT EXISTS (
    SELECT 1 FROM user_current_group WHERE user_id = NEW.user_id
  ) THEN
    INSERT INTO user_current_group (user_id, group_id)
    VALUES (NEW.user_id, NEW.group_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_set_initial_current_group
  AFTER INSERT ON group_members
  FOR EACH ROW
  EXECUTE FUNCTION auto_set_initial_current_group();

-- Trigger: Update last_accessed ketika user berinteraksi dengan group
CREATE OR REPLACE FUNCTION update_current_group_access()
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

CREATE TRIGGER trigger_update_current_group_access
  AFTER INSERT OR UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_current_group_access();

CREATE TRIGGER trigger_update_current_group_access_categories
  AFTER INSERT OR UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_current_group_access();

CREATE TRIGGER trigger_update_current_group_access_accounts
  AFTER INSERT OR UPDATE ON accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_current_group_access();