# React useFileDrop Hooks
* Simplifies file drag and drop in react

### The Hook
```js
    const { element, dragging } = useFileDrop(onFiles)
```
```
 1. Here element is a ref, it should be attached to the element where the file will be dropped.
 2. dragging is a boolean state | it is {true} while file is being dragged
 3. onFile is a callback | (files:Array<File>)=>void | it will be triggered when even files are dropped on the attached element.
```
#### Demo
[See Demo on Sandbox](https://codesandbox.io/s/react-file-drop-fg6kc?file=/src/App.js)


### App.js
```js
import useFileDrop from 'easy-file-drop';
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
```
