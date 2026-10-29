# AFRIKA MONDE TODAY — Site web

Site vitrine responsive en HTML/CSS/JavaScript, prêt pour un déploiement statique sur Vercel.

## YouTube
- Chaîne officielle : https://www.youtube.com/@AfrikaMondeToday
- Toutes les vidéos : https://www.youtube.com/@AfrikaMondeToday/videos
- Onglet Direct : https://www.youtube.com/@AfrikaMondeToday/live

Le site contient un lien vers la chaîne et une section vidéo intégrée. L'extraction complète des vidéos et playlists n'a pas pu être vérifiée automatiquement depuis la seule URL. Pour un catalogue synchronisé (titres, miniatures, playlists et nouvelles publications), connecter l'API YouTube Data avec une clé API ou fournir les URL/IDs des playlists officielles. Les cartes de programmes dans `index.html` restent des exemples à remplacer par les programmes confirmés.

## Administration du direct
`admin.html` est un panneau de préparation du lien de direct. Il télécharge un fichier `site-settings.json` qui doit être ajouté au dépôt GitHub, puis redéployé sur Vercel. Cette version n'est PAS une authentification sécurisée et ne permet pas une mise à jour en direct sans redéploiement. Ne saisissez aucun mot de passe dans ce panneau.

Pour un espace réellement sécurisé avec connexion et stockage persistant, il faut intégrer Supabase/Firebase avec authentification et règles d'accès côté serveur avant mise en production.

## Déploiement Vercel
1. Connecter le dépôt GitHub à Vercel.
2. Framework Preset : Other.
3. Laisser la commande de build vide et utiliser la racine comme sortie.
4. Déployer.

## À compléter
- Remplacer les actualités et programmes de démonstration par les contenus réels.
- Ajouter les liens officiels Facebook, Instagram, TikTok et WhatsApp.
- Configurer une API YouTube pour synchroniser tout le catalogue.
