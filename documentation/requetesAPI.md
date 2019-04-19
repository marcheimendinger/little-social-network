# Requêtes à l'API

## Codes de réponse

### Réussite
Si le traitement est réussi et aucune donnée en retour est attendue, un code **200** est renvoyé avec un objet `{'success': true}`.

### Erreur de traitement
Si le traitement de la requête s'est mal passé (erreur MySQL, etc.), une erreur **500** est renvoyée avec un objet `error` contenant les informations sur l'erreur.

### Erreur d'autorisation
Si l'utilisateur essaye d'accéder à une ressource sans en avoir l'accès, une erreur **401** est renvoyée avec le message `Unauthorized`.

## Utilisateur

### `/user/register`
Inscription d'un nouvel utilisateur. L'utilisateur est ensuite directement connecté (création d'une session avec cookie).

**Méthode** `POST`

**Authentification requise** Non

**Format des données**
```
{
    "username": "[string]" (required),
    "first_name": "[string]" (required),
    "last_name": "[string]" (required),
    "email": "[string]" (required),
    "password": "[string]" (required),
    "birth_date": "[dd.mm.yyyy]",
    "gender": "['m', 'f' or 'o']",
    "location": "[string]",
    "description": "[string]"
}
```

### `/user/login`
Connexion d'un utilisateur.

**Méthode** `POST`

**Authentification requise** Oui

**Format des données**
```
{
    "username": "[string]" (required),
    "password": "[string]" (required)
}
```

### `/user/logout`
Déconnexion d'un utilisateur coté serveur.

**Méthode** `GET`

**Authentification requise** Oui

### `/user/update`
Mise à jour des informations de l'utilisateur connecté.

### `/user/view/:user_id`
Récupération de toutes les données d'un utilisateur (`user_id`).

**Méthode** `GET`

**Authentification requise** Oui

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