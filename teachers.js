const fs = require('fs')
const data = require('./data.json')
const { age, graduation } = require('./utils')

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
exports.post = (req, res) => {

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

// Update

// Delete