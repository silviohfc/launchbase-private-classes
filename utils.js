module.exports = {
    age: timestamp => {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age -= 1
        }

        return age
    },
    graduation: degree => {
        switch (degree) {
            case "high_school":
                return "High School"
                break
            case "associate":
                return "Associate's Degree"
                break
            case "bachelor":
                return "Bachelor's Degree"
                break
            case "master":
                return "Master's Degree"
                break
            case "doctoral":
                return "Doctoral Degree"
                break
            case "professional":
                return "Professional Degree"
                break
            default:
                break
        }
    },
    date: timestamp => {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    grade: grade => {
        let school = grade.slice(0,2)
        const gradeN = grade.slice(2)

        if (school == "ms") {
            school = "Middle School"
        } else {
            school = "High School"
        }

        return `${school} ${gradeN}th Grade`
    }
}