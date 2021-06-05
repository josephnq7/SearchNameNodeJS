var Profile = require("./profile.js");
var render = require('./renderer.js');
var querystring = require('querystring');

var commonHeader = {'Content-Type': 'text/html'};

function home(request, response) {
    if (request.url === '/') {
        if (request.method.toLowerCase() == 'get') {
            response.writeHead(200, commonHeader);
            render.view('header', {}, response);
            render.view('search', {}, response);
            render.view('footer', {}, response);
            response.end();
        } else {
            //POST
            //get the post data from body, extract the username and redirect to /username
            request.on('data', function(postBody) {
                var query = querystring.parse(postBody.toString());
                response.writeHead(303, {"Location": "/" + query.username});
                response.end();
            });

        }

    }
}

function user(request, response) {
    var username = request.url.replace('/', '');
    if (username.length > 0) {
        response.writeHead(200, commonHeader);
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