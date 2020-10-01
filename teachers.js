const fs = require('fs')
const data = require('./data.json')
const { age, graduation, date } = require('./utils')

// Index
exports.index = (req, res) => {
    return res.render("teachers/index", { teachers: data.teachers })
}

// Show
exports.show = (req, res) => {
    const { id } = req.params

    const foundTeacher = data.teachers.find(teacher => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")


    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        subjects: foundTeacher.subjects.split(','),
        degree: graduation(foundTeacher.degree),
        created_at: new Intl.DateTimeFormat("en-US").format(foundTeacher.created_at)
    }

    return res.render("teachers/show", { teacher })
}

// Create
exports.create = (req, res) => {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please fill all the fields")
        }
    }

    let { avatar_url, name, birth, degree, class_type, subjects } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        degree,
        class_type,
        subjects,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send("Write file error!")

        return res.redirect("/teachers")
    })

}

// Edit
exports.edit = (req, res) => {
    const { id } = req.params

    const foundTeacher = data.teachers.find(teacher => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render("teachers/edit", { teacher })
}

// Update
exports.update = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if(err) return res.send("Write file error!")

        return res.redirect(`/teachers/${id}`)
    })
}

// Delete
exports.delete = (req, res) => {
    const { id } = req.body
    
    const filteredTeachers = data.teachers.filter(teacher => {
        return teacher.id != id
    })

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send("Write file error!")

        return res.redirect("/teachers")
    })
}