// controller for user
const db = require('../database/connection')

const getUsuarios = (request, response) => {
  db.query('SELECT * FROM usuario', (error, results) => {
    if (error) {
      console.error('Error executing query', error)
      response.status(500).send('Internal server error')
      return
    }
    response.json(results)
  })
}

const getUsuarioById = (request, response) => {
  const id = parseInt(request.params.id)

  if (isNaN(id)) {
    response.status(400).send('Bad id parameter')
    return
  }

  db.query('SELECT * FROM usuario WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.error('Error executing query', error)
      response.status(500).send('Internal server error')
      return
    }
    response.json(results)
  })
}

const registerUsuario = async (request, response) => {
  const { nombre, apellido, email, password } = request.body

  if (!nombre || !apellido || !email || !password) {
    response.status(400).send('Missing fields')
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)

  db.query(
    'INSERT INTO usuario (nombre, apellido, email, password, fechaRegistro) VALUES ($1, $2, $3, $4, $5)',
    [nombre, apellido, email, passwordHash, new Date()],
    (error, results) => {
      if (error) {
        console.error('Error executing query', error)
        response.status(500).send('Internal server error')
        return
      }
      response.status(201).send('User added successfully')
    }
  )
}
module.exports = { getUsuarios, getUsuarioById, registerUsuario }
