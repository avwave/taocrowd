import React, { useRef, useState } from "react";
import { SpaceList } from "../SpaceList";
import './index.scss'
import { SearchInput } from "../SearchInput";

const Layout = () => {
  
  const [input, setInput] = useState('');
  return (
    <div className="layout-list">
      
      <SearchInput onChange={v=>setInput(v)}/>

      <SpaceList 
        filter={input}
      />
    </div>
  )
}

export { Layout }