CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_groups_updated_at 
    BEFORE UPDATE ON groups 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_group_members_updated_at 
    BEFORE UPDATE ON group_members 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at 
    BEFORE UPDATE ON categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at 
    BEFORE UPDATE ON accounts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at 
    BEFORE UPDATE ON transactions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invitations_updated_at 
    BEFORE UPDATE ON invitations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_account_balance_on_transaction
    AFTER INSERT OR UPDATE OR DELETE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_account_balance();


    -- Trigger untuk transactions table
CREATE TRIGGER smart_refresh_after_transaction
    AFTER INSERT OR UPDATE OR DELETE ON transactions
    FOR EACH STATEMENT 
    WHEN (EXTRACT(HOUR FROM CURRENT_TIME) BETWEEN 0 AND 6) -- Refresh hanya di jam tertentu
    EXECUTE FUNCTION conditional_view_refresh();

-- Trigger untuk group changes
CREATE TRIGGER refresh_after_group_change
    AFTER INSERT OR UPDATE OR DELETE ON group_members
    FOR EACH STATEMENT 
    EXECUTE FUNCTION conditional_view_refresh();

-- Trigger untuk batch processing
CREATE TRIGGER batch_refresh_after_hours
    AFTER INSERT OR UPDATE OR DELETE ON transactions
    FOR EACH STATEMENT 
    WHEN (EXTRACT(HOUR FROM CURRENT_TIME) BETWEEN 2 AND 4) -- Batch refresh di jam sepi
    EXECUTE FUNCTION refresh_all_materialized_views();
    

-- Trigger untuk Set current group otomatis ketika user join group baru
CREATE TRIGGER trigger_auto_set_current_group
    AFTER INSERT ON group_members
    FOR EACH ROW
    WHEN (NEW.status = 'active')
    EXECUTE FUNCTION auto_set_current_group();


-- Trigger: Update last_accessed ketika user berinteraksi dengan group
CREATE TRIGGER trigger_update_group_access
    AFTER INSERT ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_group_access_time();

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();