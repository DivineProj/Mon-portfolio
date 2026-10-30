/**
 * ✏️ CONFIGURATION À PERSONNALISER (identité et liens).
 * Les textes (français et anglais) sont dans src/data/content.ts.
 * Une chaîne vide ("") masque le lien correspondant.
 */
export const site = {
  name: "Divine ETOUNDE",
  firstName: "Divine",
  lastName: "ETOUNDE",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  photo: "/photo-divine.jpg", // fichier dans le dossier public/
  cvUrl: "/CV_Divine_ETOUNDE.pdf", // fichier dans le dossier public/
  email: "etoundedivine0@gmail.com",
  whatsapp: "2290158774274", // numéro international sans « + » (229 = Bénin)
  linkedin: "https://www.linkedin.com/in/divine-etounde-694b92331?trk=contact-info", // ex. https://www.linkedin.com/in/ton-profil
  github: "https://github.com/DivineProj", // ex. https://github.com/ton-pseudo
};
