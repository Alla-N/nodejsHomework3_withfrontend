const express = require('express');
const Router = express.Router;
const router = new Router;
const Truck = require('../models/Truck');
const User = require('../models/User');


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

    res.status(201).json({message: 'new truck created', truck: newTruck});
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

router.delete('/truck/:id', async (req, res) => {
  const {id} = req.params;
  const {truckId} = req.body;

  const truck = await Truck.findOne({_id: truckId});
  const user= await User.findOne({_id: id});

  if (String(truck.created_by) !== id ) {
    return res.status(403).json({message: 'Access rejected'});
  }

  if (user.status === 'onload' ) {
    return res.status(403).json({message: 'You can not do it while onload'});
  }

  if (truck.status !== 'created') {
    return res.status(403).json({message: 'You can not delete assigned truck'});
  }

  await Truck.deleteOne({_id: truckId})
      .then(()=>{
        res.status(200).json({message: 'Deleted is done'});
      })
      .catch((e)=>{
        return res.status(404).json({status: e.name});
      });
});

router.put('/truck_assign/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {nextTruckId} = req.body;

    const nextTruck = await Truck.findOne({_id: nextTruckId, created_by: id});
    const user= await User.findOne({_id: id});

    if (user.status === 'onload' ) {
      return res.status(403).json({message: 'You can not do it while onload'});
    }


    if (nextTruck) {
      nextTruck.status = 'assigned';
      nextTruck.save();
      user.status = 'inService';
      user.save();
      return res.status(200)
          .json({message: 'Truck assigned', id: nextTruck._id});
    } else {
      return res.status(404).json({message: 'Truck not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});


router.put('/truck_switch/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {currentTruckId, nextTruckId} = req.body;
    const currentTruck =await Truck.findOne({_id: currentTruckId});
    const nextTruck = await Truck.findOne({_id: nextTruckId, created_by: id});
    const user= await User.findOne({_id: id});

    if (user.status === 'onload' ) {
      return res.status(403).json({message: 'You can not do it while onload'});
    }

    if (currentTruck && nextTruck) {
      currentTruck.status = 'created';
      currentTruck.save();
      nextTruck.status = 'assigned';
      nextTruck.save();
      return res.status(200)
          .json({message: 'Truck assigned', id: nextTruck._id});
    } else {
      return res.status(404).json({message: 'Trucks not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});


router.put('/truck_end/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {currentTruckId} = req.body;
    const currentTruck = await Truck.findOne({_id: currentTruckId});
    const user= await User.findOne({_id: id});


    if (user.status === 'onload' ) {
      return res.status(403).json({message: 'You can not do it while onload'});
    }

    if (currentTruck) {
      currentTruck.status = 'created';
      currentTruck.save();
      user.status = 'ready';
      user.save();
      return res.status(200).json({message: 'Work ended'});
    } else {
      return res.status(404).json({message: 'Truck not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});

router.patch('/truck', async (req, res) => {
  try {
    const {
      userId,
      id,
      model,
      width,
      height,
      length,
      payload,
    } = req.body;


    const truck = await Truck.findById(id);
    const user= await User.findById(userId);


    if (user.status === 'onload' ) {
      return res.status(403).json({message: 'You can not do it while onload'});
    }

    if (truck) {
      if (String(truck.created_by) !== userId ) {
        return res.status(403).json({message: 'Access rejected'});
      }

      if (truck.status === 'assigned') {
        return res.status(403).json({message: 'You can not edit assigned truck'});
      }

      truck.model = model;
      truck.dimensions.width = width;
      truck.dimensions.height = height;
      truck.dimensions.length = length;
      truck.payload = payload;

      truck.save();
      return res.status(200).json({message: 'Truck updated', truck});
    } else {
      return res.status(404).json({message: 'Truck not found'});
    }
  } catch (e) {
    return res.status(404).json({message: e.name});
  }
});

module.exports = router;


