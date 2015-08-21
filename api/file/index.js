var file = function(router, args){
	var walk = require("walk");
	var path = require("path");

	router.post('/files', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		var _walker = walk.walk(path.join("Z://", req.body.path));

		var _files = [];
		
		_walker.on("file", function (root, fileStats, next){
			_files.push(fileStats);
			next();
		});	

		_walker.on("end", function () {
	 		res.status(200);
	 		res.send(_files);		 	
		});

	});
};

module.exports = file;