import './App.css';
import {useFileDrop} from './easy-file-drop';
import { useCallback,  useState } from 'react';


function App() {
  const [files,setFiles] = useState([])
  const onFiles  = useCallback(async(files)=>{
   /** Do somethinng with the files here */
  setFiles(files)
  }, [])

  const { element, dragging } = useFileDrop(onFiles)
  return (
    <div className="App" ref={element}>
      <header className="App-header">
        <ul>
          {files.map(file=><li key={file.name}>{file.name}</li>)}
        </ul>
        {dragging?'Drop this file here':'Drag a file'}     
      </header>
    </div>
  );
}

export default App;
