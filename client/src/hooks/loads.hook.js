import {useState, useCallback} from 'react';

export const useLoads = (callback, deps) => {

  const [loadsData, setLoadsData] = useState([]);

  const setLoads = useCallback((loads)=> {
    setLoadsData(loads);

  },[]);

  const addOneLoad = useCallback((load) => {

    setLoadsData([...loadsData, load]);

  }, [loadsData]);

  const deleteOneLoad = useCallback((id)=> {
    setLoadsData(loadsData.filter(item =>item._id !== id));
  },[loadsData]);

  const editOneLoad = useCallback((id, load) => {
    let newArr = [...loadsData];

      const loadIndex = newArr.findIndex(i => i._id ===id);
      newArr[loadIndex] = load;

    setLoadsData(newArr);

  }, [loadsData]);

  const changeLoadStatus = useCallback((id)=> {
    let newArr = [...loadsData];

      const loadIndex = newArr.findIndex(i=>i._id === id);
      newArr[loadIndex].status = 'posted';

    setLoadsData(newArr);
  },[loadsData]);


  return{setLoads, setLoadsData, addOneLoad, deleteOneLoad, editOneLoad, changeLoadStatus, loadsData}

};
