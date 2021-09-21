import AFNFactory from '../../AFN/AFNFactory';
import AFNConverter from "../../AFN/AFNConverter";
import React, { useEffect, useState} from 'react';
import AFNList from './AFNList';
import AFNPreview from '../AFNPreview';
import AFNListOperations from './AFNListOperations';
import Routes from './Routes';
import { useRouteMatch } from 'react-router';
import InputFile from '../InputFile';

function AFNOperations (){
  const [myAFNs, setMyAFNs] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(-1);
  let { path, url } = useRouteMatch();

  useEffect(()=>{
    const afn1 = AFNFactory.createBasicAFN('a');
    const afn2 = AFNFactory.createBasicAFN('b');
    const joinAFN = AFNFactory.joinAFN(afn1, afn2);
    const closureAFN = AFNFactory.closurePlus(afn1);
    const afd = AFNConverter.convertAFNtoAFD(joinAFN);
    pushAFN('afn a', afn1);
    pushAFN('afn b', afn2);
    pushAFN('join a-b', joinAFN);
    pushAFN('closure a', closureAFN);
    pushAFN('AFD join', afd);

  }, []);

  function pushAFN(name, afn) {
    setMyAFNs( arr=>[...arr, {name, afn}]);
  }
  function removeAFN(index) {
    setMyAFNs( arr=>arr.filter((item, i) => i!==index));
  }

	function exportFile(id){
    const afd = myAFNs[id].afn;
    const filename = myAFNs[id].name;
    if(!afd.isAFD) return;
    const afdTable = AFNConverter.getAFDTable(afd);
		const exportData = JSON.parse(JSON.stringify(afdTable));
		delete exportData.isLoading;
		delete exportData.selectedPresetName;
		const jsonData = JSON.stringify(exportData, null, 2);
		const a = document.createElement("a");
		a.href = URL.createObjectURL(new Blob([jsonData], {
		type: "text/plain"
		}));
		a.setAttribute("download", filename+".json");
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	function importSettings(e){
		var files = e.target.files;
		var file = files[0];           
		var reader = new FileReader();
		reader.onload = (event)=> {
		  const data = JSON.parse(event.target.result);
      const afd = AFNConverter.tableToAFD(data);
      pushAFN(file.name.split('.')[0], afd);
		}
		reader.readAsText(file)
	}

  return (
    <div className="flex pt-16 h-screen">
      <AFNPreview myAFNs={myAFNs} previewIndex={previewIndex} />
      <AFNListOperations url={url}/>
      <div className="bg-white w-3/5">
        <h1 className="text-gray text-center font-bold text-4xl p-6">
          Creador de AFN's
        </h1>
        <Routes PATH={path} pushAFN={pushAFN} myAFNs={myAFNs} />
      </div>
      <div className="flex-col w-1/5 h-full bg-gray-light">
        <InputFile label="Importar" fileChangeHandler={importSettings}/>
        <AFNList myAFNs={myAFNs} removeAFN={removeAFN} setPreviewIndex={(i)=>setPreviewIndex(i)} previewIndex={previewIndex} AFDList={false} exportFile={exportFile}/>
        <AFNList myAFNs={myAFNs} removeAFN={removeAFN} setPreviewIndex={(i)=>setPreviewIndex(i)} previewIndex={previewIndex} AFDList={true} exportFile={exportFile}/>
      </div>
    </div>
  )
}

export default AFNOperations;
