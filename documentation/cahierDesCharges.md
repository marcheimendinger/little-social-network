# Cahier des charges (réseau social)

## I - Description du projet

Réseau social permettant à un membre d'avoir des amis (autres membres du réseau) et de publier des posts visibles par ses amis.

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

Utiliser les différents résultats de l'étude théorique pour la conception, qui se compose de :

- Modèle conceptuel représentant la base de données
- Algorithmes utiles au bon fonctionnement du système
- Modèle du fonctionnement général de l'application
- Modèle de l'interface et ergonomie de l'application

### 3 - Réalisation et tests

Créer la base de données en fonction du modèle précédemment trouvé et implémenter le code nécessaire au système. Récupérer des données de test à ajouter dans la base de données en utilisant par exemple l'API de FaceBook ou un générateur de données.

## III - Compréhension du sujet

### 1 - Objectifs techniques

- Utiliser un fonctionnement récursif permettant de retrouver les données (amis et posts)
- Implémenter une API pour récupérer les données du serveur depuis le client

### 2 - Besoins fonctionnels

L'utilisateur doit pouvoir...

- s'inscrire sur le site,
- ajouter des amis,
- afficher sa propre liste d'amis,
- afficher la liste d'amis de ses amis,
- recevoir des suggestions d'amis probables grâce aux amis en commun,
- publier des posts sur son compte,
- afficher son fil d'actualité avec les dernières publications de ses amis.

### 3 - Besoins non fonctionnels

- Le service doit être facile d'utilisation et une phase d'apprentissage ne doit pas être nécessaire
- L'interface doit être adaptée à un usage mobile
- Le service doit être disponible 24h/24h
- Le service doit être compatible depuis n'importe quel navigateur Internet
- Les données doivent être rapidement chargées dans le fil d'actualité au fur et à mesure du défilement
- Les publications d'un utilisateur doivent être visibles uniquement par ses amis

## IV - Environnement

L'utilisation du service se limite aux utilisateurs inscrits sur le site.

### 1 - Logiciel

Les technologies utilisées pour ce projet sont toutes open sources.

- Base de données : MySQL
- Application serveur : Node.js
- Application client : React
- Gestion du code (versions, etc.) : Git

### 2 - Matériel

La base de données est stockée sur un serveur de l'Université de Genève. Le système est executé en local sur les ordinateurs des étudiants.