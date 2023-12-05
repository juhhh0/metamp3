import { useContext, useState } from "react";
import File from "./components/File/File";
import { IpcRenderer, ipcRenderer } from "electron";

function App() {
  const [files, setFiles] = useState([]);

  const handleChange = (event: any) => {
    let mp3files = [];
    const files = Array.from(event.target.files);
    files.map((file) => {
      if (file.type == "audio/mpeg") {
        mp3files.push({
          name: file.name,
          path: file.path,
        });
      }
    });
    setFiles(mp3files);
  };
 
  const handleSave = () => {
    const inputs = document.querySelectorAll(".input-title")
    const imgs = document.querySelectorAll(".input-img")

    let modified_files = []

    for (let i = 0; i < inputs.length; i++) {
     if(inputs[i].value.length || imgs[i]?.files[0]?.path){
      modified_files.push({
        path: inputs[i].getAttribute("data-file-path"),
        value: inputs[i].value,
        img: imgs[i]?.files[0]?.path || ""
      })
     }
    }
    ipcRenderer.send("update-titles", modified_files)
  }

  return (
    <div>
      <input
        onChange={handleChange}
        type="file"
        className="p-3"
        multiple={true}
        webkitdirectory="true"
      />
      {files.length > 0 &&
        files.map((file, index) => <File key={index} file={file} />)}
        {files.length > 0 && <button className="p-3 m-3" onClick={handleSave}>Save</button>}
    </div>
  );
}

export default App;
