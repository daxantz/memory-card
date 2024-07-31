import { useState, useEffect } from "react";
import md5 from "crypto-js/md5";
import { publicKey, privateKey } from "./config";

export default function Card({ name, imageUrl, selectCard }) {
  return (
    <div
      onClick={(e) => selectCard(e)}
      id={name}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "2px solid black",
      }}
      className="Card"
    >
      {/* card image */}
      <img id={name} src={imageUrl} alt="" />
      {/* {character name} */}
      <p id={name}>{name}</p>
    </div>
  );
}
