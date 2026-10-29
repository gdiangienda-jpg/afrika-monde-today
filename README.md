# AFRIKA MONDE TODAY

Site statique HTML/CSS/JavaScript déployable sur Vercel, avec catalogue YouTube via fonction serverless et administration Supabase.

## Configurer Supabase
1. Crée un projet Supabase.
2. Exécute `supabase/schema.sql` dans le SQL Editor.
3. Dans Authentication > Users, crée le compte administrateur. Désactive les inscriptions publiques si elles ne sont pas nécessaires.
4. Copie l'UUID du compte et exécute la requête commentée à la fin de `supabase/schema.sql` pour l'ajouter à `public.admin_users`.
5. Dans `supabase-config.js`, remplace `YOUR_PROJECT_ID` et `YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY` par l'URL et la clé publishable/anon de ton projet. Ne mets jamais la clé secret/service_role dans le navigateur.
6. Ouvre `/admin.html`, connecte-toi et enregistre le lien du direct. La configuration est persistante dans `site_settings` et protégée par RLS.

## Synchroniser le catalogue YouTube
1. Active YouTube Data API v3 dans Google Cloud et crée une clé API.
2. Dans Vercel > Project Settings > Environment Variables, ajoute `YOUTUBE_API_KEY`. Limite la clé à YouTube Data API v3 et conserve-la côté serveur.
3. Redéploie le site. `/api/youtube` récupère la playlist de vidéos envoyées, les playlists et les directs actifs. La pagination permet de parcourir l'ensemble du catalogue.
4. Le CDN garde les réponses en cache cinq minutes.

Documentation officielle : [Supabase Auth](https://supabase.com/docs/guides/auth), [Supabase JavaScript](https://supabase.com/docs/reference/javascript/installing), [YouTube Data API](https://developers.google.com/youtube/data/reference/rest).

## Vercel
Importer le dépôt GitHub, choisir le preset Other, laisser la commande de build vide et utiliser le répertoire racine comme sortie. Configurer `YOUTUBE_API_KEY`, puis redéployer.

## Sécurité
- La clé publishable/anon Supabase est publique et ne doit être utilisée qu'avec les règles RLS actives.
- La clé secret/service_role Supabase ne doit jamais être mise dans le navigateur.
- Les modifications de `site_settings` sont autorisées uniquement aux UUID inscrits dans `admin_users`.
- La clé YouTube est conservée dans une variable d'environnement Vercel côté serveur.
