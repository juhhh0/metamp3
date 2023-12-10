import { useEffect, useState } from "react";
import MetaImg from "./MetaImg";
import { FileType, MetasType } from "@/type/types";

var jsmediatags = require("jsmediatags");

export default function File({ file }: { file: FileType }) {
  const [title, setTitle] = useState("");
  const [metas, setMetas] = useState<MetasType>({})
  const [img, setImg] = useState({})


  useEffect(() => {
    jsmediatags.read(file.path, {
      onSuccess: function (tag: any) {
        console.log(tag)
        setMetas({
          title: tag.tags.title,
          artist: tag.tags.artist,
          album: tag.tags.album
        })
        setImg({
          format: tag.tags.picture?.format,
          data: tag.tags.picture?.data
        })
      },
      onError: function (error: any) {
        console.log(":(", error.type, error.info);
      },
    });
  }, [])

  return (
    <tr className="file">
      <td className="flex items-center gap-2">
        <label className="img-label" htmlFor="image">+</label>
        <input type="file" name="image" id="image" className="input-img" />
        {img.data && <MetaImg data={img.data} format={img.format} />}
      </td>
      <td>
        <p>{file.name}</p>
      </td>
      <td>
        <input
          type="text"
          data-file-path={file.path}
          className="input-title bg-transparent border-none text-base text-white"
          placeholder={metas.title || '/'}
        />
      </td>
      <td>
        <input
          type="text"
          data-file-path={file.path}
          className="input-artist bg-transparent border-none text-base text-white"
          placeholder={metas.artist || '/'}
        />
      </td>
      <td>
        <input
          type="text"
          data-file-path={file.path}
          className="input-album bg-transparent border-none text-base text-white"
          placeholder={metas.album || '/'}
        />
      </td>
      <td>
        <input type="checkbox" className="file-checkbox" name="" id="" />
      </td>
    </tr>
  );
}
