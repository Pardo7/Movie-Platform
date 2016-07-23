// Getting our home page
exports.index = function(request, response) {
  response.render('index.html');
};

exports.partials = function(request, response) {
    var name = request.params.name;
    response.render('partials/' + name);
};