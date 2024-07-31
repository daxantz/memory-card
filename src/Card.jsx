import { useState, useEffect } from "react";
import md5 from "crypto-js/md5";
import { publicKey, privateKey } from "./config";

export default function Card({ name, imageUrl, selectCard }) {
  // const [imageUrl, setImageUrl] = useState('');
  // const [name, setName] = useState('');
  // async function fetchData(){
  //     try{
  //         const ts = Date.now().toString();
  //         const hash = md5(ts + privateKey + publicKey);
  //         const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
  //         const data = await response.json()
  //         const image = data.data.results[0].thumbnail.path + '.jpg';
  //         const name = data.data.results[0].name;
  //         setImageUrl(image)
  //         setName(name)
  //         console.log(data)

  //     } catch(err){
  //         console.log(err);
  //     }
  // }

  // useEffect(()=>{

  //     fetchData();
  // }, [])

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
