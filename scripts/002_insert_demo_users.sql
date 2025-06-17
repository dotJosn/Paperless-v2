-- Inserir usuários de demonstração
-- Nota: Estes usuários devem ser criados primeiro no Supabase Auth
-- através do painel administrativo ou via API

-- Atualizar perfis dos usuários de demonstração
-- (assumindo que os usuários já foram criados no auth.users)

-- Admin
INSERT INTO public.user_profiles (id, name, role, status)
VALUES 
  ('admin-uuid-here', 'Admin User', 'admin', 'active')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  status = EXCLUDED.status;

-- Programador
INSERT INTO public.user_profiles (id, name, role, status)
VALUES 
  ('programmer-uuid-here', 'Carlos Santos', 'programmer', 'active')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  status = EXCLUDED.status;

-- Operador
INSERT INTO public.user_profiles (id, name, role, status)
VALUES 
  ('operator-uuid-here', 'João Silva', 'operator', 'active')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  status = EXCLUDED.status;
