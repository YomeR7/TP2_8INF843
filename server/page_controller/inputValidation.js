/******************************************
 * Fichier de validation des inputs 
 ******************************************/
const joi = require('joi');

/* Middleware de validation */
const validation = (schema, property) => {
  return (req, res, next) => {
    const { error } = joi.validate(req.body, schema, { abortEarly: false }); //abortEarly permet d'avoir toute les erreurs dans les inputs
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(', ');

      console.log("error", message);
      res.status(422).json({ error: message })
    }
  }
}

/*  Schemas de validation
    TODO:Ajouter des schemas pour chaque champs d'input
*/
const inscriptionSchema = joi.object().keys({
  login: joi.string().trim().alphanum().max(10).required(),
  password: joi.string().min(5).max(10).required(),
  nom: joi.string().required(),
  prenom: joi.string().required(),
  email: joi.string().trim().email().required(),
  tel: joi.string().required(),
  prefs: joi.string()
})

const authSchema = joi.object().keys({
  login: joi.string().trim().alphanum().max(10).required(),
  password: joi.string().min(5).max(10).required()
})

const trajetSchema = joi.object().keys({
  date:joi.date().required(),
  hDepart: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
  hArrive: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
  lieuDepart: joi.string().required(),
  lieuArrivee: joi.string().required(),
  nbPlace:joi.number().required()
})

const findSchema = joi.object().keys({
  date: joi.date(),
  hDepart: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
  hArrive: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
  lieuDepart: joi.string().required(),
  lieuArrivee: joi.string().required(),
  nbPlace:joi.number().required()
})

module.exports = {
  validation,
  inscriptionSchema,
  authSchema,
  trajetSchema,
  findSchema
};