const express = require('express');
const Router = express.Router;
const router = new Router;
const Truck = require('../models/Truck');


router.post('/truck', async (req, res) => {

  try {
    const newTruck = await new Truck({
      model: req.body.model,
      status: 'created',
      created_by: req.body.userId,
      assigned_to: null,
      dimensions: {
        width: req.body.width,
        height: req.body.height,
        length: req.body.length,
      },
      payload: req.body.payload,
    });

    await newTruck.save();

    res.status(201).json({message: 'new truck created'});
  } catch (e) {
    res.status(500).json({message: `Error: ${e}`});
  }
});

router.get('/truck/:id', async (req, res) => {
  const {id} = req.params;

  await Truck.find({created_by: id})
      .then((trucks) => {
        res.status(200).json({trucks: trucks});
      })
      .catch((err) => {
        return res.status(404).json({status: err.name});
      });
});


module.exports = router;


