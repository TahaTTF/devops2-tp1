# devops2-tp1

Page d'accueil de **Quizzo**, site fictif réalisé pour le TP1 du module DevOps 2, en Next.js (App Router).

## Lancer le projet

```bash
npm install
npm run dev     # http://localhost:3000
```

Build de production :

```bash
npm run build
npm start
```

## Structure

- `app/layout.tsx` : layout racine (langue, métadonnées)
- `app/page.tsx` : page d'accueil
- `app/globals.css` : styles aux couleurs de la charte DevOps 2
- `components/DevOpsLoop.tsx` : boucle DevOps en SVG
