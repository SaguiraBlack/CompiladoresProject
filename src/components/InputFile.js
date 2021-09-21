import { Icon} from '@iconify/react';
import { useState } from 'react';

function InputFile(props) {
  const [file, setFile] = useState();

  function fileChangeHandler(e){
    setFile(e.target.files[0].name);
    props.fileChangeHandler(e);
  }

  function renderLabelIcon(){
    if (props.icon && props.label) {
      return  (
        <div className="flex content-between">
          <div className="w-1/2">{props.label} </div>
          <div className="w-1/2">
            <Icon icon={props.icon} style={{fontSize: '24px'}} className="m-auto mr-0" />
          </div>
        </div>
            );
    }else if (props.icon && props.label==null) {
      return(<div>
              <Icon icon={props.icon} style={{fontSize: '24px'}} className="m-auto" />
            </div>);
    }else if(props.label && props.icon == null){
      return(<span>{props.label} </span>);
    }
  }

  return (
    <div className={`${props.size} my-auto mb-0`}>
      <div className="flex space-x-10">
        <button className="w-full relative bg-blue text-white font-semibold rounded-md p-1  m-3 hover:bg-gray hover:shadow-lg " >
          {renderLabelIcon()}
          <input type="file" accept=".json" onChange={(e)=>fileChangeHandler(e)} className="opacity-0 h-10 w-full absolute top-0 left-0"/>
        </button>
        <span className="m-auto text-gray-10 w-full">{file}</span>
      </div>

    </div>

  );
}

export default InputFile;