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

**Format des données envoyées**
```
{
    "username": [string] (required),
    "first_name": [string] (required),
    "last_name": [string] (required),
    "email": [string] (required),
    "password": [string] (required),
    "birth_date": [string datetime],
    "gender": [string 'm', 'f' or 'o'],
    "location": [string],
    "description": [string]
}
```

### `/user/login`
Connexion d'un utilisateur.

**Méthode** `POST`

**Authentification requise** Non

**Format des données envoyées**
```
{
    "username": [string] (required),
    "password": [string] (required)
}
```

### `/user/logout`
Déconnexion d'un utilisateur coté serveur.

**Méthode** `GET`

**Authentification requise** Oui

### `/user/update`
Mise à jour des informations de l'utilisateur connecté.

**Méthode** `POST`

**Authentification requise** Oui

**Format des données envoyées**
```
{
    "username": [string],
    "first_name": [string],
    "last_name": [string],
    "email": [string],
    "password": [string],
    "birth_date": [string datetime],
    "gender": [string 'm', 'f' or 'o'],
    "location": [string],
    "description": [string]
}
```

### `/user/view?user_id` `/user/view?username`
Récupération de toutes les données d'un utilisateur (`user_id` ou `username`).

Le paramètre `username` est ignoré si `user_id` est également présent.

**Méthode** `GET`

**Authentification requise** Oui

**Format des données reçues**
```
{
    "id": [integer],
    "username": [string],
    "first_name": [string],
    "last_name": [string],
    "birth_date": [string datetime],
    "gender": ['m', 'f' or 'o']",
    "location": [string],
    "description": [string],
    "created": [string datetime],
    "is_friend": [boolean]
}
```

### `/user/view?user_id=me`
Récupération de toutes les données de l'utilisateur connecté.

**Méthode** `GET`

**Authentification requise** Oui

**Format des données reçues**
```
{
    "id": [integer],
    "username": [string],
    "first_name": [string],
    "last_name": [string],
    "birth_date": [string datetime],
    "gender": [string 'm', 'f' or 'o'],
    "location": [string],
    "description": [string],
    "created": [string datetime],
    "email": [string]
}
```

### `/user/search?search_content`
Récupération du résultat de la recherche (`search_content`) d'un utilisateur (avec indication du lien d'amitié avec l'utilisateur connecté).

**Méthode** `GET`

**Authentification requise** Oui

**Format des données reçues**
```
[
    {
        "id": [integer],
        "username": [string],
        "first_name": [string],
        "last_name": [string],
        "birth_date": [string datetime],
        "gender": [string 'm', 'f' or 'o'],
        "location": [string],
        "description": [string],
        "created": [string datetime]
    },
    ...
]
```

## Amis

### `/friend/view?user_id`
Récupération de tous les amis d'un utilisateur (`user_id`). Ce dernier doit être ami avec l'utilisateur connecté (sinon retourne une erreur).

Si `user_id` est égal à `me`, les amis de l'utilisateur connecté sont retournés.

**Méthode** `GET`

**Authentification requise** Oui

**Format des données reçues**
```
[
    {
        "id": [integer],
        "username": [string],
        "first_name": [string],
        "last_name": [string],
        "birth_date": [string datetime],
        "gender": [string 'm', 'f' or 'o'],
        "location": [string],
        "description": [string],
        "created": [string datetime],
    },
    ...
]
```

### `/friend/mutuals?user_id`
Récupération des amis communs entre un utilisateur (`user_id`) et l'utilisateur connecté.

**Méthode** `GET`

**Authentification requise** Oui

**Format des données reçues**
```
[
    {
        "id": [integer],
        "username": [string],
        "first_name": [string],
        "last_name": [string],
        "birth_date": [string datetime],
        "gender": [string 'm', 'f' or 'o'],
        "location": [string],
        "description": [string],
        "created": [string datetime],
    },
    ...
]
```

### `/friend/invite`
Invitation d'un utilisateur par l'utilisateur connecté.

**Méthode** `POST`

**Authentification requise** Oui

**Format des données envoyées**
```
{
    "user_id": [integer]
}
```

### `/friend/invitations`
Récupération de toutes les demandes d'amitié envers l'utilisateur connecté.

**Méthode** `GET`

**Authentification requise** Oui

**Format des données reçues**
```
[
    {
        "user_id": [integer],
        "username": [string],
        "first_name": [string],
        "last_name": [string],
        "birth_date": [string datetime],
        "gender": [string 'm', 'f' or 'o'],
        "location": [string],
        "description": [string],
        "user_created": [string datetime],
        "invitation_created": [string datetime]
    },
    ...
]
```

### `/friend/accept`
Acceptation de la demande d'un utilisateur par l'utilisateur connecté.

**Méthode** `POST`

**Authentification requise** Oui

**Format des données envoyées**
```
{
    "user_id": [integer]
}
```

### `/friend/suggestions`
Récupération de 10 amis probables (proposition aléatoire à chaque requête) pour l'utilisateur connecté.

**Méthode** `GET`

**Authentification requise** Oui

**Format des données reçues**
```
[
    {
        "id": [integer],
        "username": [string],
        "first_name": [string],
        "last_name": [string],
        "birth_date": [string datetime],
        "gender": [string 'm', 'f' or 'o'],
        "location": [string],
        "description": [string],
        "created": [string datetime]
    },
    ...
]
```

## Posts

### `/post/publish`
Publication d'un post par l'utilisateur connecté.

**Méthode** `POST`

**Authentification requise** Oui

**Format des données envoyées**
```
{
    "post_content": [string]
}
```

### `/post/feed?paging`
Récupération de tous les posts et partages des amis de l'utilisateur connecté par pages de 10 éléments dans l'ordre chronologique (du plus récent au plus ancien).

Paramètre `paging` facultatif (0 par défaut).

**Méthode** `GET`

**Authentification requise** Oui

**Format des données reçues**

Si la section `share_*` n'est pas `null`, le post a été partagé par l'utilisateur indiqué.

`created` indique toujours la date originale de publication du post, même pour un partage.

```
[
    {
        "post_user_id": [integer],
        "post_username": [string],
        "post_first_name": [string],
        "post_last_name": [string],
        "share_user_id": [integer || null],
        "share_username": [string || null],
        "share_first_name": [string || null],
        "share_last_name": [string || null],
        "post_id": [integer],
        "content": [string],
        "created": [datetime]
    },
    ...
]
```

### `/post/by?user_id&paging`
Récupération de tous les posts d'un utilisateur (`user_id`) ami avec l'utilisateur connecté par pages de 10 éléments dans l'ordre chronologique (du plus récent au plus ancien).

Si `user_id` est égal à `me`, les posts de l'utilisateur connecté sont retournés.

Paramètre `paging` facultatif (0 par défaut).

**Méthode** `GET`

**Authentification requise** Oui

**Format des données reçues**
Si `share_user_id` n'est pas `null`, le post a été partagé par l'utilisateur indiqué.
```
[
    {
        "post_user_id": [integer],
        "share_user_id": [integer || null],
        "post_id": [integer],
        "content": [string],
        "created": [string datetime]
    },
    ...
]
```

### `/post/share`
Partage d'un post (`post_id`) par l'utilisateur connecté.

**Méthode** `POST`

**Authentification requise** Oui

**Format des données envoyées**
```
{
    "post_id": [integer]
}
```