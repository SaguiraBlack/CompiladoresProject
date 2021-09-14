import AFNFactory from '../../AFN/AFNFactory';
import React, { useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { addAFN } from '../../app/slices/AFNSlice';
import AFNList from './AFNList';
import AFNPreview from '../AFNPreview';
import AFNListOperations from './AFNListOperations';
import Basic from './Basic';
import Join from './Join';
import Concat from './Concat';
import ClosurePlus from './ClosurePlus';
import ClosureStar from './ClosureStar';
import Optional from './Optional';
import Routes from './Routes';
import { useRouteMatch } from 'react-router';

function AFNOperations (){
  const dispatch = useDispatch();
  let { path, url } = useRouteMatch();

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
      <AFNPreview />
      <AFNListOperations url={url}/>
      <div className="bg-white h-screen w-3/5">
        <h1 className="text-gray text-center font-bold text-4xl p-6">
          Creador de AFN's
        </h1>
        <Routes path={path} />
      </div>
      <AFNList/>
    </div>
  )
}

export default AFNOperations;
