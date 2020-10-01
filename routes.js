const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', (req, res) => {
    return res.redirect("/teachers")
})

/* -------------------------------------------------------------------------- */
/*                                  TEACHERS                                  */
/* -------------------------------------------------------------------------- */

routes.get('/teachers', teachers.index)

routes.get('/teachers/create', (req, res) => {
    return res.render("teachers/create")
})

routes.get('/teachers/:id', teachers.show)
routes.get('/teachers/:id/edit', teachers.edit)

routes.post("/teachers", teachers.create)

routes.put("/teachers", teachers.update)

routes.delete("/teachers", teachers.delete)

/* -------------------------------------------------------------------------- */
/*                                  STUDENTS                                  */
/* -------------------------------------------------------------------------- */

routes.get('/students', (req, res) => {
    return res.send("Students")
})

module.exports = routes