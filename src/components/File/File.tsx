import { AppContext } from "@/context/AppContext";
import { useState } from "react";

var jsmediatags = require("jsmediatags");

export default function File({ file }) {
  const [title, setTitle] = useState("");

  jsmediatags.read(file.path, {
    onSuccess: function (tag) {
      setTitle(tag.tags.title);
    },
    onError: function (error) {
      console.log(":(", error.type, error.info);
    },
  });

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
    </div>
  );
}
