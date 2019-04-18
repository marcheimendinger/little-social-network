# Requêtes à l'API

## `/user`

### `/register`
Inscription d'un nouvel utilisateur.

### `/login`
Connexion d'un utilisateur.

### `/update`
Mise à jour des informations de l'utilisateur connecté.

### `/view/:user_id`
Récupération de toutes les données d'un utilisateur.

### `/search/:search_content`
Récupération du résultat de la recherche d'un utilisateur (avec indication du lien d'amitié avec l'utilisateur connecté).

## `/friend`

### `/view/:user_id`
Récupération de tous les amis d'un utilisateur.

### `/mutuals/:user_id`
Récupération des amis communs entre un utilisateur et l'utilisateur connecté.

### `/invite/:user_id`
Invitation d'un utilisateur par l'utilisateur connecté.

### `/invitations`
Récupération de toutes les demandes d'amitié envers l'utilisateur connecté.

### `/accept/:user_id`
Acceptation de la demande de `user_id` par l'utilisateur connecté.

### `/suggestions`
Récupération de 10 amis probables de l'utilisateur connecté.

## `/post`

### `/publish`
Publication d'un post par l'utilisateur connecté.

### `/feed`
Récupération de tous les posts des amis de l'utilisateur connecté.

### `/by/:user_id`
Récupération de tous les posts d'un utilisateur.

### `/share/:post_id`
Partage d'un post par l'utilisateur connecté.