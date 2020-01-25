const { buildSchema } = require('graphql');
const Product = require('../Models/product');
const mongoose = require('mongoose');

const result = {

}
const schema = buildSchema(`
    type Query  {
        product(id : ID!) : Product
        products: [Product!]!
    },
    type Product  {
        id : ID!,
        name : String!,
        price : Int!,
    }
    type Mutation {
        addProduct(name : String!,price : Int!) : Product,
        patchProduct(id : ID!,name : String,price : Int) : Product,
        deleteProduct(id : ID!) : Product
    }
`);

getProduct = function(args) {
	const id = args.id;
	return Product.findById(id).exec();
};

getProducts = () =>
	Product.find().exec().then((res) => {
		return res;
    });

addProduct = async function(args) {
    const product = await new Product({
        _id : new mongoose.Types.ObjectId(),
        name: args.name,
        price : args.price
    })
    
    return product.save()
}
patchProduct = async function(args){
    delete args._id
    await Product.update({_id : args.id},{$set : args}).exec()
    return Product.findById(args.id)
}
deleteProduct = async function(args){
    let a = Product.findById(args.id)
     Product.deleteOne({_id: args.id}).exec()
    return a}

var root = {
	product: getProduct,
    products: getProducts,
     addProduct,
     patchProduct,
     deleteProduct
};

module.exports = { root, schema };
