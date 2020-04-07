import {createContext} from 'react';

function noop(){}

export const UserContext = createContext({
  trucksData:[],
  loadsData: [],
  setTrucks: noop,
  addOneTruck: noop,
  deleteOneTruck: noop,
  editOneTruck: noop,
  switchAssignTruck: noop,
  setLoads: noop,
});
