// Configuration publique uniquement. La clé publishable/anon peut être exposée avec RLS correctement activé.
// Ne place JAMAIS la clé Supabase secret/service_role dans ce fichier.
window.AMT_SUPABASE_CONFIG = {
  url: "https://YOUR_PROJECT_ID.supabase.co",
  anonKey: "YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY"
};