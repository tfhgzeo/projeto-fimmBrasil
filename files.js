async function getFile(matricula) {
    const fs = require("fs");
    let a = await fs.readFileSync("./101201.pdf", "base64");

    return a.toString();
}

module.exports = {
    getFile,
};
