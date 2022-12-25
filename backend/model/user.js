var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema({
	firstname: String,
	lastname: String,
	email: String,
	password: String
}),
	user = mongoose.model('user', userSchema);

module.exports = user;