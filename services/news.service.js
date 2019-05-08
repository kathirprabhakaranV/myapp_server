var Q = require('q');
var fs = require('fs');
var moment = require('moment');
var schemaObj = require('model/schema.model');
var ObjectId = require('mongodb').ObjectID;

var newsService = {};

// newsService.addClient = service_addClient;
// newsService.getClient = service_getClient;

module.exports = newsService;

// function service_addClient(clientProof,clientObj) {
// 	var deferred = Q.defer();
// 	var proofs = {}, clientResObj = {}, userResObj = {}, ledgerResObj = {}, empResObj = {};
	
// 	clientObj.creationTime = moment(new Date()).format('YYYY-MM-DD') + " " + moment(new Date()).format('HH:mm:ss');
	
// 	var clientClone = JSON.parse(JSON.stringify(clientObj));
// 	var clientPromise = function() {
// 		return Q.Promise(function(resolve,reject) {
// 			schemaObj.clientModel.create(clientObj, function (err, client) {
// 				if(err){
// 					for(key in clientProof) {
// 						fs.unlink(clientProof[key].path, (err) => {
// 							if(err) 
// 								throw err;
// 							console.log(clientProof[key].path+' was deleted');
// 						});
// 					}
// 					console.log(err);
// 					reject(err);
// 				}
// 				clientResObj = client;
// 				resolve(client);
// 			});
// 		});
// 	}
// 	var userPromise = function(ret_client) {
// 		var user = {email: ret_client.signupMail, parentID: ret_client.authorID, userType: 'd', active: true, refName: 'client', refID: ret_client._id, createdBy: ret_client.createdBy, creationTime: moment(new Date()).format('YYYY-MM-DD') + " " + moment(new Date()).format('HH:mm:ss')};
// 		return Q.Promise(function(resolve, reject) {
// 			userService.addUser(user)
// 			.then(function(ret_user) {
// 				console.log("INFO: Successfully added user record");
// 				userResObj = ret_user;
// 				schemaObj.userModel.findOneAndUpdate({refID: ret_client._id}, {$set: {'authorID': ret_user._id, modifiedBy: ret_client.createdBy, modifiedDate: moment(new Date()).format('YYYY-MM-DD'), modifiedTime: moment(new Date()).format('HH:mm:ss')}}, function(err1, ret_user1) {
// 					if(err1) {
// 						console.log(err1);
// 						reject(err1);
// 					}
// 					if(ret_user1){
// 						resolve({client: ret_client,user: ret_user});
// 					}
// 				});
// 			})
// 			.catch(function(err) {
// 				console.log(err);
// 		        reject(err);
// 			});		        
// 		})
// 	}
// 	var employeePromise = function(ret_usr) {
// 		var hrFiles = {}, hrObj = {};
// 		//set default option for distributor admin
// 		/*var defaultOption = {'view': true, 'new': true, 'edit': true, 'delete': true};
// 		hrObj.permission = {
// 		'master': {'client': defaultOption,'accounts': defaultOption,'generalMaster': defaultOption,'hr': defaultOption,'product': defaultOption,'supplier': defaultOption,'master': defaultOption},
// 		'inventory': {'purchaseAck': defaultOption,'purchaseOrder': defaultOption,'purchaseOrderManagement': defaultOption,'sales': defaultOption,'salesOrder': defaultOption,'salesOrderManagement': defaultOption,'stockRegister': defaultOption,'stockStatus': defaultOption,'stockTransfer': defaultOption,'inventory': defaultOption},
// 		'hr': {'employee': defaultOption,'expense': defaultOption,'hr': defaultOption},
// 		'accounts': {'accountStatement': defaultOption,'contra': defaultOption,'creditNote': defaultOption,'debitNote': defaultOption,'journal': defaultOption,'ledger': defaultOption,'paymentVoucher': defaultOption,'receiptVoucher': defaultOption,'accounts': defaultOption}
// 		};*/
// 		hrObj = {signupMail: ret_usr.user.email, authorID: ret_usr.user._id, modifiedBy: clientObj.createdBy};
// 		return Q.Promise(function(resolve, reject) {
// 			HRService.addEmployee(hrFiles, hrObj)
// 			.then(function(ret_emp) {
// 				console.log("INFO: Successfully added employee record");
// 				schemaObj.clientModel.findOneAndUpdate({_id: ret_usr.client._id},{employeeID: ret_emp._id, modifiedBy: ret_usr.user.createdBy, modifiedDate: moment(new Date()).format('YYYY-MM-DD'), modifiedTime: moment(new Date()).format('HH:mm:ss')}, function(err, res){
// 					if(err){
// 						console.log(err);
// 						reject(err);
// 					}
// 					if(res){
// 						console.log('INFO: Successfully updated employee ID to client');
// 					}
// 				});
// 				empResObj = ret_emp;
// 				resolve(ret_usr);
// 			})
// 			.catch(function(err) {
// 				console.log(err);
// 		        reject(err);
// 			});
// 		})
// 	}
// 	var masterPromise = function(ret_cliUsr) {
// 		return Q.Promise(function(resolve, reject) {
// 			var countryPromise = masterService.modifyCountry({active: true},ret_cliUsr.user._id,ret_cliUsr.user.createdBy,'push');
// 			var statePromise = masterService.modifyState({active: true},ret_cliUsr.user._id,ret_cliUsr.user.createdBy,'push');
// 			var districtPromise = masterService.modifyDistrict({active: true},ret_cliUsr.user._id,ret_cliUsr.user.createdBy,'push');
// 			var regionPromise = masterService.modifyRegion({active: true},ret_cliUsr.user._id,ret_cliUsr.user.createdBy,'push');
// 			var cityPromise = masterService.modifyCity({active: true},ret_cliUsr.user._id,ret_cliUsr.user.createdBy,'push');
// 			var finYearPromise = masterService.modifyFinancialYear({active: true, status: true},ret_cliUsr.user._id,ret_cliUsr.user.createdBy,'push');
// 			var attributePromise = masterService.modifyProductAttribute({active: true},ret_cliUsr.user._id,ret_cliUsr.user.createdBy,'push');
// 			/* dealerCategory is required for dealer. This function should be removed from addClient
// 				*var dealerCategoryPromise = masterService.modifyDealerCategory({active: true},ret_user._id,'push');
// 			*/
// 			Promise.all([countryPromise, statePromise, districtPromise, regionPromise, cityPromise, finYearPromise, attributePromise])
// 			.then(function(result) {
// 				console.log('INFO: Successfully created master entry for Country/State/District/Region/City/Fin_Year/Attribute');
// 				resolve(ret_cliUsr);
// 			})
// 			.catch(function(err){
// 				console.log(err);
// 				reject(err);
// 			});
// 		})
// 	}
// 	var ledgerPromise = function(ret_cliUsr) {
// 		return Q.Promise(function(resolve,reject){
// 			// schemaObj.ledgerModel.create({authorID: loginUser.authorID,ledgerGroup: clientClone.ledger, debit: 0, credit: 0, refType: 'client', refId: ret_cliUsr.client._id, finYear: clientClone.finYear, createdBy: loginUser._id,creationTime: moment(new Date()).format('YYYY-MM-DD') + " " + moment(new Date()).format('HH:mm:ss'),active: true}, function(err, ret_ledger){
// 				schemaObj.ledgerModel.create({authorID: ret_cliUsr.client.authorID, ledgerGroup: clientClone.ledger, debit: 0, credit: 0, refType: 'client', refId: ret_cliUsr.client._id, finYear: clientClone.finYear, createdBy: clientClone.createdBy, creationTime: moment(new Date()).format('YYYY-MM-DD') + " " + moment(new Date()).format('HH:mm:ss'),active: true}, function(err, ret_ledger){
// 				if(err) {
// 					console.log(err);
// 					reject(err);
// 				}
// 				if(ret_ledger){
// 					ledgerResObj = ret_ledger;
// 					schemaObj.ledgerEntryModel.create({authorID: ret_cliUsr.client.authorID, active:true, ledgerId:ret_ledger._id, type:'o', credit:0, debit:0, finYear: clientClone.finYear, refDate:moment(new Date()).format('YYYY-MM-DD')}, function(err1, ret_ledger1){
// 						if(err1) {
// 							console.log(err1);
// 							reject(err1);		
// 						}
// 						if(ret_ledger1) {
// 							resolve(ret_cliUsr);
// 						}
// 					});
// 				}
// 			});
// 		});
// 	}
// 	var filePromise = function(ret_cliUsr) {
// 		return Q.Promise(function(resolve,reject) {
// 			if(clientProof.length != 0) {
// 				for(key in clientProof) {
// 					var nameSplit = clientProof[key].originalname.split('.');
// 					fs.rename(clientProof[key].path,'assets/upload_files/client/' + client._id  + '-' + clientProof[key].fieldname + '.' + nameSplit[nameSplit.length - 1], function(err){
// 						if(err) {
// 							console.log(err);
// 							console.log('Client proof move error: '+err);
// 						}
// 					});
// 					proofs[clientProof[key].fieldname] = ret_cliUsr.client._id  + '-' + clientProof[key].fieldname + '.' + nameSplit[nameSplit.length - 1];
// 				}
// 				schemaObj.clientModel.findOneAndUpdate({_id: ret_cliUsr.client._id},{'proofs': proofs,modifiedBy: ret_cliUsr.client.createdBy, modifiedDate: moment(new Date()).format('YYYY-MM-DD'),modifiedTime: moment(new Date()).format('HH:mm:ss')}, function(err, res) {
// 					if(err) {
// 						console.log(err);
// 						reject(err);
// 					}
// 					if(res) {
// 						resolve(ret_cliUsr);
// 					}
// 				});
// 			} else {
// 				resolve(ret_cliUsr);
// 			}
// 		});
// 	}
// 	function removeClientData() {
// 		if(clientResObj._id) {
// 			schemaObj.clientModel.deleteOne({_id: ObjectId(clientResObj._id)},function(er,re) {
// 				if(re) {
// 					console.log(re);
// 				}
// 			});
// 		}
// 		if(ledgerResObj._id){
// 			schemaObj.ledgerModel.deleteOne({_id: ObjectId(ledgerResObj._id)},function(er,re) {
// 				if(re) {
// 					console.log(re);
// 				}
// 			});
// 			schemaObj.ledgerEntryModel.deleteOne({refID: ObjectId(ledgerResObj._id)},function(er,re) {
// 				if(re) {
// 					console.log(re);
// 				}
// 			});
// 		}
// 		if(empResObj._id) {
// 			schemaObj.employeeModel.deleteOne({_id: ObjectId(empResObj._id)}, function(er,re) {
// 				if(re) {
// 					console.log(re);
// 				}
// 			});
// 		}
// 		if(userResObj._id) {
// 			schemaObj.userModel.deleteOne({_id: ObjectId(userResObj._id)},function(er,re) {
// 				if(re) {
// 					console.log(re);
// 				}
// 			});
// 			schemaObj.masterCountryModel.update({authorID: {$in: [userResObj._id]}},{$pull: {authorID: userResObj._id}},{multi: true},function(er,re) {
// 				if(re) {
// 					console.log(re);
// 				}
// 			});
// 			schemaObj.masterStateModel.update({authorID: {$in: [userResObj._id]}},{$pull: {authorID: userResObj._id}},{multi: true},function(er,re) {
// 				if(re) {
// 					console.log(re);
// 				}
// 			});
// 			schemaObj.masterDistrictModel.update({authorID: {$in: [userResObj._id]}},{$pull: {authorID: userResObj._id}},{multi: true},function(er,re) {
// 				if(re) {
// 					console.log(re);
// 				}
// 			});
// 			schemaObj.masterRegionModel.update({authorID: {$in: [userResObj._id]}},{$pull: {authorID: userResObj._id}},{multi: true},function(er,re) {
// 				if(re) {
// 					console.log(re);
// 				}
// 			});
// 			schemaObj.masterCityModel.update({authorID: {$in: [userResObj._id]}},{$pull: {authorID: userResObj._id}},{multi: true},function(er,re) {
// 				if(re) {
// 					console.log(re);
// 				}
// 			});
// 			schemaObj.masterFinYearModel.update({authorID: {$in: [userResObj._id]}},{$pull: {authorID: userResObj._id}},{multi: true},function(er,re) {
// 				if(re) {
// 					console.log(re);
// 				}
// 			});
// 		}
// 	}
	
// 	clientPromise().then(function(retClientObj) {
// 		return userPromise(retClientObj);
// 	}).then(function(ret_userObj) {
// 		return employeePromise(ret_userObj); //returns user object, so this can be used to update authorID while creating master for the client user
// 	}).then(function(emp_usr) {
// 		return masterPromise(emp_usr);
// 	}).then(function(ret_client_user_obj) {
// 		return ledgerPromise(ret_client_user_obj);
// 	}).then(function(ret_client_user_obj) {
// 		return filePromise(ret_client_user_obj);
// 	})
// 	.then(function(data) {
// 		emailObj.activateUser(data.client.signupMail); //this can be mofidied to promise response
// 		deferred.resolve(data);
// 	})
// 	.catch(function(err) {
// 		console.log(err);
// 		removeClientData(); //this can be converted to promise
// 		deferred.reject(err);
// 	});
	
// 	return deferred.promise;
// }

// function service_getClient(loginUsr) {
// 	var deferred = Q.defer();
// 	var condition = {authorID:loginUsr.authorID, active:loginUsr.active};
// 	if(loginUsr.userType == 'b'){
// 		schemaObj.clientModel.find(condition,function (err, ret_ClientInd) {
// 			if(err) {
// 				console.log(err);
// 				deferred.reject(err);
// 			}
// 			if(ret_ClientInd) {
// 				deferred.resolve(ret_ClientInd);
// 			}
// 			else
// 				deferred.resolve();
// 		});
// 	} else if(loginUsr.userType == 'd'){
// 		schemaObj.dealerModel.find(condition,function (err, ret_ClientInd) {
// 			if(err) {
// 				console.log(err);
// 				deferred.reject(err);
// 			}
// 			if(ret_ClientInd) {
// 				deferred.resolve(ret_ClientInd);
// 			}
// 			else
// 				deferred.resolve();
// 		});
// 	}
// 	return deferred.promise;
// }