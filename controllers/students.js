const fs = require('fs')
const data = require('../data.json')
const { age, graduation, date } = require('../utils')

// Index
exports.index = (req, res) => {
    return res.render("students/index", { students: data.students })
}

// Show
exports.show = (req, res) => {
    const { id } = req.params

    const foundStudent = data.students.find(student => {
        return student.id == id
    })

    if (!foundStudent) return res.send("Student not found!")


    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        degree: graduation(foundStudent.degree),
    }

    return res.render("students/show", { student })
}

// Create Redirect
exports.createRedir = (req, res) => {
    return res.render("students/create")
}

// Create
exports.create = (req, res) => {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please fill all the fields")
        }
    }

    birth = Date.parse(req.body.birth)

    let id = 1
    const lastStudent = data.students[data.students.length - 1]
    
    if (lastStudent) {
        id = lastId + 1
    }

    data.students.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send("Write file error!")

        return res.redirect("/students")
    })

}

// Edit
exports.edit = (req, res) => {
    const { id } = req.params

    const foundStudent = data.students.find(student => {
        return student.id == id
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth)
    }

    return res.render("students/edit", { student })
}

// Update
exports.update = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find((student, foundIndex) => {
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if(err) return res.send("Write file error!")

        return res.redirect(`/students/${id}`)
    })
}

// Delete
exports.delete = (req, res) => {
    const { id } = req.body
    
    const filteredStudents = data.students.filter(student => {
        return student.id != id
    })

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send("Write file error!")

        return res.redirect("/students")
    })
}