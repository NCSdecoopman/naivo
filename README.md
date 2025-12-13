[![Naivo logo light](https://naivo.fr/logo/naivo-light.svg)](https://naivo.fr)

# Naivo.fr — Assistant web de préparation de ski de randonnée

Naivo centralise en un seul endroit les informations météo/nivologiques utiles avant une sortie :
- BERA (Bulletin d’Estimation du Risque d’Avalanche) par massif
- Observations des stations Météo-France (température, vent et hauteur de neige au pas de temps horaire)
- Webcams Windy pour vérifier visuellement les conditions
- Prévisions meteoblue (météogrammes 5 jours)
- Retours terrain Skitour (conditions et sorties)

## Objectif
Offrir une vue claire, cohérente et rapide à consulter (carte et recherche géolocalisée) pour préparer une sortie en montagne.

## Sources de données (traçabilité)
- Météo-France — API Paquet Observations : https://confluence-meteofrance.atlassian.net/wiki/spaces/OpenDataMeteoFrance/pages/854851588/API+Paquet+Observations  
- Météo-France — API Bulletin Avalanche (BERA) : https://confluence-meteofrance.atlassian.net/wiki/spaces/OpenDataMeteoFrance/pages/854196230/API+Bulletin+Avalanche  
- Windy — Webcams API : https://api.windy.com/webcams/api/v3/docs  
- meteoblue — Images API : https://docs.meteoblue.com/en/weather-apis/images-api/overview   
- Skitour — API : https://skitour.fr/api/

## Transparence & responsabilité
Les informations affichées ne remplacent ni l’analyse personnelle des conditions, ni l’expérience, ni la prise de décision sur le terrain.
Toute sortie en montagne comporte des risques : l’utilisateur reste seul responsable de la préparation et de la conduite de ses activités.

## Développement
- App web : (Astro/React/Leaflet, etc.)
- Déploiement : https://naivo.fr/
