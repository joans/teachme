// hier kann man das Schema für die DB anlegen
const mongoose = require('mongoose')    //connect

const UserSchema = mongoose.Schema(
  {
  username:{type: String, required: true, },             //diese Daten werden in die DB geschrieben
  email: {type: String, required: false},
  textarea: {type: String, required: false},
  img: {type: String, required: false},
  password: {type: String, required: true}
  },
  {collection: 'users'}
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model
