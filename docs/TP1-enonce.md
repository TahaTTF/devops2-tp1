# TP1 — Du ticket Jira à la fusion sur GitHub

Module DevOps 2 (ECUE733) · Séance 1 · Durée : 2 h · En binôme

## Objectifs

À la fin du TP, vous savez :

- configurer Git et une clé SSH pour GitHub ;
- créer un projet Scrum dans Jira et y décrire un travail sous forme d'epic et de stories ;
- travailler à deux sur un même dépôt GitHub (fork + collaborateur) ;
- tracer un changement de bout en bout : **ticket → branche → commit → push → pull request → fusion → ticket Terminé → `git pull`**.

Ce dépôt est le point de départ du projet fil rouge du module : **Quizzo**, une application de questionnaires (création, diffusion, collecte des réponses). Aujourd'hui, vous ne touchez qu'à la page d'accueil et vous ajoutez une page.

## Avant de commencer

### Prérequis

- Git installé (`git --version`). Sous Windows, utilisez **Git Bash** pour toutes les commandes.
- Node.js **20.9 ou plus** (`node -v`). La version LTS actuelle convient.
- Un éditeur de code (VS Code ou autre).
- Une adresse email personnelle à laquelle vous avez accès pendant la séance.

### Rôles

Vous êtes deux : **A** et **B**. Décidez maintenant qui est A.

| | A | B |
|---|---|---|
| Jira | crée le site et le projet, invite B | accepte l'invitation |
| GitHub | forke le dépôt, ajoute B comme collaborateur | accepte l'invitation |
| Code | réalise QST-2 | réalise QST-3 (et QST-4 en bonus) |

Dans tout l'énoncé :

- `<loginA>` désigne l'identifiant GitHub de A (par exemple `jdupont`) ;
- `<email>` désigne votre adresse email ;
- les numéros de tickets (QST-1, QST-2…) sont ceux attendus si vous créez les tickets dans l'ordre. **Utilisez toujours la clé réellement affichée par Jira.**

### Les conventions à respecter

Chaque changement porte la clé de son ticket Jira, partout :

| Élément | Règle | Exemple |
|---|---|---|
| Branche | `QST-<n>-<description-courte>` | `QST-2-titre-accueil` |
| Commit | commence par `QST-<n>` | `QST-2 Mettre en avant la création de questionnaires` |
| Pull request | titre qui commence par `QST-<n>` | `QST-2 Mettre en avant la création de questionnaires` |

On ne commite **jamais** directement sur `main`. Tout passe par une branche et une pull request.

---

## Étape 1 — Comptes GitHub, Git et clé SSH (0:00 – 0:15)

**Qui : A et B, chacun sur son poste.**

### 1.1 Compte GitHub

Si vous n'avez pas de compte, créez-le sur <https://github.com/signup> avec votre email. Validez l'email reçu.

### 1.2 Configuration de Git

Utilisez la **même adresse email** que sur GitHub : c'est elle qui relie vos commits à votre compte.

```bash
git config --global user.name "Prénom Nom"
git config --global user.email "<email>"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

Vérifiez :

```bash
git config --global --list
```

✅ **Réussi si** vous voyez `user.name`, `user.email`, `init.defaultbranch=main` et `pull.rebase=false`.

### 1.3 Clé SSH

Vérifiez d'abord si vous avez déjà une clé :

```bash
ls ~/.ssh/id_ed25519.pub
```

Si le fichier n'existe pas, créez la clé. Appuyez sur Entrée à chaque question (la phrase de passe est facultative) :

```bash
ssh-keygen -t ed25519 -C "<email>"
```

Affichez la clé **publique** et copiez toute la ligne :

```bash
cat ~/.ssh/id_ed25519.pub
```

Sur GitHub : photo de profil → **Settings** → **SSH and GPG keys** → **New SSH key**. Donnez un titre (par exemple `PC salle TP`), collez la clé, validez.

Testez la connexion. À la première connexion, tapez `yes` pour accepter l'empreinte de GitHub :

```bash
ssh -T git@github.com
```

✅ **Réussi si** vous voyez :

```text
Hi <votre-login>! You've successfully authenticated, but GitHub does not provide shell access.
```

> Le test échoue ou reste bloqué ? Le port 22 est peut-être fermé. Voir [En cas de problème → Port 22 bloqué](#port-22-bloqué-ssh-impossible).

---

## Étape 2 — Jira : site, projet, epic et stories (0:15 – 0:35)

L'interface de Jira évolue souvent. Si un libellé diffère un peu, cherchez l'équivalent le plus proche.

### 2.1 Créer le site Jira

**Qui : A.**

1. Allez sur <https://www.atlassian.com/fr/software/jira/free> et inscrivez-vous avec votre email.
2. Choisissez un nom de site, par exemple `quizzo-<loginA>`. Votre site aura l'adresse `https://quizzo-<loginA>.atlassian.net`.
3. Passez les questions d'accueil (rôle, équipe…) : elles n'ont pas d'importance pour le TP.

### 2.2 Créer le projet Scrum « Questionnaire »

**Qui : A.**

1. **Projets** → **Créer un projet**.
2. Modèle : **Scrum**. Cliquez sur **Utiliser le modèle**.
3. Type : **Géré par l'équipe** (*team-managed*).
4. Nom : `Questionnaire`.
5. Clé : `QST`. Jira propose une clé automatiquement : modifiez-la si besoin.
6. **Créer le projet**.

✅ **Réussi si** vous voyez le **Backlog** du projet « Questionnaire » et la clé `QST` dans les paramètres du projet.

### 2.3 Inviter B

**Qui : A, puis B.**

1. A : bouton **Inviter** (ou **+** à côté de « Équipe » / « Personnes » dans la barre du haut), ou **Paramètres du projet** → **Accès** → **Ajouter des personnes**.
2. A saisit l'email de B et envoie l'invitation.
3. B ouvre l'email d'Atlassian, accepte, crée son compte Atlassian et ouvre le projet « Questionnaire ».

✅ **Réussi si** B voit le backlog du projet QST.

### 2.4 Créer l'epic et les 3 stories

**Qui : A crée l'epic et QST-2, B crée QST-3 et QST-4.** Créez-les **dans cet ordre** pour obtenir les clés attendues.

**Epic.** Bouton **Créer** → Type de ticket : **Epic** → Résumé : `Création de questionnaire` → **Créer**.

**Stories.** Bouton **Créer** → Type de ticket : **Story**. Remplissez le résumé et la description ci-dessous. Dans le champ **Parent**, choisissez l'epic « Création de questionnaire ».

#### QST-2 — Accueil : mettre en avant la création de questionnaires

- **Description :** En tant que visiteur, je veux comprendre dès l'arrivée sur Quizzo que l'outil sert à créer des questionnaires, afin de savoir rapidement s'il me concerne.
- **Critère d'acceptation :**
  - le sur-titre, le titre principal et le paragraphe d'introduction du bandeau d'accueil sont réécrits pour parler de la création de questionnaires ;
  - le reste de la page est inchangé (navigation, sections, boucle DevOps) ;
  - la page `http://localhost:3000` s'affiche sans erreur.
- **Fichier :** `app/page.tsx`, **uniquement** le bloc `<header className="hero">` (lignes 50 à 66).
- **Réalisée par :** A.

#### QST-3 — Page « Nouveau questionnaire »

- **Description :** En tant que formateur, je veux une page dédiée à la création d'un questionnaire, afin de pouvoir y saisir un titre et une description. Pour l'instant, c'est une maquette : le formulaire n'enregistre rien.
- **Critère d'acceptation :**
  - l'adresse `http://localhost:3000/creer` affiche une page (elle répond « 404 » avant la story) ;
  - la page contient un titre « Nouveau questionnaire », un champ « Titre », un champ « Description » et un bouton « Enregistrer » désactivé ;
  - un lien « Retour à l'accueil » ramène à `/`.
- **Fichier :** nouveau fichier `app/creer/page.tsx`. Aucun autre fichier n'est modifié.
- **Réalisée par :** B.

#### QST-4 — Section « Modèles de questionnaires » (bonus)

- **Description :** En tant que formateur, je veux voir sur l'accueil quelques modèles de questionnaires prêts à l'emploi, afin de démarrer plus vite.
- **Critère d'acceptation :**
  - la section est un **composant séparé** dans `components/Modeles.tsx` ;
  - elle affiche au moins 3 modèles sous forme de cartes (réutilisez les classes CSS existantes `cards` et `card`) ;
  - elle apparaît sur l'accueil entre la section « Sous le capot » et la citation finale ;
  - `app/globals.css` n'est pas modifié.
- **Fichiers :** nouveau `components/Modeles.tsx` ; dans `app/page.tsx`, une ligne d'`import` en haut et une ligne `<Modeles />` juste avant `<section id="commencer" …>`.
- **Réalisée par :** B, pendant le bonus.

### 2.5 Créer et démarrer le sprint

**Qui : A.**

1. Dans le **Backlog**, cliquez sur **Créer un sprint**.
2. Glissez QST-2, QST-3 et QST-4 dans le sprint.
3. **Démarrer le sprint** (durée : 1 semaine).
4. Ouvrez l'onglet **Tableau**.

✅ **Réussi si** le tableau affiche trois colonnes (**À faire**, **En cours**, **Terminé**) et les trois stories dans « À faire ».

---

## Étape 3 — Fork, collaborateur, clone et lancement (0:35 – 0:55)

### 3.1 Forker le dépôt

**Qui : A.**

1. Ouvrez <https://github.com/wissemwis/devops2-tp1>.
2. Cliquez sur **Fork**. Gardez le nom `devops2-tp1` et laissez cochée « Copy the `main` branch only ».
3. **Create fork**.

✅ **Réussi si** vous êtes sur `https://github.com/<loginA>/devops2-tp1`, avec la mention « forked from wissemwis/devops2-tp1 » sous le nom.

### 3.2 Ajouter B comme collaborateur

**Qui : A, puis B.**

1. A, sur **son fork** : **Settings** → **Collaborators** → **Add people** → identifiant GitHub de B → **Add to repository**.
2. B accepte l'invitation : depuis l'email reçu, ou directement à l'adresse `https://github.com/<loginA>/devops2-tp1/invitations`.

✅ **Réussi si**, chez A, dans **Settings → Collaborators**, B apparaît sans la mention « Pending Invite ». De son côté, B ne voit pas l'onglet **Settings** du fork : c'est normal.

### 3.3 Cloner le fork

**Qui : A et B, chacun sur son poste.** On clone **le fork de A**, pas le dépôt de l'enseignant.

```bash
git clone git@github.com:<loginA>/devops2-tp1.git
cd devops2-tp1
git remote -v
```

✅ **Réussi si** `git remote -v` affiche **`<loginA>`** et **pas** `wissemwis` :

```text
origin  git@github.com:<loginA>/devops2-tp1.git (fetch)
origin  git@github.com:<loginA>/devops2-tp1.git (push)
```

> Vous voyez `wissemwis` ? Voir [En cas de problème → Mauvais dépôt cloné](#mauvais-dépôt-cloné).

### 3.4 Installer et lancer l'application

**Qui : A et B.**

```bash
npm install
npm run dev
```

`npm install` affiche à la fin quelque chose comme `added 33 packages … found 0 vulnerabilities`. Un message « New major version of npm available » peut apparaître : ignorez-le.

`npm run dev` affiche :

```text
▲ Next.js 16.3.8 (Turbopack)
- Local:         http://localhost:3000
✓ Ready in …
```

Ouvrez <http://localhost:3000>.

✅ **Réussi si** vous voyez la page d'accueil de Quizzo avec le titre « Créez, partagez et analysez vos questionnaires ».

Laissez `npm run dev` tourner dans ce terminal. Ouvrez **un second terminal** pour les commandes Git. Les modifications de code s'affichent dans le navigateur dès l'enregistrement du fichier.

Vérifiez enfin que l'arbre Git est propre :

```bash
git status
```

✅ **Réussi si** vous voyez `nothing to commit, working tree clean`.

---

## Étape 4 — Le changement tracé, chacun son tour (0:55 – 1:35)

Chaque tour suit les mêmes 9 étapes. Au tour 1, **A développe** et **B relit et fusionne**. Au tour 2, on inverse.

```text
Ticket « En cours » → branche → code → commit → push → pull request
→ relecture et fusion par l'autre → ticket « Terminé » → git pull des deux côtés
```

### Tour 1 — A réalise QST-2 (0:55 – 1:15)

**1. A passe le ticket en cours.** Dans Jira, sur le tableau, glissez QST-2 dans **En cours**. Assignez-vous le ticket (champ **Responsable**).

**2. A part d'un `main` à jour et crée sa branche.**

```bash
git switch main
git pull
git switch -c QST-2-titre-accueil
```

✅ Le terminal affiche `Switched to a new branch 'QST-2-titre-accueil'`.

**3. A modifie le code.** Ouvrez `app/page.tsx`. Ne modifiez **que** le bloc `<header className="hero">` (lignes 50 à 66) :

- le sur-titre (`<div className="eyebrow">`) ;
- le titre principal (`<h1>`) ;
- le paragraphe d'introduction (`<p className="lead">`).

Rédigez vos propres textes. Exemple : titre « Votre questionnaire prêt en 5 minutes ». Enregistrez, puis vérifiez dans le navigateur.

**4. A vérifie ce qui a changé.**

```bash
git status
git diff
```

✅ Seul `app/page.tsx` apparaît comme modifié, et le `diff` ne montre que des lignes du bandeau d'accueil.

**5. A commite et pousse.**

```bash
git add app/page.tsx
git commit -m "QST-2 Mettre en avant la création de questionnaires sur l'accueil"
git push -u origin QST-2-titre-accueil
```

✅ Le push se termine par `* [new branch]      QST-2-titre-accueil -> QST-2-titre-accueil`.

**6. A ouvre la pull request.** Sur la page du fork, cliquez sur **Compare & pull request**.

> ⚠️ **Point de vigilance.** Sur un fork, GitHub propose par défaut le dépôt de l'enseignant comme destination. En haut du formulaire, réglez :
>
> - **base repository :** `<loginA>/devops2-tp1` ;
> - **base :** `main` ;
> - **compare :** `QST-2-titre-accueil`.
>
> Si vous voyez `wissemwis/devops2-tp1` comme base repository, changez-le.

Titre : `QST-2 Mettre en avant la création de questionnaires sur l'accueil`. Dans la description, écrivez ce que vous avez changé et comment le vérifier. Cliquez sur **Create pull request**.

✅ La PR est créée dans `<loginA>/devops2-tp1` et affiche « This branch has no conflicts with the base branch ».

**7. B relit et fusionne.** Dans la PR, B ouvre l'onglet **Files changed** et vérifie que :

- seul `app/page.tsx` est modifié ;
- le titre de la PR et le message du commit commencent par `QST-2`.

Puis B clique sur **Merge pull request** → **Confirm merge**. Gardez l'option par défaut « Create a merge commit ». Ne choisissez pas « Squash ».

Après la fusion, cliquez sur **Delete branch** : la branche distante ne sert plus.

✅ La PR affiche le badge violet **Merged**.

> La revue approfondie (commentaires, demande de modifications, approbation) est au programme de la séance 2. Aujourd'hui, une lecture rapide suffit.

**8. A passe le ticket en Terminé.** Dans Jira, glissez QST-2 dans **Terminé**.

**9. Les deux récupèrent `main`.**

A :

```bash
git switch main
git pull
git branch -d QST-2-titre-accueil
```

B :

```bash
git switch main
git pull
```

✅ Le `git pull` affiche `Fast-forward` et `app/page.tsx | …`. Chez les deux, `git log --oneline -3` montre le commit de fusion et le commit `QST-2 …`. Le nouveau titre s'affiche dans le navigateur des deux membres.

### Tour 2 — B réalise QST-3 (1:15 – 1:35)

Mêmes étapes, rôles inversés : **B développe**, **A relit et fusionne**.

**1.** B passe QST-3 en **En cours** et se l'assigne.

**2.** B crée sa branche depuis un `main` à jour :

```bash
git switch main
git pull
git switch -c QST-3-page-creer
```

**3.** B crée le fichier `app/creer/page.tsx`. Dans le routeur de Next.js (App Router), un dossier `app/creer/` contenant un `page.tsx` devient la page `/creer`. Squelette de départ :

```tsx
import Link from "next/link";

export default function Creer() {
  return (
    <section>
      <div className="container">
        <h2>Nouveau questionnaire</h2>
        {/* À compléter : champs Titre et Description, bouton Enregistrer désactivé */}
        <p><Link href="/">← Retour à l'accueil</Link></p>
      </div>
    </section>
  );
}
```

Complétez-le pour respecter le critère d'acceptation de QST-3. Vous pouvez réutiliser les classes CSS existantes (`section-head`, `btn btn-primary`…). Ouvrez <http://localhost:3000/creer> pour vérifier.

**4.** B vérifie :

```bash
git status
```

✅ Seul `app/creer/` apparaît, dans « Untracked files ». Aucun fichier existant n'est modifié.

**5.** B commite et pousse :

```bash
git add app/creer/page.tsx
git commit -m "QST-3 Ajouter la page de création de questionnaire"
git push -u origin QST-3-page-creer
```

**6.** B ouvre la PR **vers `<loginA>/devops2-tp1`, branche `main`**, avec le titre `QST-3 Ajouter la page de création de questionnaire`.

**7.** A relit (onglet **Files changed**) et fusionne (**Merge pull request** → **Confirm merge** → **Delete branch**).

**8.** B passe QST-3 en **Terminé**.

**9.** Les deux récupèrent `main` :

```bash
git switch main
git pull
```

B supprime sa branche locale :

```bash
git branch -d QST-3-page-creer
```

✅ **Réussi si** chez A **et** chez B :

- <http://localhost:3000> affiche le nouveau titre (QST-2) ;
- <http://localhost:3000/creer> affiche la page « Nouveau questionnaire » (QST-3) ;
- `git log --oneline --graph -8` montre deux commits de fusion et les commits `QST-2 …` et `QST-3 …` ;
- dans Jira, QST-2 et QST-3 sont dans **Terminé**.

> **Binôme rapide ?** QST-2 et QST-3 touchent des fichiers différents. B peut créer sa branche et commencer QST-3 pendant le tour 1, sans risque de conflit. Avant le dernier `git pull` sur `main`, B doit avoir commité son travail.

---

## Étape 5 — Bonus (1:35 – 1:50)

Les deux bonus se font **en parallèle** : ils ne touchent pas les mêmes choses.

### Bonus B — Réaliser QST-4

**Qui : B.** Partez d'un `main` à jour qui contient QST-2 et QST-3 : c'est ce qui évite tout conflit.

```bash
git switch main
git pull
git switch -c QST-4-modeles
```

1. Passez QST-4 en **En cours**.
2. Créez `components/Modeles.tsx`. Il exporte par défaut un composant `Modeles` qui affiche une `<section>` avec un titre et au moins 3 cartes (`<div className="cards">` contenant des `<div className="card">`). Inspirez-vous de la section « Fonctionnalités » de `app/page.tsx`.
3. Dans `app/page.tsx`, ajoutez **seulement** deux lignes :

   ```tsx
   import Modeles from "@/components/Modeles";
   ```

   en haut, sous l'import de `DevOpsLoop`, et

   ```tsx
   <Modeles />
   ```

   juste avant `<section id="commencer" className="quote">`.
4. Vérifiez dans le navigateur, puis faites le même cycle qu'aux tours 1 et 2 :

   ```bash
   git add components/Modeles.tsx app/page.tsx
   git commit -m "QST-4 Ajouter la section Modèles de questionnaires"
   git push -u origin QST-4-modeles
   ```

   PR vers `<loginA>/devops2-tp1` `main`, fusion par A, ticket **Terminé**, `git pull` des deux côtés.

### Bonus A — Relier Jira et GitHub

**Qui : A.** A est administrateur du site Jira et propriétaire du fork, donc A seul peut faire cette liaison.

1. Dans Jira : **Applications** → **Explorer d'autres applications**.
2. Cherchez **GitHub for Jira** (éditeur : Atlassian) → **Obtenir l'application**.
3. Cliquez sur **Commencer** → **GitHub Cloud** → autorisez l'accès avec votre compte GitHub.
4. Installez l'application GitHub sur votre compte `<loginA>`, avec **Only select repositories** → `devops2-tp1`.
5. Revenez dans Jira et ouvrez le ticket QST-2. La synchronisation peut prendre quelques minutes.

✅ **Réussi si** le ticket QST-2 affiche un panneau **Développement** avec la branche, le commit et la pull request fusionnée. C'est pour cela que la clé doit apparaître dans le nom de la branche et dans le message de commit : Jira s'en sert pour faire le lien.

---

## Étape 6 — Remise du livrable (1:50 – 2:00)

Le livrable **est votre fork**. L'enseignant le consulte directement sur GitHub. Il reste public : ne le supprimez pas et ne le rendez pas privé.

Pour que l'état du tableau Jira soit visible sur GitHub, A ajoute un fichier de livrable. On applique le même flux, sous la clé de l'epic QST-1.

**Qui : A.** B fournit son nom et son identifiant GitHub.

1. Faites une capture d'écran du **tableau Jira** du sprint (les trois colonnes visibles). Enregistrez-la sous `docs/tp1-jira.png` dans le dépôt.
2. Créez la branche :

   ```bash
   git switch main
   git pull
   git switch -c QST-1-livrable
   ```

3. Créez `docs/TP1-livrable.md` avec ce contenu, complété :

   ```markdown
   # Livrable TP1

   - Membre A : Prénom Nom (@loginA)
   - Membre B : Prénom Nom (@loginB)
   - Fork : https://github.com/<loginA>/devops2-tp1
   - Site Jira : https://<site>.atlassian.net
   - QST-2 : réalisée par A
   - QST-3 : réalisée par B
   - QST-4 (bonus) : réalisée / non réalisée
   - Liaison Jira ↔ GitHub (bonus) : réalisée / non réalisée

   ![Tableau Jira du sprint 1](tp1-jira.png)
   ```

4. Commitez, poussez et ouvrez la PR :

   ```bash
   git add docs/TP1-livrable.md docs/tp1-jira.png
   git commit -m "QST-1 Ajouter le livrable du TP1"
   git push -u origin QST-1-livrable
   ```

5. B fusionne la PR. Les deux font `git switch main` puis `git pull`.

✅ **Réussi si** la page `https://github.com/<loginA>/devops2-tp1/blob/main/docs/TP1-livrable.md` affiche vos informations et la capture du tableau Jira.

### Critères de réussite

L'enseignant vérifie, sur le `main` du fork :

| # | Critère | Où regarder |
|---|---|---|
| 1 | Le fork existe à l'adresse `https://github.com/<loginA>/devops2-tp1` et B en est collaborateur | page du fork |
| 2 | Au moins **un commit de chaque membre** | onglet **Commits** ou `git shortlog -sn --no-merges` |
| 3 | **Chaque message de commit** que vous avez écrit commence par `QST-<n>` | onglet **Commits** |
| 4 | **Chaque branche** commence par `QST-<n>` | onglet **Pull requests → Closed**, ou les commits de fusion `Merge pull request #… from <loginA>/QST-…` |
| 5 | Les pull requests sont **fusionnées** (badge Merged) dans `<loginA>/devops2-tp1`, et non dans le dépôt de l'enseignant | onglet **Pull requests → Closed** |
| 6 | Les tickets réalisés sont **Terminés** dans Jira | capture `docs/tp1-jira.png` |
| 7 | L'application **démarre** avec `npm install` puis `npm run dev`, et `/` comme `/creer` s'affichent | clone du fork |

Ne sont pas concernés par la règle du préfixe :

- les commits de fusion créés par GitHub (`Merge pull request #…`) ;
- les commits hérités du dépôt de l'enseignant.

---

## En cas de problème

### Port 22 bloqué (SSH impossible)

**Symptôme.** `ssh -T git@github.com` reste bloqué, ou affiche `Connection timed out` ou `Connection refused`.

**Solution 1 : cloner en HTTPS avec un jeton personnel.**

1. Sur GitHub : **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**.
2. Note : `TP1 DevOps 2`. Expiration : **7 days**. Cochez la portée **`repo`**. Générez, puis **copiez le jeton tout de suite** : il ne s'affiche qu'une fois.

   > Prenez bien un jeton **classic**. Un jeton « fine-grained » ne donne pas accès au fork de A quand vous êtes B (simple collaborateur).

3. Clonez en HTTPS :

   ```bash
   git clone https://github.com/<loginA>/devops2-tp1.git
   ```

4. Au premier `git push`, Git demande un identifiant et un mot de passe. Identifiant : **votre** login GitHub. Mot de passe : **le jeton** (pas votre mot de passe GitHub). Sous Windows, une fenêtre de connexion GitHub peut s'ouvrir à la place : connectez-vous simplement dans le navigateur.

Vous avez déjà cloné en SSH ? Changez seulement l'adresse :

```bash
git remote set-url origin https://github.com/<loginA>/devops2-tp1.git
git remote -v
```

**Solution 2 : SSH par le port 443.** Ajoutez ces lignes au fichier `~/.ssh/config` (créez-le s'il n'existe pas) :

```text
Host github.com
  Hostname ssh.github.com
  Port 443
  User git
```

Puis testez à nouveau `ssh -T git@github.com`.

### `npm install` très lent ou bloqué

- Lancez `npm install` **une seule fois** et attendez. Ne l'interrompez pas avec Ctrl+C : vous perdriez le travail déjà fait.
- Pendant ce temps, avancez sur Jira avec l'autre membre.
- Allégez l'installation :

  ```bash
  npm install --no-audit --no-fund
  ```

- Vérifiez le registre : `npm config get registry` doit afficher `https://registry.npmjs.org/`.
- Réseau de l'école saturé ou filtré : demandez à l'enseignant si un proxy est à configurer, ou utilisez le partage de connexion d'un téléphone.
- Ne commitez jamais `node_modules/` : il est déjà dans `.gitignore`.

### `npm run dev` échoue : version de Node

**Symptôme.** Un message indique que Next.js demande `Node.js version ">=20.9.0"`.

**Solution.** `node -v` affiche une version trop ancienne. Installez la version LTS depuis <https://nodejs.org>, rouvrez le terminal et relancez `npm install` puis `npm run dev`.

Le port 3000 est déjà pris ? Next.js passe automatiquement sur 3001 et affiche la bonne adresse.

### Invitation de collaborateur non reçue

- B vérifie ses **spams** et l'adresse email associée à son compte GitHub.
- B ouvre directement `https://github.com/<loginA>/devops2-tp1/invitations` (en étant connecté).
- A vérifie dans **Settings → Collaborators** que l'identifiant saisi est le bon. Sinon, A annule l'invitation et la renvoie.
- Une invitation expire après 7 jours.

Invitation Jira non reçue : vérifiez les spams. A peut renvoyer l'invitation depuis **Paramètres** → **Gestion des utilisateurs**, en vérifiant que B a bien accès à **Jira**.

### Push refusé

| Message | Cause | Solution |
|---|---|---|
| `Permission denied (publickey)` | Clé SSH absente de GitHub, ou mauvaise clé | Refaites l'[étape 1.3](#13-clé-ssh) et le test `ssh -T git@github.com` |
| `Permission to <loginA>/devops2-tp1.git denied to <loginB>` (erreur 403) | B n'a pas encore accepté l'invitation | B accepte l'invitation, puis relance le push |
| `Permission to wissemwis/devops2-tp1.git denied` | Vous avez cloné le dépôt de l'enseignant | Voir [Mauvais dépôt cloné](#mauvais-dépôt-cloné) |
| `Support for password authentication was removed` | Mot de passe GitHub saisi en HTTPS | Utilisez un jeton à la place du mot de passe (voir [Port 22 bloqué](#port-22-bloqué-ssh-impossible)) |
| `! [rejected] main -> main (fetch first)` | Vous poussez sur `main` | Ne poussez pas sur `main` : créez une branche `QST-…` et passez par une PR |
| `! [rejected] QST-… (fetch first)` | La branche distante contient un commit que vous n'avez pas | `git pull origin <nom-de-la-branche>`, puis `git push` |
| `error: src refspec … does not match any` | Nom de branche mal tapé, ou aucun commit fait | `git branch` pour voir le nom exact, `git log --oneline -1` pour vérifier le commit |

### `git pull` refusé : « untracked working tree files would be overwritten »

**Cause.** Un fichier non suivi chez vous existe aussi dans le commit à récupérer.

**Solution.** Lisez la liste des fichiers affichée. Si vous ne les avez pas créés vous-même, supprimez-les puis relancez `git pull`. Sinon, déplacez-les hors du dépôt avant de relancer `git pull`.

### Mauvais dépôt cloné

**Symptôme.** `git remote -v` affiche `wissemwis/devops2-tp1` au lieu de `<loginA>/devops2-tp1`.

**Solution.** Pas besoin de tout recommencer : vos commits locaux sont conservés. Changez l'adresse du dépôt distant :

```bash
git remote set-url origin git@github.com:<loginA>/devops2-tp1.git
git remote -v
git fetch origin
```

En HTTPS : `git remote set-url origin https://github.com/<loginA>/devops2-tp1.git`.

Vous avez ouvert une pull request vers `wissemwis/devops2-tp1` ? Fermez-la avec **Close pull request**. Ouvrez-en une nouvelle en choisissant `<loginA>/devops2-tp1` comme *base repository*.
