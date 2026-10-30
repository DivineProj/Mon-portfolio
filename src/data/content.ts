/**
 * ✏️ TOUS LES TEXTES DU SITE, EN FRANÇAIS ET EN ANGLAIS.
 * Modifie les deux versions (fr et en) pour qu'elles restent identiques en sens.
 */
export type Lang = "fr" | "en";

const fr = {
  role: "Développeuse web et mobile",
  metaDescription: "Portfolio de Divine Etoundé, développeuse informatique : sites web, applications web et mobiles, API et bases de données.",
  common: { skip: "Aller au contenu", theme: "Changer de thème clair ou sombre", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu", lang: "Switch to English", langShort: "EN", mainNav: "Navigation principale", mobileNav: "Menu mobile" },
  nav: { home: "Accueil", about: "À propos", skills: "Compétences", work: "Réalisations", services: "Services", contact: "Contact", cta: "Discutons de votre projet" },
  hero: { tagline: "Je conçois des solutions numériques utiles, performantes et pensées pour les utilisateurs.", seeWork: "Découvrir mes réalisations", contactMe: "Me contacter", cv: "Mon CV", cvMissing: "CV à ajouter", photoAlt: "Portrait de Divine Etoundé" },
  about: {
    title: "À propos",
    paragraphs: [
      "Je suis développeuse informatique et j’aime transformer un besoin concret en outil que l’on utilise vraiment au quotidien.",
      "Je travaille sur le web et sur mobile, de la conception des bases de données jusqu’à l’interface. Mon objectif : des solutions simples à prendre en main et faciles à faire évoluer.",
    ],
  },
  skills: {
    title: "Compétences",
    groups: [
      { title: "Front-end", text: "Interfaces claires et responsives.", items: [{ name: "HTML5" }, { name: "CSS3" }, { name: "JavaScript" }, { name: "React" }, { name: "Next.js" }] },
      { title: "Back-end", text: "Logique métier et API.", items: [{ name: "PHP" }, { name: "Laravel" }, { name: "API REST" }] },
      { title: "Développement mobile", text: "Applications multiplateformes.", items: [{ name: "Flutter" }] },
      { title: "Bases de données", text: "Modélisation et requêtes.", items: [{ name: "PostgreSQL" }, { name: "MySQL" }] },
      { title: "Outils et collaboration", text: "Versionner et travailler en équipe.", items: [{ name: "Git" }, { name: "GitHub" }] },
      { title: "Design et community", text: "Visuels et présence sur les réseaux sociaux.", items: [{ name: "Canva" }, { name: "Community management" }, { name: "Réseaux sociaux" }] },
    ] as { title: string; text: string; items: { name: string; level?: string }[] }[],
  },
  work: {
    title: "Réalisations",
    intro: "Les types de projets que je conçois pour des entreprises et des particuliers. Cliquez sur un type pour voir ce qu’il peut inclure.",
    includes: "Ce que cela peut inclure", stack: "Technologies possibles",
    items: [
      { title: "Site vitrine", text: "Présenter votre activité avec un site clair, rapide et professionnel.", includes: ["Pages sur mesure", "Affichage adapté au mobile", "Formulaire de contact", "Bases du référencement (SEO)"], stack: ["HTML5", "CSS3", "JavaScript", "Next.js"] },
      { title: "Portfolio", text: "Mettre en valeur un parcours, des compétences et des réalisations.", includes: ["Présentation du profil", "Galerie de projets", "CV à télécharger", "Mode clair et sombre"], stack: ["React", "Next.js", "CSS3"] },
      { title: "Application de gestion", text: "Suivre et organiser vos données au quotidien.", includes: ["Gestion des utilisateurs et des accès", "Tableaux de suivi", "Saisie et recherche de données", "Exports"], stack: ["PHP", "Laravel", "PostgreSQL", "MySQL"] },
      { title: "Application e-commerce", text: "Vendre vos produits ou services en ligne.", includes: ["Catalogue de produits", "Panier et commandes", "Gestion des stocks", "Espace d’administration"], stack: ["Laravel", "React", "API REST", "PostgreSQL"] },
      { title: "Autre projet sur mesure", text: "Un besoin différent ? Décrivez-le-moi et nous verrons ensemble la meilleure solution.", includes: ["Analyse de votre besoin", "Conception adaptée", "Suivi et améliorations"], stack: ["Selon le besoin"] },
    ],
  },
  services: {
    title: "Services",
    items: [
      { title: "Création de sites web", text: "Un site clair, rapide et adapté à vos visiteurs, du mobile à l’ordinateur." },
      { title: "Applications web", text: "Des outils en ligne pour gérer vos données et automatiser vos tâches." },
      { title: "Applications mobiles", text: "Des applications Android et iOS à partir d’une même base de code." },
      { title: "Conception et intégration d’API", text: "Connecter vos services entre eux de façon fiable et documentée." },
      { title: "Conception de bases de données", text: "Une structure de données solide qui évolue avec vos besoins." },
      { title: "Maintenance et amélioration", text: "Corriger, optimiser et faire évoluer une solution déjà en place." },
    ],
    note: "Les tarifs dépendent du projet : décrivez votre besoin et je vous réponds avec une proposition.", quote: "Demander un devis",
  },
  contact: {
    title: "Contact", intro: "Une offre d’emploi, un projet à réaliser ou une question : écrivez-moi.",
    name: "Nom", email: "Adresse e-mail", subject: "Sujet", message: "Message", send: "Envoyer le message", sending: "Envoi en cours…", missing: "À compléter",
    eName: "Indiquez votre nom (2 caractères minimum).", eEmail: "Indiquez une adresse e-mail valide.", eSubject: "Indiquez un sujet (3 caractères minimum).", eMessage: "Votre message doit contenir au moins 10 caractères.",
    fix: "Corrigez les champs signalés avant d’envoyer.", ok: "Message envoyé avec succès.",
    notConfigured: "L’envoi n’est pas encore configuré sur ce site. Écrivez-moi directement par e-mail ou WhatsApp.",
    mailFallback: "Votre messagerie s’ouvre avec le message déjà rédigé : il ne reste qu’à l’envoyer.",
    rate: "Trop de messages envoyés. Réessayez plus tard.", fail: "Le message n’a pas pu être envoyé. Réessayez dans un instant.", network: "Connexion impossible. Vérifiez votre réseau et réessayez.",
  },
};

export type Content = typeof fr;

const en: Content = {
  role: "Web and mobile developer",
  metaDescription: "Portfolio of Divine Etoundé, software developer: websites, web and mobile applications, APIs and databases.",
  common: { skip: "Skip to content", theme: "Switch between light and dark theme", openMenu: "Open menu", closeMenu: "Close menu", lang: "Passer en français", langShort: "FR", mainNav: "Main navigation", mobileNav: "Mobile menu" },
  nav: { home: "Home", about: "About", skills: "Skills", work: "Work", services: "Services", contact: "Contact", cta: "Let’s discuss your project" },
  hero: { tagline: "I design useful, high-performing digital solutions built around their users.", seeWork: "See my work", contactMe: "Contact me", cv: "My résumé", cvMissing: "Résumé coming soon", photoAlt: "Portrait of Divine Etoundé" },
  about: {
    title: "About",
    paragraphs: [
      "I’m a software developer who likes turning a real need into a tool people actually use every day.",
      "I work on the web and on mobile, from database design to the interface. My goal: solutions that are simple to use and easy to evolve.",
    ],
  },
  skills: {
    title: "Skills",
    groups: [
      { title: "Front-end", text: "Clear, responsive interfaces.", items: [{ name: "HTML5" }, { name: "CSS3" }, { name: "JavaScript" }, { name: "React" }, { name: "Next.js" }] },
      { title: "Back-end", text: "Business logic and APIs.", items: [{ name: "PHP" }, { name: "Laravel" }, { name: "API REST" }] },
      { title: "Mobile development", text: "Cross-platform applications.", items: [{ name: "Flutter" }] },
      { title: "Databases", text: "Data modelling and queries.", items: [{ name: "PostgreSQL" }, { name: "MySQL" }] },
      { title: "Tools and collaboration", text: "Version control and teamwork.", items: [{ name: "Git" }, { name: "GitHub" }] },
      { title: "Design and community", text: "Visuals and social media presence.", items: [{ name: "Canva" }, { name: "Community management" }, { name: "Social media" }] },
    ],
  },
  work: {
    title: "Work",
    intro: "The types of projects I build for companies and individuals. Click a type to see what it can include.",
    includes: "What it can include", stack: "Possible technologies",
    items: [
      { title: "Showcase website", text: "Present your business with a clear, fast and professional website.", includes: ["Custom pages", "Mobile-friendly layout", "Contact form", "SEO basics"], stack: ["HTML5", "CSS3", "JavaScript", "Next.js"] },
      { title: "Portfolio", text: "Highlight a career path, skills and achievements.", includes: ["Profile presentation", "Project gallery", "Downloadable résumé", "Light and dark mode"], stack: ["React", "Next.js", "CSS3"] },
      { title: "Management application", text: "Track and organise your data day to day.", includes: ["User and access management", "Tracking dashboards", "Data entry and search", "Exports"], stack: ["PHP", "Laravel", "PostgreSQL", "MySQL"] },
      { title: "E-commerce application", text: "Sell your products or services online.", includes: ["Product catalogue", "Cart and orders", "Stock management", "Admin area"], stack: ["Laravel", "React", "API REST", "PostgreSQL"] },
      { title: "Other custom project", text: "Something different? Describe it and we’ll find the best solution together.", includes: ["Analysis of your needs", "Tailored design", "Follow-up and improvements"], stack: ["Depends on the need"] },
    ],
  },
  services: {
    title: "Services",
    items: [
      { title: "Website creation", text: "A clear, fast website tailored to your visitors, on mobile and desktop." },
      { title: "Web applications", text: "Online tools to manage your data and automate your tasks." },
      { title: "Mobile applications", text: "Android and iOS apps from a single codebase." },
      { title: "API design and integration", text: "Connect your services together reliably, with clear documentation." },
      { title: "Database design", text: "A solid data structure that grows with your needs." },
      { title: "Maintenance and improvement", text: "Fix, optimise and evolve a solution that’s already in place." },
    ],
    note: "Pricing depends on the project: describe your need and I’ll reply with a proposal.", quote: "Request a quote",
  },
  contact: {
    title: "Contact", intro: "A job offer, a project to build or a question: get in touch.",
    name: "Name", email: "Email address", subject: "Subject", message: "Message", send: "Send message", sending: "Sending…", missing: "To be completed",
    eName: "Enter your name (2 characters minimum).", eEmail: "Enter a valid email address.", eSubject: "Enter a subject (3 characters minimum).", eMessage: "Your message must contain at least 10 characters.",
    fix: "Please fix the highlighted fields before sending.", ok: "Message sent successfully.",
    notConfigured: "Sending isn’t set up on this site yet. Please write to me directly by email or WhatsApp.",
    mailFallback: "Your email app is opening with the message ready: just press send.",
    rate: "Too many messages sent. Please try again later.", fail: "The message could not be sent. Please try again in a moment.", network: "Connection failed. Check your network and try again.",
  },
};

export const content: Record<Lang, Content> = { fr, en };
