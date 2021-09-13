import AFNFactory from '../../AFN/AFNFactory';
import React, { useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { addAFN } from '../../app/slices/AFNSlice';
import AFNList from './AFNList';
import AFNPreview from '../AFNPreview';

function AFNOperations (){
  const dispatch = useDispatch();
  useEffect(()=>{
    const afn1 = AFNFactory.createBasicAFN('a');
    const afn2 = AFNFactory.createBasicAFN('b');
    const joinAFN = AFNFactory.joinAFN(afn1, afn1);
    dispatch(addAFN({
      name: 'AFN a',
      afn: JSON.stringify(afn1)
    }));
    dispatch(addAFN({
      name: 'AFN b',
      afn: JSON.stringify(afn2)
    }));
    dispatch(addAFN({
      name: 'AFN join a-a',
      afn: JSON.stringify(joinAFN)
    }));
  }, []);

  function generateAFN() {
    const afn1 = AFNFactory.createBasicAFN('a');
    dispatch(addAFN({
      name: 'default',
      afn: JSON.stringify(afn1)
    }))
  }

  return (
    <div className="flex">
      <div className="bg-white h-screen w-4/5">
        <AFNPreview />
        <button className="bg-blue text-white p-2 m-1 hover:bg-gray" onClick={generateAFN}>Generate AFN</button>
        <div id="ploter" className="w-100 h-96 p-16"></div>
        <div id="ploter2" className="w-100 h-96 p-16"></div>
        <div id="ploter3" className="w-100 h-96 p-16"></div>
      </div>
        <AFNList />
    </div>
  )
}

export default AFNOperations;
