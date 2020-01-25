const express = require('express');
const router = express.Router();
const Product = require('../../Models/product');
const mongoose = require('mongoose');

//Get all products
router.get('/', function(req, res) {
	Product.find().exec().then((re) => res.send(re));
});
router.get('/:id', function(req, res) {
	const id = req.params.id;
	Product.findById(id)
		.then((re) => {
			re ? res.status(200).send(re) : res.status(404).send({ message: 'No data found related to the id' });
		})
		.catch((err) => res.status(400).send(err));
});
router.delete('/:id', function(req, res) {
	const id = req.params.id;
	Product.remove({ _id: id })
		.then((re) => {
			re ? res.status(200).send(re) : res.status(404).send({ message: 'No data found related to the id' });
		})
		.catch((err) => res.status(400).send(err));
});
router.patch('/:id', function(req, res) {
	console.log(res.body);
	const id = req.params.id;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.update({ _id: id }, { $set: updateOps })
		.exec()
		.then((re) => {
			re ? res.status(200).send(re) : res.status(404).send({ message: 'No data found related to the id' });
		})
		.catch((err) => res.status(400).send(err));
});

//Add products
router.post('/', function(req, res) {
	console.log(req.body.name);
	const products = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});
	products
		.save()
		.then((result) => {
			res.send(result);
		})
		.catch((e) => {
			res.status(400).send(e);
		});
});

module.exports = router;
