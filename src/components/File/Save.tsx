import CardData from "../Types/CardData";
import React, { cloneElement, FC } from "react";

interface SaveProps {
  data: {
    lists: Record<string, CardData[]>
    listOrder: string[]
  }
}

const Save: FC<SaveProps> = props => {

  const stupidClick = () => {
    const dataString = JSON.stringify(props.data);
    const dataURI = `data:application/json;charset=utf-8,${encodeURIComponent(dataString)}`;
    const defaultFileName = "tmrw.json";
    const a = document.createElement("a");
    a.href = dataURI;
    a.download = defaultFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return <>
    { cloneElement(props.children as any, { onClick: stupidClick }) }
    </>
}

export default Save;
