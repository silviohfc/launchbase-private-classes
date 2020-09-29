module.exports = {
    age: timestamp => {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
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
    }
}