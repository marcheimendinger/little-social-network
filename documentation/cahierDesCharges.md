# Cahier des charges (réseau social)

## I - Description du projet



## II - Travail demandé

Implémenter un site Internet dynamique de type réseau social d'échange de médias (similaire à FaceBook) avec des profils utilisateurs, des liens d'amis et des publications de posts.

### 1 - Étude théorique

Analyser les objectifs du projet à l'aide de différents outils de modélisation, tels que :

- Modèle des objectifs
- Modèle des acteurs
- Modèle des processus et règles
- Modèle des concepts
- Modèle des cas d'utilisation
- Modèle des exigences

### 2 - Conception

Concrétiser les différents résultats de l'étude théorique en un modèle conceptuel représentant les données nécessaires ainsi que les algorithmes utiles au bon fonctionnement du système.

### 3 - Réalisation et tests

Créer la base de données en fonction du modèle précédemment trouvé et implémenter le système. Récupérer des données de test à ajouter dans la base de données en utilisant par exemple l'API de FaceBook ou un générateur de données.

## III - Compréhension du sujet

### 1 - Objectifs techniques

- Utiliser un système récursif permettant de retrouver des données (amis et posts)
- Charger dynamiquement les données lors du défilement du fil d'actualité
- Implémenter une API pour récupérer les données du serveur depuis le client

### 2 - Besoins fonctionnels

L'utilisateur doit pouvoir...

- s'inscrire sur le site,
- ajouter des amis,
- afficher sa propre liste d'amis,
- afficher la liste d'amis de ses amis,
- recevoir des suggestions d'amis probables (basés sur les amis en communs),
- publier des posts sur son compte,
- afficher son fil d'actualité (avec les dernières publications de ses amis).

### 3 - Besoins non fonctionnels

- Charger rapidement les données dans le fil d'actualité au fur et à mesure
- 

## IV - Environnement

L'utilisation du réseau social se limite aux utilisateurs inscrits sur le site.

### 1 - Logiciel

Les technologies utilisées pour ce projet sont toutes open sources.

- MySQL
- Node.js
- React
- Git

### 2 - Matériel

La base de données sera stockée sur un serveur MySQL de l'Université de Genève. Le système sera executé en local sur les ordinateurs des étudiants.