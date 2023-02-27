import React from "react";
import img from "../images/chef_gif.gif"

export default function Loading() {
  return (  
      <div className="loading1">
        <img src={img} alt="not found" />
      </div>
  );
}

{/* <div style="width:100%;height:0;padding-bottom:98%;position:relative;"><iframe src="https://giphy.com/embed/yScQL8JL4mc6YJAfnm" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/transparent-yScQL8JL4mc6YJAfnm">via GIPHY</a></p> */}