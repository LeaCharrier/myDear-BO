# FRONTEND APP

> :warning: Aucun push ou de merge request autorisé.
Cas exceptionnel pour présentation du POC.

# Presentation du workflow git

- En fonction du sprint nous aurons une branch adéquat par exemple : **v1.0**

- Chaque branch a l'intérieur de la **v1.0** devra être déclaré explicitement en fonction de la taches à accomplir par exemple : **feature/xxx** ou **fix/xxx**

- Si le sprint de la **v1.0** est terminé nous devrons un merge de la branch **v1.0** sur la branch **dev**

- Pour la présentation de notre POC nous allons merge **dev** sur **master** à aucun autre moment

# APP

- Avant de push sur le repo, vous devrez tester si le linter ne casse pas, si il casse alors il faudra corriger la commande pour tester est : **yarn lint**

- Même chose pour les tests unitaires la commande est : **yarn test**
- Même chose pour les tests fonctionnel **(A faire !)**


