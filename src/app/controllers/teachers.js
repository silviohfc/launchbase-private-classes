const { age, graduation, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render("teachers/index")
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

        let { avatar_url, name, birth, degree, class_type, subjects } = req.body

        return
    },

    show(req, res) {
        return
    },

    edit(req, res) {
        return
    },

    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please fill all the fields")
            }
        }

        return
    },
    
    delete(req, res) {
        return
    },
}