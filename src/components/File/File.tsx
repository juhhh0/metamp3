import { useEffect, useState } from "react";
import MetaImg from "../MetaImg";

var jsmediatags = require("jsmediatags");

export default function File({ file }) {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState({})


useEffect(() => {
    jsmediatags.read(file.path, {
        onSuccess: function (tag) {
            console.log(tag)
          setTitle(tag.tags.title);
          setImg({
            format: tag.tags.picture?.format,
            data: tag.tags.picture?.data
          })
        },
        onError: function (error) {
          console.log(":(", error.type, error.info);
        },
      });
},[])

  return (
    <div className="file p-3">
      <p>File Name: {file.name}</p>
      Meta Title:
      <input
        type="text"
        data-file-path={file.path}
        className="input-title bg-transparent border-none text-base text-white w-[600px]"
        placeholder={title}
      />
      <input type="file" className="input-img"/>
      {img.data && <MetaImg data={img.data} format={img.format}/>}

    </div>
  );
}
