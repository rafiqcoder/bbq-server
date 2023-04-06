const { emailFooter } = require("./emailFooter");
const { emailHead,emailUpperBody } = require("./emailHead");
const { emailProducts } = require("./emailProducts");

module.exports.EmailTemplate = (data) => {
    const emailtemplate = emailHead() + emailUpperBody() + emailProducts(data) + emailFooter();
    return emailtemplate
}