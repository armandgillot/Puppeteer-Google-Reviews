# Avis Google avec Puppeteer

Projet simple permettant de récupérer les avis Google d'une société sans passer par PlaceAPI ou autre, avec possibilité de trier les avis au dessus d'une certaine note .

## Exemple de fonctionnement

> | Nom entreprise ou autre | /google-reviews?search=                    |
> | ----------------------- | ------------------------------------------ |
> | Fnac à Lyon Part-Dieu   | /google-reviews?search=fnac+part-dieu+lyon |
> | McDonald's Annecy       | /google-reviews?search=mcdonalds+annecy    |

### Réponse

    "result": {
        "name": "FNAC Lyon Part-Dieu",
        "rating": "3,9",
        "number_rating": "5 539 avis",
        "reviews": [
            {
                "pseudo": "YW100 PROD",
                "comment": "Très bon magasin mais très cher sur certain produit comparé à la concurrence qui fais des promo",
                "rating": "4",
                "time": "il y a 2 jours",
                "img": "https://lh3.googleusercontent.com/a-/AOh14GgKYPkhcHmvhvIpAvHpvCTxmlNj92z0xi0aN0e_LQ=s40-c-c0x00000000-cc-rp-mo-ba3-br100"
            },
            { ... },
            { ... },
            { ... },
        ]
    }
