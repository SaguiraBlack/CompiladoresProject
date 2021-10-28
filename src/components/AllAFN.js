import React, { useState } from 'react'
import AFNConverter from '../AFN/AFNConverter';
import useAFNs from '../context/useAFNs';
import AFNList from './AFNOperations/AFNList';
import AFNPreview from './AFNPreview';
import InputFile from './InputFile';

export default function AllAFN() {
  const [myAFNs, setMyAFNs] = useAFNs();
  const [previewIndex, setPreviewIndex] = useState(-1);
  const [selectedGraph, setSelectedGraph] = useState(false);

  function viewGraph(id) {
    setSelectedGraph(!selectedGraph);
  }

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
		<div className="flex-col w-1/5 h-full bg-gray-light">
      		<AFNPreview myAFNs={myAFNs} previewIndex={previewIndex} selectedGraph={selectedGraph}/>
			<InputFile label="Importar" fileChangeHandler={importSettings}/>
			<AFNList myAFNs={myAFNs} removeAFN={removeAFN} setPreviewIndex={(i)=>setPreviewIndex(i)} viewGraph={viewGraph}
					previewIndex={previewIndex} AFDList={false} exportFile={exportFile} />
			<AFNList myAFNs={myAFNs} removeAFN={removeAFN} setPreviewIndex={(i)=>setPreviewIndex(i)} viewGraph={viewGraph}
					previewIndex={previewIndex} AFDList={true} exportFile={exportFile} />
		</div>
	)
	
}
