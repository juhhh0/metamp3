import { useState } from "react";
import File from "./components/File";
import { ipcRenderer } from "electron";
import { FileType } from "./type/types";

function App() {
  const [files, setFiles] = useState<FileType[]>([]);

  const handleChange = (event: any) => {
    let mp3files: FileType[] = [];
    const files = Array.from(event.target.files);
    files.map((file: any) => {
      if (file.type == "audio/mpeg") {
        mp3files.push({
          name: file.name,
          path: file.path,
        });
      }
    });
    setFiles(mp3files);
  };

  const handleCheckboxChange = (event: any) => {
      const checkboxs = document.querySelectorAll(".file-checkbox")
      checkboxs.forEach(checkbox => {
        checkbox.checked = event.target.checked
      })
  }

  const handleSave = () => {
    const inputs: HTMLInputElement[] = document.querySelectorAll(".input-title")
    const inputsar: HTMLInputElement[] = document.querySelectorAll(".input-artist")
    const inputsal: HTMLInputElement[] = document.querySelectorAll(".input-album")
    const imgs: HTMLInputElement[] = document.querySelectorAll(".input-img")

    let modified_files = []

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value.length || imgs[i]?.files[0]?.path || inputsal[i].value.length || inputsar[i].value.length) {
        modified_files.push({
          path: inputs[i].getAttribute("data-file-path"),
          title: inputs[i].value,
          artist: inputsar[i].value,
          album: inputsal[i].value,
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
      <table>
        <thead>
          <tr>
            <td>picture</td>
            <td>file name</td>
            <td>title</td>
            <td>artist</td>
            <td>album</td>
            <td><input type="checkbox" name="" id="" onChange={handleCheckboxChange} /></td>
          </tr>
        </thead>
        <tbody>

          {files.length > 0 &&
            files.map((file, index) => <File key={index} file={file} />)}
        </tbody>
      </table>
      {files.length > 0 && <button className="p-3 m-3" onClick={handleSave}>Save</button>}
    </div>
  );
}

export default App;
