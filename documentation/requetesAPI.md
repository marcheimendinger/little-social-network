# Requêtes à l'API

## Utilisateur

### `/user/register`
Inscription d'un nouvel utilisateur.

### `/user/login`
Connexion d'un utilisateur.

### `/user/update`
Mise à jour des informations de l'utilisateur connecté.

### `/user/view/:user_id`
Récupération de toutes les données d'un utilisateur (`user_id`).

### `/user/search/:search_content`
Récupération du résultat de la recherche (`search_content`) d'un utilisateur (avec indication du lien d'amitié avec l'utilisateur connecté).

## Amis

### `/friend/view/:user_id`
Récupération de tous les amis d'un utilisateur (`user_id`).

### `/friend/mutuals/:user_id`
Récupération des amis communs entre un utilisateur (`user_id`) et l'utilisateur connecté.

### `/friend/invite/:user_id`
Invitation d'un utilisateur (`user_id`) par l'utilisateur connecté.

### `/friend/invitations`
Récupération de toutes les demandes d'amitié envers l'utilisateur connecté.

### `/friend/accept/:user_id`
Acceptation de la demande d'un utilisateur (`user_id`) par l'utilisateur connecté.

### `/friend/suggestions`
Récupération de 10 amis probables (proposition aléatoire à chaque requête) pour l'utilisateur connecté.

## Posts

### `/post/publish`
Publication d'un post par l'utilisateur connecté.

### `/post/feed`
Récupération de tous les posts et partages des amis de l'utilisateur connecté.

### `/post/by/:user_id`
Récupération de tous les posts d'un utilisateur (`user_id`).

### `/post/share/:post_id`
Partage d'un post (`post_id`) par l'utilisateur connecté.