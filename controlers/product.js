const formidable = require('formidable')
const _ = require('lodash')
const Product = require('../models/product')
const fs = require('fs')
const { errorHandler } = require('../helpers/dbErrorHandlers')

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product) {
            return res.status(400).json({
                error: 'Product not found'
            })
        }
        req.product = product;
        next();
    });
};

exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}
exports.getProduct = (req, res) => {
    let findArgs = {
        name: "Lecteur Coran et veilleuse"
    };
    Product.find(findArgs)
    .exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: 'Products not found'
            });
        }
        res.json(product);
    });
}

exports.remove = (req, res) => {
    let product = req.product
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            deletedProduct,
            "message": 'Product deleted successfully'
        })
    })
}

exports.create = (req, res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        //check all fields
        const {name, description, price, category, quantity, shipping} = fields

        if(!name){
            return res.status(400).json({
                error: 'All fileds are required'
            })
        }

        let product = new Product(fields)

        if(files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
             res.json(result)
        })
    })
}
exports.update = (req, res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        //check all fields
        const {name, description, price, category, quantity, shipping} = fields

        

        let product = req.product
        product = _.extend(product, fields)

        if(files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
             res.json(result)
        })
    })
}