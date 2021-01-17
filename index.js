const express = require('express');
const path = require('path');
const port = 8000;

const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name: "priyanka",
        phone: 1234567890,
    },
    {
        name : "poonam",
        phone : 1122334455,

    },
    {
        name: "neha",
        phone: 9876543210,
    },
]

app.get('/',function(req,res){
   
    return res.render('home',
    {
        title: "my contact list",
        Contact_list:contactList,
    });

});


app.post('/create-contact', function(req,res){
    contactList.push({
        name: req.body.name,
        phone: req.body.phone
    });
    //console.log(req.body);
    return res.redirect('/');

});

app.get('/delete-contact/',function(req,res){
    let phone=req.query.phone;
    
    let contactIndex=contactList.findIndex(contact => contact.phone == phone);
    if (contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');

});



app.listen(port,function(err){
    if(err){
        console.log('error');
    }
    console.log('yup!my express server');
});