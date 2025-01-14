const express = require('express')
const router = express.Router()

const {
  getUsuarios,
  registerUsuario,
  getUsuarioById,
} = require('../controllers/usuario.js')

const {
  login,
  sendEmail,
  evaluateToken,
  updatePassword,
} = require('../controllers/login.js')

/*Stores*/
const { getTiendas } = require('../controllers/tienda.js')

/*Transactions*/
const {
  getTransacciones,
  getComprasById,
} = require('../controllers/transaccion.js')

const { userInfo } = require('../controllers/userInfo.js')

//rutas para la tabla persona.

//Ver las personas
router.get('/usuarios', getUsuarios)
router.get('/usuarios/:id', getUsuarioById)
router.post('/usuarios', registerUsuario)

//autenticacion
router.post('/login', login)
router.get('/userInfo', userInfo)
router.post('/sendEmail', sendEmail)
router.get('/evaluateToken/:token', evaluateToken)
router.post('/updatePassword', updatePassword)

//Routes for table 'tienda'
router.get('/getTiendas', getTiendas)

//Routes for table 'transaccion'
router.get('/getTransacciones', getTransacciones)
router.get('/getComprasById/:id', getComprasById)

module.exports = router
