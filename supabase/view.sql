-- Real-time Financial Dashboard View
CREATE MATERIALIZED VIEW financial_dashboard AS
SELECT 
    t.group_id,
    g.name as group_name,
    DATE_TRUNC('month', t.date) as month,
    COUNT(t.id) as total_transactions,
    COUNT(DISTINCT t.created_by) as active_users,
    SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as total_income,
    SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as total_expense,
    SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE -t.amount END) as net_balance,
    -- Category breakdown
    JSON_AGG(
        DISTINCT JSONB_BUILD_OBJECT(
            'category_id', c.id,
            'category_name', c.name,
            'type', c.type,
            'amount', SUM(CASE WHEN t.category_id = c.id THEN t.amount ELSE 0 END)
        )
    ) as category_summary
FROM transactions t
JOIN groups g ON t.group_id = g.id
LEFT JOIN categories c ON t.category_id = c.id
GROUP BY t.group_id, g.name, DATE_TRUNC('month', t.date);

CREATE UNIQUE INDEX idx_financial_dashboard_unique 
ON financial_dashboard(group_id, month);

-- User Activity Summary View
CREATE MATERIALIZED VIEW user_activity_summary AS
SELECT 
    u.id as user_id,
    u.email,
    u.full_name,
    COUNT(DISTINCT gm.group_id) as total_groups,
    COUNT(t.id) as total_transactions,
    SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as total_income_created,
    SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as total_expense_created,
    -- Last activity timestamp
    MAX(t.created_at) as last_activity,
    -- Active groups count
    COUNT(DISTINCT CASE WHEN gm.status = 'active' THEN gm.group_id END) as active_groups
FROM profiles u
LEFT JOIN group_members gm ON u.id = gm.user_id
LEFT JOIN transactions t ON u.id = t.created_by
GROUP BY u.id, u.email, u.full_name;

CREATE UNIQUE INDEX idx_user_activity_summary_unique 
ON user_activity_summary(user_id);


-- Group Health Monitoring View
CREATE MATERIALIZED VIEW group_health_monitor AS
SELECT 
    g.id as group_id,
    g.name as group_name,
    g.created_at,
    COUNT(DISTINCT gm.user_id) as total_members,
    COUNT(DISTINCT CASE WHEN gm.status = 'active' THEN gm.user_id END) as active_members,
    COUNT(t.id) as total_transactions,
    COUNT(t.id) FILTER (WHERE t.date >= CURRENT_DATE - INTERVAL '30 days') as transactions_last_30_days,
    MIN(t.date) as first_transaction_date,
    MAX(t.date) as last_transaction_date,
    -- Financial health metrics
    SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as lifetime_income,
    SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as lifetime_expense,
    -- Monthly average
    AVG(CASE WHEN t.type = 'income' THEN t.amount ELSE NULL END) as avg_income,
    AVG(CASE WHEN t.type = 'expense' THEN t.amount ELSE NULL END) as avg_expense
FROM groups g
LEFT JOIN group_members gm ON g.id = gm.group_id
LEFT JOIN transactions t ON g.id = t.group_id
GROUP BY g.id, g.name, g.created_at;

CREATE UNIQUE INDEX idx_group_health_monitor_unique 
ON group_health_monitor(group_id);


-- Monthly Financial Reports View
CREATE VIEW monthly_financial_reports AS
SELECT 
    g.id as group_id,
    g.name as group_name,
    DATE_TRUNC('month', t.date) as report_month,
    EXTRACT(YEAR FROM t.date) as report_year,
    EXTRACT(MONTH FROM t.date) as report_month_num,
    -- Income breakdown
    SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as total_income,
    SUM(CASE WHEN t.type = 'income' AND c.name = 'Salary' THEN t.amount ELSE 0 END) as salary_income,
    SUM(CASE WHEN t.type = 'income' AND c.name != 'Salary' THEN t.amount ELSE 0 END) as other_income,
    -- Expense breakdown
    SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as total_expense,
    SUM(CASE WHEN t.type = 'expense' AND c.name = 'Food' THEN t.amount ELSE 0 END) as food_expense,
    SUM(CASE WHEN t.type = 'expense' AND c.name = 'Transportation' THEN t.amount ELSE 0 END) as transport_expense,
    SUM(CASE WHEN t.type = 'expense' AND c.name = 'Entertainment' THEN t.amount ELSE 0 END) as entertainment_expense,
    -- Net calculations
    SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE -t.amount END) as net_amount,
    -- Counts
    COUNT(t.id) as transaction_count,
    COUNT(DISTINCT t.created_by) as active_users_count
FROM transactions t
JOIN groups g ON t.group_id = g.id
LEFT JOIN categories c ON t.category_id = c.id
GROUP BY g.id, g.name, DATE_TRUNC('month', t.date), EXTRACT(YEAR FROM t.date), EXTRACT(MONTH FROM t.date)
ORDER BY report_year DESC, report_month_num DESC;


-- User Contribution Analysis View
CREATE VIEW user_contribution_analysis AS
SELECT 
    gm.group_id,
    g.name as group_name,
    u.id as user_id,
    u.email,
    u.full_name,
    gm.role,
    gm.status as member_status,
    -- Contribution metrics
    COUNT(t.id) as total_transactions,
    SUM(t.amount) as total_amount_contributed,
    SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as income_contributed,
    SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as expense_contributed,
    -- Time-based metrics
    MIN(t.created_at) as first_contribution,
    MAX(t.created_at) as last_contribution,
    -- Percentage calculations
    ROUND(
        (SUM(t.amount) / NULLIF(SUM(SUM(t.amount)) OVER (PARTITION BY gm.group_id), 0)) * 100,
        2
    ) as contribution_percentage
FROM group_members gm
JOIN groups g ON gm.group_id = g.id
JOIN profiles u ON gm.user_id = u.id
LEFT JOIN transactions t ON gm.group_id = t.group_id AND gm.user_id = t.created_by
WHERE gm.status = 'active'
GROUP BY gm.group_id, g.name, u.id, u.email, u.full_name, gm.role, gm.status
ORDER BY total_amount_contributed DESC;