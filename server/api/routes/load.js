const express = require('express');
const Router = express.Router;
const router = new Router;
const Load = require('../models/Load');
const User = require('../models/User');


router.post('/load', async (req, res) => {
  try {
    const newLoad = await new Load({
      name: req.body.name,
      status: 'new',
      created_by: req.body.userId,
      assigned_to: null,
      dimensions: {
        width: req.body.width,
        height: req.body.height,
        length: req.body.length,
      },
      pickUpAddress: req.body.pickUpAddress,
      deliveryAddress: req.body.deliveryAddress,
      weight: req.body.weight,
    });

    await newLoad.save();

    res.status(201).json({message: 'new load created', load: newLoad});
  } catch (e) {
    res.status(500).json({message: `Error: ${e}`});
  }
});


router.get('/load/:id', async (req, res) => {
  const {id} = req.params;

  await Load.find({created_by: id})
      .then((loads) => {
        res.status(200).json({loads: loads});
      })
      .catch((err) => {
        return res.status(404).json({status: err.name});
      });
});

router.delete('/load/:id', async (req, res) => {
  const {id} = req.params;
  const {loadId} = req.body;

  const load = await Load.findOne({_id: loadId});

  if (String(load.created_by) !== id ) {
    return res.status(403).json({message: 'Access rejected'});
  }

  if (load.status !== 'new') {
    return res.status(403).json({message: 'You can not delete assigned load'});
  }

  await Load.deleteOne({_id: loadId})
      .then(()=>{
        res.status(200).json({message: 'Deleted is done'});
      })
      .catch((e)=>{
        return res.status(404).json({status: e.name});
      });
});

router.put('/load/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {loadId} = req.body;

    const load = await Load.findOne({_id: loadId, created_by: id});

    if (load) {
      load.status = 'posted';
      load.save();
      return res.status(200)
          .json({message: 'Load posted', id: load._id});
    } else {
      return res.status(404).json({message: 'Load not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});

router.patch('/load', async (req, res) => {
  try {
    const {
      userId,
      id,
      name,
      width,
      height,
      length,
      weight,
      pickUpAddress,
      deliveryAddress,
    } = req.body;


    const load = await Load.findById(id);


    if (load) {
      if (String(load.created_by) !== userId ) {
        return res.status(403).json({message: 'Access rejected'});
      }

      if (load.status !== 'new') {
        return res.status(403).json({message: 'You can not edit assigned load'});
      }

      load.name = name;
      load.dimensions.width = width;
      load.dimensions.height = height;
      load.dimensions.length = length;
      load.weight = weight;
      load.pickUpAddress = pickUpAddress;
      load.pdeliveryAddress = deliveryAddress;

      load.save();
      return res.status(200).json({message: 'Load updated', load});
    } else {
      return res.status(404).json({message: 'Load not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});

module.exports = router;


