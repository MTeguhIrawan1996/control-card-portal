-- File: supabase/migrations/013_current_group_functions.sql

-- Function untuk set current group
CREATE OR REPLACE FUNCTION set_user_current_group(
  user_uuid UUID,
  group_uuid UUID
)
RETURNS void AS $$
BEGIN
  -- Check jika user adalah member dari group tersebut
  IF NOT EXISTS (
    SELECT 1 FROM group_members 
    WHERE user_id = user_uuid 
    AND group_id = group_uuid 
    AND status = 'active'
  ) THEN
    RAISE EXCEPTION 'User is not a member of this group';
  END IF;

  INSERT INTO user_current_group (user_id, group_id)
  VALUES (user_uuid, group_uuid)
  ON CONFLICT (user_id)
  DO UPDATE SET 
    group_id = EXCLUDED.group_id,
    last_accessed = NOW(),
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function untuk get current group
CREATE OR REPLACE FUNCTION get_user_current_group(user_uuid UUID)
RETURNS TABLE (
  group_id UUID,
  group_name TEXT,
  group_description TEXT,
  user_role TEXT,
  member_count INTEGER,
  last_accessed TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    g.id,
    g.name,
    g.description,
    gm.role,
    (SELECT COUNT(*) FROM group_members WHERE group_id = g.id AND status = 'active'),
    ucg.last_accessed
  FROM user_current_group ucg
  JOIN groups g ON ucg.group_id = g.id
  JOIN group_members gm ON g.id = gm.group_id AND gm.user_id = user_uuid
  WHERE ucg.user_id = user_uuid
  AND gm.status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function untuk get user's groups dengan current group flag
CREATE OR REPLACE FUNCTION get_user_groups_with_current(user_uuid UUID)
RETURNS TABLE (
  group_id UUID,
  group_name TEXT,
  group_description TEXT,
  user_role TEXT,
  member_count INTEGER,
  is_current_group BOOLEAN,
  last_accessed TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    g.id,
    g.name,
    g.description,
    gm.role,
    (SELECT COUNT(*) FROM group_members WHERE group_id = g.id AND status = 'active'),
    (ucg.group_id = g.id),
    ucg.last_accessed
  FROM groups g
  JOIN group_members gm ON g.id = gm.group_id
  LEFT JOIN user_current_group ucg ON ucg.user_id = user_uuid
  WHERE gm.user_id = user_uuid
  AND gm.status = 'active'
  ORDER BY ucg.last_accessed DESC NULLS LAST, g.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;