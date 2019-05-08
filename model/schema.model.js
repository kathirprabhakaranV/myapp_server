var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var Schema = mongoose.Schema, ObjectId  = Schema.ObjectId;
var connObj = require('model/conn.model').createConnectionDB();

function deleteEmpty(v) {
   if(v == null){
     return undefined;
   }
   return v;
}

var schemaModel = {};

/*MASTER SCHEMAS*/
var masterStateSchema = new Schema({
  country: {type:Schema.Types.ObjectId, ref:'master_country', autopopulate:{select:'name'}},
  name: {type: String,required: true},
  code: {type: String},
  gstCode: {type: String,required: true},
  authorID: [{type: Schema.Types.ObjectId}],
  modifiedBy: {type: Schema.Types.ObjectId},
  modifiedTime: {type: String},
  modifiedDate: {type: String},
  active: {type: Boolean}
},{versionKey: false});
masterStateSchema.plugin(autopopulate);

var masterStateModel = connObj.model('master_state',masterStateSchema,'master_state');

schemaModel.masterStateModel = masterStateModel;

module.exports = schemaModel;