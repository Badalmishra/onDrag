import './App.css';
import useDrag from './useDrag';
import { useCallback, useMemo, useState } from 'react';
import { loadFile } from './Helpers';

function App() {
  const [urls, setUrls] = useState([])
  const onFiles  = useCallback(async(files)=>{
    const urls = []
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const url = await loadFile(file)
      urls.push(url)
    }
    setUrls(urls)
  })
  const { element, dragging } = useDrag(onFiles)
  return (
    <div className="App" ref={element}>
      <header className="App-header">
        {urls.map(url=><img src={url} key={url} className="App-logo" alt="logo" />)}
        {dragging?'Drop this file here':'Drag a file'}     
      </header>
    </div>
  );
}

export default App;
