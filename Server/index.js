const express = require('express');
const cors = require('cors')
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');

const Jwt = require('jsonwebtoken');
const jwtKey = "saejdgb";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async(req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtKey, {expiresIn:"2H"}, (err, token) => {
        if(err){
            res.send({ result : "somthing went wrong!!"});
        }
        res.send({result, token});
    })
});

app.post("/login", async(req, res) => {
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password")
        if(user){
            Jwt.sign({user}, jwtKey, {expiresIn:"2H"}, (err, token) => {
                if(err){
                    res.send({ result : "somthing went wrong!!"});
                }
                res.send({user, token});
            })
            
        }
        else {
            res.send({ result : "No user found"});
        }
    }
    else{
        res.send({result : "No user found"});
    }
});

app.post("/addProduct", async(req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    
    res.send(result);
});

app.get("/getProducts", async(req, res) => {
    let products = await Product.find();
    if(products.length > 0)
    {
        res.send(products);
    }else{
        res.send({result: "No Products found"});
    }
});

app.delete("/product/:id", async(req, res) => {
    const result = await Product.deleteOne({ _id : req.params.id});
    res.send(result);
});

app.get("/product/:id", async(req, res) => {
    const result = await Product.findOne({ _id : req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result:"No record found"});
    }
});

app.put("/product/:id", async(req, res) => {
    let result = await Product.updateOne(
        { _id : req.params.id},
        {
            $set : req.body
        }
    );
    if(result){
        res.send(result);
    }else{
        res.send({result:"No record found"});
    }
});

app.get("/product/search/:key", async(req, res)=>{
    let result = await Product.find({
        "$or":[
            { name: { $regex: req.params.key}},
            { company: { $regex: req.params.key}},
            { category: { $regex: req.params.key}},
            { price: { $regex: req.params.key}}
        ]
    })

    if(result){
        res.send(result);
    }else{
        res.send({result:"No record found"});
    }
});

app.listen(5000)