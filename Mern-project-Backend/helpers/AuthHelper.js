module.exports.createToken = (id) => {
    return jwt.sign({ id }, "secret key", {
        expiresIn: MAX_AGE
    })
}

// Eror handleing
module.exports.handleErrors = (err) => {
    let errors = { email: "", password: "" };
    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }
    

    if (err.message.includes("Users validation failed")) {
        errors.email = "varificatun faield";
        return errors;
    }

}