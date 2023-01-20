import { useEffect, useState } from "react";

export default function UserCard(props) {
  return (
    <div className="card-con" onClick={props.onClick}>
      <div className="card-avatar">
        <img src={props.img} width="100px" height={"100px"} />
      </div>
      <div className="card-content">
       {props.children}
      </div>
    </div>
  );
}
