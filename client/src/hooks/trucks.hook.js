import {useState, useCallback} from 'react';

export const useTrucks = (callback, deps) => {

  const [trucksData, setTrucksData] = useState([]);

  const setTrucks = useCallback((trucks)=> {
    setTrucksData(trucks);

  },[]);

  const addOneTruck = useCallback((truck) => {
    setTrucksData([...trucksData, truck]);

  }, [trucksData]);

  const deleteOneTruck = useCallback((id)=> {
    setTrucksData(trucksData.filter(item =>item._id !== id));
  },[trucksData]);

  const switchAssignTruck = useCallback((previd, id)=> {
    let newArr = [...trucksData];

    if(previd) {
      const prevTruckIndex = newArr.findIndex(i => i._id === previd);
      newArr[prevTruckIndex].status = 'created';
    }

    if(id){
      const currentTruckIndex = newArr.findIndex(i=>i._id === id);
      newArr[currentTruckIndex].status = 'assigned';
    }

    setTrucksData(newArr);
  },[trucksData]);




  return{setTrucks, trucksData, setTrucksData, addOneTruck, deleteOneTruck, switchAssignTruck }

};
