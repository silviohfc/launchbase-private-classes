const { date, grade } = require('../../lib/utils')
const Student = require('../models/Student')

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
            callback(students) {
                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }

                return res.render("students/index", {students, pagination, filter, grade})
            }
        }

        Student.paginate(params)
        
    },

    createRedir(req, res) {
        Student.teachersSelectOptions(options => {
            return res.render("students/create", { teacherOptions: options })
        })

    },

    create(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please fill all the fields")
            }
        }

        Student.create(req.body, student => {
            return res.redirect(`students/${student.id}`)
        })
    },

    show(req, res) {
        Student.find(req.params.id, student => {
            if (!student) return res.send("Student not found!")

            student.birth = date(student.birth_date).iso
            student.grade = grade(student.grade)

            return res.render('students/show', { student })
        })
    },

    edit(req, res) {
        Student.find(req.params.id, student => {
            if (!student) return res.send("Student not found!")

            student.birth = date(student.birth_date).iso

            Student.teachersSelectOptions(options => {
                return res.render("students/edit", { student, teacherOptions: options })
            })
        })
    },

    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please fill all the fields")
            }
        }

        Student.update(req.body, () => {
            return res.redirect(`students/${req.body.id}`)
        })
    },
    
    delete(req, res) {
        Student.delete(req.body.id, () => {
            return res.redirect('students')
        })
    },
}