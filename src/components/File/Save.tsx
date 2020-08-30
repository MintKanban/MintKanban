import CardData from "../Types/CardData";
import React, { FC } from "react";

interface SaveProps {
  data: {
    lists: Record<string, CardData[]>
    listOrder: string[]
  }
}

const Save: FC<SaveProps> = props => {
  const dataString = JSON.stringify(props.data);
  const dataURI = `data:application/json;charset=utf-8,${encodeURIComponent(dataString)}`;
  const defaultFileName = "tmrw.json";

  return <a href={dataURI} download={defaultFileName}>{props.children}</a>
}

export default Save;
