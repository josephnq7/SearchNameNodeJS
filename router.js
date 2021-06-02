var Profile = require("./profile.js");
var render = require('./renderer.js');

function home(request, response) {
    if (request.url === '/') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        render.view('header', {}, response);
        render.view('search', {}, response);
        render.view('footer', {}, response);
        response.end();
    }
}

function user(request, response) {
    var username = request.url.replace('/', '');
    if (username.length > 0) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        render.view('header', {}, response);

        //get json from Treehouse
        var studentProfile = new Profile(username);

        // on "end"
        studentProfile.on("end", function(profileJSON) {
            //show profile

            //Store the values which we need
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript,
            };

            //simple response
            render.view('profile', values, response);
            render.view('footer', {}, response);
            response.end();
        });

        // on "error"
        studentProfile.on("error", function(error) {
            render.view('error', {errorMessage: error.message}, response);
            render.view('search', {}, response);
            render.view('footer', {}, response);
            response.end();
        });
    }
}

module.exports.home = home;
module.exports.user = user;