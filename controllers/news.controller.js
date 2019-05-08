var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'server_files/'});
var newsService = require('services/news.service');

// router.post('/saveClient', upload.any(), controller_addClient);
// router.get('/readClient', controller_getClient);

module.exports = router;

// function controller_addClient(req,res) {
// 	genericService.tokenToUsrObj(req.session.token)
// 	.then(function(usrObj) {
// 		var clientData = JSON.parse(req.body.client);
// 		clientData.authorID = usrObj.authorID;
// 		clientData.createdBy = usrObj._id;
// 		clientData.active = true;
// 		clientService.addClient(req.files,clientData)
// 		.then(function(ret_cli) {
// 			if(ret_cli) {
// 				res.send(ret_cli);
// 			} else {
// 				res.sendStatus(404);
// 			}
// 		}) 
// 		.catch(function(err) {
// 			res.status(503).send(err);
// 		});
// 	})
// 	.catch(function(err) {
// 		res.status(401).send(err);
// 	});
// }

// function controller_getClient(req,res) {
// 	genericService.tokenToUsrObj(req.session.token)
// 	.then(function(usrObj) {
// 		req.body.authorID = usrObj.authorID;
// 		req.body.userType = usrObj.userType;
// 		req.body.active = true;
// 		// console.log(req.params.active);
// 		// if(req.params.active) {
// 		// 	req.body.active = req.params.active;
// 		// }
// 		// console.log(req.query.active);
// 		// if(req.query.active) {
// 		// 	req.body.active = req.query.active;
// 		// }
// 		clientService.getClient(req.body)
// 		.then(function(ret_cli) {
// 			if(ret_cli) {
// 				res.send(ret_cli);
// 			} else {
// 				res.sendStatus(404);
// 			}
// 		}) 
// 		.catch(function(err) {
// 			res.status(503).send(err);
// 		});
// 	})
// 	.catch(function(err) {
// 		res.status(401).send(err);
// 	});
// }