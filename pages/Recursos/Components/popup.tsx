import React from "react";
 
const Popup = (props: { content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
  return (
    <div className="popup-box">
      <div className="box">
        {props.content} 
      </div>
    </div>
  );
};


export default Popup;