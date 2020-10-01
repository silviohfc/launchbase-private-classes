const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')

routes.get('/', (req, res) => {
    return res.redirect("/teachers")
})

/* -------------------------------------------------------------------------- */
/*                                  TEACHERS                                  */
/* -------------------------------------------------------------------------- */

routes.get('/teachers', teachers.index)
routes.get('/teachers/create', teachers.createRedir)
routes.get('/teachers/:id', teachers.show)
routes.get('/teachers/:id/edit', teachers.edit)
routes.post("/teachers", teachers.create)
routes.put("/teachers", teachers.update)
routes.delete("/teachers", teachers.delete)

/* -------------------------------------------------------------------------- */
/*                                  STUDENTS                                  */
/* -------------------------------------------------------------------------- */

routes.get('/students', students.index)
routes.get('/students/create', students.createRedir)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post("/students", students.create)
routes.put("/students", students.update)
routes.delete("/students", students.delete)

module.exports = routes