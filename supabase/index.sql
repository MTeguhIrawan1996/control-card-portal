-- Untuk query filtering yang sering digunakan
CREATE INDEX idx_transactions_group_type_date 
ON transactions(group_id, type, date DESC);

CREATE INDEX idx_transactions_group_category 
ON transactions(group_id, category_id, date DESC);

CREATE INDEX idx_transactions_group_account 
ON transactions(group_id, account_id, date DESC);

-- Untuk search transactions
CREATE INDEX idx_transactions_description 
ON transactions USING gin (description gin_trgm_ops);

-- Untuk date range queries
CREATE INDEX idx_transactions_date_range 
ON transactions(group_id, date);

-- Hanya transaksi aktif
CREATE INDEX idx_transactions_active 
ON transactions(group_id, date) 
WHERE date >= CURRENT_DATE - INTERVAL '1 year';

-- Hanya pending invitations
CREATE INDEX idx_invitations_pending 
ON invitations(group_id, status) 
WHERE status = 'pending';

-- Hanya active group members
CREATE INDEX idx_group_members_active 
ON group_members(group_id, user_id) 
WHERE status = 'active';

-- Untuk case-insensitive search
CREATE INDEX idx_profiles_email_lower 
ON profiles(LOWER(email));

-- Untuk monthly summary queries
CREATE INDEX idx_transactions_monthly 
ON transactions(group_id, DATE_TRUNC('month', date), type);

-- Untuk yearly reports
CREATE INDEX idx_transactions_yearly 
ON transactions(group_id, EXTRACT(YEAR FROM date), type);

-- Untuk slow query monitoring
CREATE INDEX idx_transactions_created_at_desc 
ON transactions(created_at DESC);

-- Untuk audit purposes
CREATE INDEX idx_audit_transactions 
ON transactions(created_by, created_at);

-- Untuk data retention policies
CREATE INDEX idx_transactions_old_data 
ON transactions(date) 
WHERE date < CURRENT_DATE - INTERVAL '2 years';

-- Untuk vacuum optimization
CREATE INDEX idx_transactions_for_vacuum 
ON transactions(created_at) 
WHERE created_at < CURRENT_DATE - INTERVAL '1 month';

-- Untuk statistics collection
CREATE INDEX idx_stats_collection 
ON transactions(group_id, date, type);

-- Untuk current group
CREATE INDEX idx_user_current_group_user_id ON user_current_group(user_id);
CREATE INDEX idx_user_current_group_group_id ON user_current_group(group_id);