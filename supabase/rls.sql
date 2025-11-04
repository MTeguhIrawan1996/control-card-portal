ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_current_group ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);


CREATE POLICY "Users can view groups they are members of" ON groups
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members 
            WHERE group_members.group_id = groups.id 
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Admins can insert groups" ON groups
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins can update their groups" ON groups
    FOR UPDATE USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM group_members 
            WHERE group_members.group_id = groups.id 
            AND group_members.user_id = auth.uid()
            AND group_members.role = 'admin'
            AND group_members.status = 'active'
        )
    );


CREATE POLICY "Users can view their group memberships" ON group_members
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all members in their groups" ON group_members
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = group_members.group_id
            AND gm.user_id = auth.uid()
            AND gm.role = 'admin'
            AND gm.status = 'active'
        )
    );

CREATE POLICY "Admins can insert group members" ON group_members
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM group_members
            WHERE group_id = group_members.group_id
            AND user_id = auth.uid()
            AND role = 'admin'
            AND status = 'active'
        )
    );


    CREATE POLICY "Users can view categories in their groups" ON categories
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members
            WHERE group_members.group_id = categories.group_id
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Admins can manage categories in their groups" ON categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM group_members
            WHERE group_members.group_id = categories.group_id
            AND group_members.user_id = auth.uid()
            AND group_members.role = 'admin'
            AND group_members.status = 'active'
        )
    );

    CREATE POLICY "Users can view accounts in their groups" ON accounts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members
            WHERE group_members.group_id = accounts.group_id
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Admins can manage accounts in their groups" ON accounts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM group_members
            WHERE group_members.group_id = accounts.group_id
            AND group_members.user_id = auth.uid()
            AND group_members.role = 'admin'
            AND group_members.status = 'active'
        )
    ); 



CREATE POLICY "Users can view transactions in their groups" ON transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members
            WHERE group_members.group_id = transactions.group_id
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can insert transactions in their groups" ON transactions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM group_members
            WHERE group_members.group_id = transactions.group_id
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can update their own transactions" ON transactions
    FOR UPDATE USING (
        created_by = auth.uid() OR
        EXISTS (
            SELECT 1 FROM group_members
            WHERE group_members.group_id = transactions.group_id
            AND group_members.user_id = auth.uid()
            AND group_members.role = 'admin'
            AND group_members.status = 'active'
        )
    );  


CREATE POLICY "Users can view their invitations" ON invitations
    FOR SELECT USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Admins can view invitations for their groups" ON invitations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members
            WHERE group_members.group_id = invitations.group_id
            AND group_members.user_id = auth.uid()
            AND group_members.role = 'admin'
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Admins can manage invitations for their groups" ON invitations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM group_members
            WHERE group_members.group_id = invitations.group_id
            AND group_members.user_id = auth.uid()
            AND group_members.role = 'admin'
            AND group_members.status = 'active'
        )
    ); 

    -- Enable RLS

-- User hanya bisa melihat/mengubah current group mereka sendiri
CREATE POLICY "Users can view own current group" ON user_current_group
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own current group" ON user_current_group
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own current group" ON user_current_group
    FOR INSERT WITH CHECK (auth.uid() = user_id);