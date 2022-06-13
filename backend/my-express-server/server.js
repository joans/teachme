
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')  //um req.body weiterzugeben
const mongoose = require('mongoose')      //Anbindung der Datenbank
const User = require('./model/user')      // Anbindung des DB Schema
const bcrypt = require('bcryptjs')      // Anbindung zum PW Hashing

mongoose.connect('mongodb://localhost:27017/login-app-db')  //Connect DB

const app = express()


app.use("/", express.static(path.join(__dirname,'static')))    // nutze diese Seiten im Frontend  aus Ordner static
app.use(bodyParser.json())                                       //  middleware für Express ,um Body zu decoden

app.post('/api/register', async (req, res) => {                //REGISTER API EMPFANGEN
    const {username, email, textarea, img, password: plainTextPassword} = req.body                                // get username and password

    const password = await bcrypt.hash("plainTextPassword", 10)                  // username + Hashed PW für db

try{
  const response = await User.create({
    username,
    email,
    textarea,
    img,
    password
  })
  console.log('User erfolgreich angelegt', response)
}
catch(error){
  console.log(error)
  return res.json({ status: 'error'})
}


res.json({status:'ok' })
})
app.listen(3333, function(){
  console.log("Port3333");
});
