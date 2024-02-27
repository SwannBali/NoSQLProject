# Hi Legends 👋
# <p align="center">Bienvenue sur la doc de notre projet NoSQL</p>
  
Le projet est un petit site qui permet de faire une recherche sur une base de donnée de produits avec du Redis et du Mongo en back-end.


## 🛠️ Tech Stack
- [Adonis Js](https://adonisjs.com/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)


## 🛠️ Installation
Clonez:

```bash
git clone https://github.com/SwannBali/NoSQLProject.git
```

Ensuite:

```bash
cd /NoSQLProject
```


Vous devez normalement être au même endroit que le `dockercompose.yml`  et lancez :

```bash
docker compose up --build
```

Après ça attendez que toutes l'installation et lancement soit terminé.
Quand dans votre terminal affichera:

```shell
nosqlproject-frontend-1  |  ✓ Ready in 2.4s
```
Rendez-vous sur:

[localhost:3000/login](http://localhost:3000/login)


## A savoir !!

Nous utilisons NextJs, autrement dit le premier chargement de chaque pages peux être un peu long car les pages sont rendu côté serveur et nous simulons un serveur donc soyez patient.

## Enfin

Pour l'import en json dans la route [localhost:3000/import](http://localhost:3000/import) : 

Voici le format de données attendu:

```json
[
  {
    "name": "Ordinateur portable",
    "description": "PC portable ultra-fin",
    "price": 99.99
  },
  {
    "name": "Smartphone",
    "description": "Téléphone intelligent avec caméra haute résolution",
    "price": 49.99
  },
  {
    "name": "Console de jeux",
    "description": "Console de jeux vidéo nouvelle génération",
    "price": 399.99
  }
]
```


## 🙇 Authors
#### Bali Swann
- Github: [@Kevin](https://github.com/kevindecaux)

#### Decaux Kevin
- Github: [@Swann](https://github.com/SwannBali)
