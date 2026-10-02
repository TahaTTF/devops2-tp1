# TP1 — Notes enseignant

Module DevOps 2 (ECUE733) · Séance 1 · Document réservé à l'enseignant.

## 1. Avant la séance

- [ ] **Fusionner l'énoncé dans `main` du dépôt `wissemwis/devops2-tp1`.** Un fork ne copie que `main` (option par défaut). Tout ce qui n'est pas sur `main` n'existera pas chez les étudiants : ni l'énoncé ni la correction du `.gitignore`.
- [ ] Vérifier que `.gitignore` contient `AGENTS.md` et `CLAUDE.md` (voir la section 6, « Piège technique »).
- [ ] Vérifier que les postes ont Git et **Node.js ≥ 20.9** (`node -v`). Next.js 16.3.8 refuse de démarrer en dessous.
- [ ] Tester le réseau de la salle : `ssh -T git@github.com` (port 22) et `npm install` sur un poste. Sur le dépôt actuel, l'installation prend environ 15 s avec un bon réseau (33 paquets, 0 vulnérabilité).
- [ ] Préparer l'URL de la liste des forks : <https://github.com/wissemwis/devops2-tp1/forks>. C'est là que vous retrouvez tous les livrables.

## 2. Déroulé et points de synchronisation

| Horaire | Étape | Où en est un binôme « à l'heure » | Point de synchro conseillé |
|---|---|---|---|
| 0:00 – 0:15 | Comptes, `git config`, clé SSH | `ssh -T` répond « Hi <login>! » chez A et B | 0:15 : demander qui n'a pas le « Hi ». Basculer ces postes en HTTPS + jeton sans attendre |
| 0:15 – 0:35 | Jira | Sprint démarré, 3 stories dans « À faire » | 0:30 : vérifier que les clés sont bien QST-2/3/4 (sinon, les étudiants adaptent les noms) |
| 0:35 – 0:55 | Fork, collaborateur, clone, `npm run dev` | Page affichée chez A et B, `git remote -v` montre `<loginA>` | 0:50 : faire lever la main à ceux dont `git remote -v` affiche `wissemwis` |
| 0:55 – 1:15 | Tour 1 : A fait QST-2 | PR #1 fusionnée, B a fait `git pull` | 1:05 : vérifier au tableau la *base repository* de la PR |
| 1:15 – 1:35 | Tour 2 : B fait QST-3 | PR #2 fusionnée, `/creer` s'affiche chez les deux | — |
| 1:35 – 1:50 | Bonus : QST-4 (B) et liaison Jira ↔ GitHub (A) | PR #3 fusionnée, panneau « Développement » visible | — |
| 1:50 – 2:00 | Livrable : QST-1 | PR #4 fusionnée, `docs/TP1-livrable.md` sur `main` | 1:50 : annoncer l'arrêt du bonus, **même s'il n'est pas fini** |

Si un binôme est en retard à 1:35, faites sauter le bonus et passez directement au livrable : il ne prend que 10 minutes.

## 3. Corrigé attendu

### 3.1 Historique Git type

Sur le `main` du fork, après le livrable, `git log --oneline --graph` donne :

```text
*   a9c… Merge pull request #4 from <loginA>/QST-1-livrable
|\
| * 7d2… QST-1 Ajouter le livrable du TP1                              (A)
|/
*   61e… Merge pull request #3 from <loginA>/QST-4-modeles
|\
| * 3b8… QST-4 Ajouter la section Modèles de questionnaires            (B)
|/
*   c40… Merge pull request #2 from <loginA>/QST-3-page-creer
|\
| * 9f1… QST-3 Ajouter la page de création de questionnaire            (B)
|/
*   5e7… Merge pull request #1 from <loginA>/QST-2-titre-accueil
|\
| * 2a6… QST-2 Mettre en avant la création de questionnaires sur l'accueil   (A)
|/
*   …     dernier commit de wissemwis/devops2-tp1 au moment du fork
```

À noter :

- les branches de B apparaissent sous la forme `<loginA>/QST-…`, car elles vivent dans le fork de A ;
- les numéros de PR repartent de **#1** dans chaque fork ;
- un binôme sans bonus a 3 PR (#1, #2, #3 pour le livrable) au lieu de 4.

Variantes acceptables :

- plusieurs commits par story, tous préfixés ;
- un binôme qui a travaillé en parallèle a un graphe où les branches se chevauchent. C'est normal, tant qu'il n'y a pas de conflit.

### 3.2 État du tableau Jira

| Ticket | Type | Statut attendu | Responsable |
|---|---|---|---|
| QST-1 Création de questionnaire | Epic | À faire ou En cours (non évalué) | — |
| QST-2 Accueil : mettre en avant la création de questionnaires | Story | **Terminé** | A |
| QST-3 Page « Nouveau questionnaire » | Story | **Terminé** | B |
| QST-4 Section « Modèles de questionnaires » | Story | Terminé si le bonus est fait, sinon À faire | B |

Les trois stories ont l'epic QST-1 comme parent et sont dans le **Sprint 1, actif**.

Si le bonus Jira ↔ GitHub est fait, chaque story ouverte montre un panneau **Développement** avec 1 branche, 1 commit et 1 pull request fusionnée.

### 3.3 Code attendu

**QST-2.** Modification du seul bloc `<header className="hero">` d'`app/page.tsx` : `eyebrow`, `<h1>` et `<p className="lead">`. Le texte est libre. Le `diff` doit tenir en une dizaine de lignes, toutes entre les lignes 50 et 66.

**QST-3.** Nouveau fichier `app/creer/page.tsx`. Exemple de solution (vérifié : `npm run build` passe et `/creer` s'affiche) :

```tsx
import Link from "next/link";

export default function Creer() {
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <h2>Nouveau questionnaire</h2>
          <p>Donnez un titre et une description à votre questionnaire.</p>
        </div>
        <form>
          <p>
            <label htmlFor="titre">Titre</label><br />
            <input id="titre" name="titre" type="text" placeholder="Quiz de révision Git" />
          </p>
          <p>
            <label htmlFor="description">Description</label><br />
            <textarea id="description" name="description" rows={4} />
          </p>
          <button className="btn btn-primary" type="submit" disabled>Enregistrer</button>
        </form>
        <p><Link href="/">← Retour à l'accueil</Link></p>
      </div>
    </section>
  );
}
```

**QST-4.** Nouveau fichier `components/Modeles.tsx` (vérifié de la même façon) :

```tsx
const modeles = [
  { titre: "Quiz de cours", texte: "Dix questions à choix multiple, corrigées automatiquement." },
  { titre: "Sondage de satisfaction", texte: "Des échelles de 1 à 5 et un commentaire libre." },
  { titre: "Évaluation de TP", texte: "Des questions ouvertes et un barème par critère." },
];

export default function Modeles() {
  return (
    <section id="modeles" className="section-surface">
      <div className="container">
        <div className="section-head">
          <h2>Modèles de questionnaires</h2>
          <p>Partez d'un modèle prêt à l'emploi.</p>
        </div>
        <div className="cards">
          {modeles.map((m) => (
            <div className="card" key={m.titre}>
              <h3>{m.titre}</h3>
              <p>{m.texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Et dans `app/page.tsx`, exactement deux lignes ajoutées :

```diff
 import DevOpsLoop from "@/components/DevOpsLoop";
+import Modeles from "@/components/Modeles";
 …
+      <Modeles />
+
       <section id="commencer" className="quote">
```

### 3.4 Pourquoi il n'y a pas de conflit aujourd'hui

| Story | Fichiers touchés | Zone |
|---|---|---|
| QST-2 | `app/page.tsx` | lignes 50 à 66 (bandeau d'accueil) |
| QST-3 | `app/creer/page.tsx` (nouveau) | — |
| QST-4 | `components/Modeles.tsx` (nouveau), `app/page.tsx` | ligne 2 (import), avant la ligne 142 (`#commencer`) |
| QST-1 | `docs/TP1-livrable.md`, `docs/tp1-jira.png` (nouveaux) | — |

QST-2 et QST-3 n'ont aucun fichier en commun : elles peuvent même avancer en parallèle.

QST-4 touche `app/page.tsx`, mais dans des zones éloignées de QST-2. En plus, B part d'un `main` qui contient déjà QST-2.

Le seul conflit possible vient d'un étudiant qui sort de sa zone, par exemple A qui retouche la navigation en même temps que B ajoute QST-4. Si cela arrive, résolvez-le avec eux en deux minutes et gardez l'exemple pour la séance 2.

## 4. Points à vérifier en circulant

**Étape 1 — SSH et Git**

- `git config --global user.email` est bien l'email du compte GitHub. Sinon, les commits ne sont pas reliés au profil et n'apparaissent pas avec l'avatar.
- `user.name` est un vrai nom, pas `root` ou le nom du poste.
- La clé ajoutée sur GitHub est la clé **publique** (`.pub`, commence par `ssh-ed25519`).

**Étape 2 — Jira**

- Le projet est de type **Scrum**, pas Kanban, et la clé est exactement `QST`.
- Les stories ont l'epic comme **Parent**. Un oubli fréquent : la story est créée hors epic.
- Le sprint est **démarré**. Sans cela, l'onglet Tableau est vide.

**Étape 3 — Fork et clone**

- `git remote -v` chez **B** affiche `<loginA>`, pas `<loginB>` ni `wissemwis`.
- B a bien accepté l'invitation : dans le fork de A, Settings → Collaborators, pas de « Pending Invite ».
- Un seul fork par binôme. Si B a aussi forké, ce n'est pas grave, mais B doit travailler sur celui de A.

**Étape 4 — Changement tracé**

- La branche est créée **avant** de coder (`git branch` affiche `* QST-…`).
- `git status` avant `git add` : un seul fichier modifié.
- La PR va vers `<loginA>/devops2-tp1`. C'est l'erreur n° 1 : regardez la ligne « wants to merge … into `<loginA>:main` ».
- C'est **l'autre** membre qui fusionne.
- Le ticket passe en « En cours » au début, et pas seulement en « Terminé » à la fin.
- Après la fusion, `git pull` est fait **des deux côtés**.

## 5. Erreurs fréquentes

| Erreur | Comment la repérer | Correction |
|---|---|---|
| PR ouverte vers `wissemwis/devops2-tp1` | Notification sur votre dépôt, ou base repository `wissemwis` | Fermer la PR sans fusionner. L'étudiant la rouvre vers son fork. Ne fusionnez **jamais** une PR étudiante sur votre dépôt |
| Commit directement sur `main` | `git log` sans commit de fusion, ou push rejeté `main -> main` | Si ce n'est pas encore poussé : `git branch QST-2-… && git reset --hard origin/main`, puis `git switch QST-2-…` et poursuite normale |
| Commit sans préfixe | `git log --oneline` | Si ce n'est pas encore poussé : `git commit --amend -m "QST-2 …"`. Si c'est déjà poussé : le laisser et le signaler. On ne réécrit pas l'historique partagé en séance 1 |
| Branche sans clé (`modif-titre`, `patch-1`) | Nom affiché dans la PR | `git branch -m QST-2-titre-accueil`, `git push -u origin QST-2-titre-accueil`, nouvelle PR. Supprimer l'ancienne branche distante |
| Fusion en « Squash and merge » ou « Rebase » | Pas de commit de fusion, ou commit signé par celui qui fusionne | Acceptable si le message garde la clé, mais à éviter : on veut voir les commits de chaque membre |
| `git add .` qui embarque des fichiers parasites | Fichiers inattendus dans **Files changed** | Retirer le fichier dans une nouvelle PR. Rappeler d'ajouter les fichiers un par un |
| Édition directe sur github.com (crayon) | Commit « Update page.tsx » signé du navigateur | Valable techniquement, mais hors consigne : faire refaire en ligne de commande |
| B a cloné son propre fork | `git remote -v` affiche `<loginB>` | `git remote set-url origin git@github.com:<loginA>/devops2-tp1.git` |
| Ticket jamais passé en « Terminé » | Tableau Jira | Rappel au moment du `git pull` |
| `npm run dev` lancé dans le mauvais dossier | `ENOENT … package.json` | `cd devops2-tp1` |

## 6. Piège technique : `AGENTS.md` et `CLAUDE.md`

Au premier `npm run dev`, Next.js 16.3 crée deux fichiers à la racine : `AGENTS.md` et `CLAUDE.md`. Ce sont des consignes destinées aux assistants de code.

Sans entrée dans `.gitignore`, voici ce qui se passe :

1. A fait `git add .` et les embarque dans sa PR ;
2. B a les mêmes fichiers en local, non suivis ;
3. le `git pull` de B échoue avec `The following untracked working tree files would be overwritten by merge`, **même si le contenu est identique**. Ce comportement a été reproduit.

La correction est d'ajouter `AGENTS.md` et `CLAUDE.md` au `.gitignore` du dépôt de départ. Si un étudiant tombe quand même dessus (fork fait avant la correction), il lui suffit de supprimer les deux fichiers locaux et de relancer `git pull`.

## 7. Vérification des livrables

Les livrables restent sur les forks des étudiants. Retrouvez-les sur <https://github.com/wissemwis/devops2-tp1/forks>.

### Grille rapide

| # | Critère | Vérification |
|---|---|---|
| 1 | Fork existant, B collaborateur | Page du fork. Un commit de B fusionné prouve que B a pu pousser |
| 2 | ≥ 1 commit de chaque membre | Script ci-dessous, section « Commits par auteur » |
| 3 | Messages de commit préfixés `QST-x` | Script, section « Commits sans préfixe » : doit afficher `(aucun)` |
| 4 | Branches préfixées `QST-x` | Script, section « Pull requests fusionnées » |
| 5 | PR fusionnées dans le fork | Onglet **Pull requests → Closed** : badges Merged |
| 6 | Tickets Terminés | Capture `docs/tp1-jira.png` dans `docs/TP1-livrable.md` |
| 7 | L'application démarre | `npm install && npm run dev` sur le clone, puis `/` et `/creer` |

### Script de vérification

À enregistrer sous le nom `verif-tp1.sh`, puis à lancer avec les URL des forks :

```bash
#!/usr/bin/env bash
# Usage : ./verif-tp1.sh https://github.com/<loginA>/devops2-tp1 [autres forks…]
PROF="${PROF:-https://github.com/wissemwis/devops2-tp1.git}"
for url in "$@"; do
  dir=$(mktemp -d)
  echo "=================== $url"
  git clone -q "$url" "$dir" || { echo "ÉCHEC du clone"; continue; }
  git -C "$dir" fetch -q "$PROF" main:prof-main
  echo "--- Commits par auteur (hors fusions et historique de l'enseignant)"
  git -C "$dir" shortlog -sn --no-merges prof-main..origin/main
  echo "--- Commits sans préfixe QST-"
  git -C "$dir" log --no-merges --format='%h %an : %s' prof-main..origin/main | grep -Ev ' : QST-[0-9]+ ' || echo "(aucun)"
  echo "--- Pull requests fusionnées (branches)"
  git -C "$dir" log --merges --format='%s' prof-main..origin/main
  echo "--- Livrable"
  if [ -f "$dir/docs/TP1-livrable.md" ]; then echo "docs/TP1-livrable.md présent"; else echo "docs/TP1-livrable.md ABSENT"; fi
done
```

Exemple de sortie pour un binôme dont B a oublié le préfixe :

```text
=================== https://github.com/jdupont/devops2-tp1
--- Commits par auteur (hors fusions et historique de l'enseignant)
     2	Jeanne Dupont
     1	Karim Benali
--- Commits sans préfixe QST-
9efe021 Karim Benali : ajout page
--- Pull requests fusionnées (branches)
Merge pull request #3 from jdupont/QST-1-livrable
Merge pull request #2 from jdupont/QST-3-page-creer
Merge pull request #1 from jdupont/QST-2-titre-accueil
--- Livrable
docs/TP1-livrable.md présent
```

Le nom d'auteur affiché est le `user.name` de la configuration Git. Si deux noms identiques ou `root` apparaissent, un membre a mal configuré Git : croisez avec l'onglet **Commits** de GitHub, qui affiche les comptes.

## 8. À annoncer pour la séance 2

- **Gardez tout** : le fork, le site Jira, la clé SSH. On repart du même dépôt et du même tableau.
- Au programme :
  - **revues de pull request** approfondies : commentaires sur une ligne, demande de modifications, approbation ;
  - **protection de la branche `main`** : plus de fusion sans PR approuvée ;
  - **conflits de fusion** : on les provoquera exprès, A et B modifiant la même zone de la page, et on apprendra à les résoudre.
- Pour gagner du temps la prochaine fois : vérifier chez soi que `ssh -T git@github.com` répond toujours, et que `npm run dev` démarre.
- Préparation facultative : relire `git merge`, `git diff` et l'onglet **Files changed** d'une PR.
