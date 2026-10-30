# Portfolio – Divine Etoundé

Next.js 15 · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion

Site bilingue (français / anglais), avec mode clair et sombre, aux couleurs rose poudré.

**Sections :** Accueil · À propos · Compétences · Réalisations · Services · Contact

## Lancer en local (VS Code)

1. Installe Node.js 20 ou plus : https://nodejs.org
2. Ouvre le dossier du projet dans VS Code, puis le terminal (Terminal > Nouveau terminal).
3. Installe les dépendances : `npm install`
4. Crée le fichier `.env.local` en copiant `.env.example` (voir « Formulaire de contact » plus bas).
5. Lance le site : `npm run dev`, puis ouvre http://localhost:3000

Après chaque modification de `.env.local` ou de `next.config.mjs`, arrête le serveur (Ctrl+C) et relance `npm run dev`.

## Où modifier tes informations

| Je veux modifier… | Fichier |
| --- | --- |
| Nom, photo, lien du CV, e-mail, WhatsApp, LinkedIn, GitHub | `src/data/site.ts` |
| Tous les textes (français `fr` et anglais `en`) : présentation, compétences, réalisations, services, contact | `src/data/content.ts` |
| Les couleurs (clair et sombre) | `src/app/globals.css` |
| Le favicon | `src/app/icon.svg` |
| La photo | `public/photo-divine.jpg` (même nom) ou le chemin dans `site.ts` |
| Le CV | `public/CV_Divine_ETOUNDE.pdf` (même nom) ou `cvUrl` dans `site.ts` |

- Une chaîne vide (`""`) dans `site.ts` masque le lien correspondant.
- Le bouton FR/EN change la langue, et le choix est mémorisé.
- Le bouton « Mon CV » du haut de page ouvre le PDF.

## Images des services

Les illustrations sont dans `public/images/services/` : six fichiers, dans l'ordre des services. Pour mettre tes propres images, remplace-les en gardant le même nom, ou change les chemins dans `src/components/Services.tsx`. Si tu ajoutes un service dans `content.ts`, ajoute aussi son image dans la liste de ce fichier.

## Formulaire de contact

Le formulaire envoie les messages par e-mail avec Resend.

1. Crée un compte gratuit sur https://resend.com, **avec l'adresse où tu veux recevoir les messages**.
2. Dans « API Keys », crée une clé avec la permission « Sending access » et copie-la tout de suite : elle ne s'affiche qu'une fois.
3. Dans `.env.local` :

   ```
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   RESEND_API_KEY=re_ta_cle_complete
   CONTACT_TO_EMAIL=etoundedivine0@gmail.com
   CONTACT_FROM=Portfolio <onboarding@resend.dev>
   ```

   Pas d'espaces autour du `=`, pas de guillemets. Ne partage jamais ta clé, et ne l'envoie jamais sur GitHub (`.env.local` est ignoré par `.gitignore`).
4. Relance `npm run dev` et envoie un message de test.

**Bon à savoir**
- Sans domaine vérifié sur Resend, les e-mails ne peuvent être envoyés qu'à l'adresse de ton compte Resend.
- Le serveur limite à 5 messages par 10 minutes et par visiteur sur le site en ligne. Cette limite est désactivée en local.
- Si Resend n'est pas configuré ou refuse l'envoi, le formulaire essaie le service FormSubmit (la première fois, il envoie un e-mail d'activation à confirmer), puis ouvre la messagerie du visiteur avec le message déjà rédigé.
- En cas de problème, regarde le terminal : les lignes commençant par `[contact]` donnent la raison exacte.

### Design de l'e-mail reçu

L'e-mail est en rose poudré, avec un bouton « Répondre ». Il est défini dans `src/app/api/contact/route.ts` (fonction `emailHtml`).

### Signature pour tes réponses

Ouvre `email-signature.html` dans ton navigateur, sélectionne la signature (Ctrl+A), copie-la (Ctrl+C) et colle-la dans Gmail : Paramètres > Voir tous les paramètres > Signature.

## Déployer sur Vercel

1. Mets le projet sur GitHub.
2. Sur https://vercel.com : New Project, puis importe le dépôt.
3. Dans Settings > Environment Variables, ajoute les 4 variables de `.env.local`, avec `NEXT_PUBLIC_SITE_URL` égal à l'adresse finale du site.
4. Clique sur Deploy.

## Optionnel

- **Image de partage** (aperçu sur WhatsApp, LinkedIn…) : ajoute `src/app/opengraph-image.png`.
- **Nom de domaine** : avec un domaine à toi, tu peux le vérifier sur Resend pour envoyer des e-mails depuis ton adresse et des confirmations automatiques à tes visiteurs.