function convertPdf(matricula) {
    const path = require("path");
    const pdf = require("pdf-poppler");

    let file = __dirname + "/HOLERITES/" + matricula + ".pdf";

    let opts = {
        format: "jpeg",
        out_dir: __dirname + "/HOLERITES/img/",
        out_prefix: path.basename(file, path.extname(file)),
        page: null,
    };

    pdf.convert(file, opts)
        .then((res) => {
            return "ok";
        })
        .catch((error) => {
            console.error(error);
            return error;
        });
}

module.exports = {
    convertPdf,
};
