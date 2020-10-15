const { age, graduation, date } = require('../../lib/utils')
const Teacher = require('../models/Teacher')

module.exports = {
    index(req, res) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 7
        let offset = limit * (page - 1)
        
        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers) {
                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }

                return res.render("teachers/index", {teachers, pagination, filter})
            }
        }

        Teacher.paginate(params)
        
    },

    createRedir(req, res) {
        return res.render("teachers/create")
    },

    create(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please fill all the fields")
            }
        }

        Teacher.create(req.body, teacher => {
            return res.redirect(`teachers/${teacher.id}`)
        })
    },

    show(req, res) {
        Teacher.find(req.params.id, teacher => {
            if (!teacher) return res.send("Teacher not found!")

            teacher.created_at = date(teacher.created_at).iso
            teacher.age = age(teacher.birth_date)
            teacher.degree = graduation(teacher.education_level)
            teacher.subjects = teacher.subjects.split(",")

            return res.render('teachers/show', { teacher })
        })
    },

    edit(req, res) {
        Teacher.find(req.params.id, teacher => {
            if (!teacher) return res.send("Teacher not found!")

            teacher.birth = date(teacher.birth_date).iso
            teacher.degree = teacher.education_level
            teacher.subjects = teacher.subjects.split(",")

            return res.render('teachers/edit', { teacher })
        })
    },

    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please fill all the fields")
            }
        }

        Teacher.update(req.body, () => {
            return res.redirect(`teachers/${req.body.id}`)
        })
    },
    
    delete(req, res) {
        Teacher.delete(req.body.id, () => {
            return res.redirect('teachers')
        })
    },
}