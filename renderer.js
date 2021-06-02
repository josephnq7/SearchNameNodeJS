var fs = require('fs');

function mergeValues(values, content) {
    for (var key in values) {
        content = content.replace("{{" + key + "}}", values[key]);
    }
    return content;
}

function view(templateName, values, response) {

    // Read from the template file
    var fileContents = fs.readFileSync('./views/' + templateName + '.html', {"encoding": "utf8"});

    // Insert values in to the content
    fileContents = mergeValues(values, fileContents);

    //Write out the response
    response.write(fileContents);
}

module.exports.view = view;