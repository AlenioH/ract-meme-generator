//@ts-check
import { useState, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
export default MemeGenerator;

const generatorStyle = css`
  text-align: center;
  text-transform: uppercase;
  font-family: fantasy;
`;

const divForm = css`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  text-transform: uppercase;
  font-family: fantasy;
  width: 55%;
  margin: auto;
`;
const inputstyle = css`
  margin: 15px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  &:focus {
    border-color: #30336b;
  }
`;

const imgstyle = css`
  border: 1.5px solid #30336b;
  border-radius: 3px;
  box-shadow: 10px 5px 5px #535c68;
  margin: 30px;
`;

const buttonstyle = css`
  margin: 15px;
  padding: 15px;
  font-size: 1rem;
  border: 1px solid #535c68;
  border-radius: 4px;
  font-weight: bold;
  width: 20%;
  margin: auto;
  &:hover {
    background-color: #95afc0;
  }
`;

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memes, setMemes] = useState([]);
  const [names, setNames] = useState([]);
  const [select, setSelect] = useState('https://memegen.link/bender');

  useEffect(() => {
    //this function fetches the images
    fetch('https://memegen.link/api/templates/')
      .then((res) => res.json())

      .then((data) => {
        // log all the names and urls from templates as Object
        const imgNames = Object.keys(data);
        setNames(imgNames);
        const imgLinks = Object.values(data);
        setMemes(imgLinks);
        // console.log(Object.entries(data)); this one returns names AND urls
      })
      .catch((e) => console.log(e));
  }, []);

  const onChangeSelect = (event) => {
    // Updates the img when user picks one from the dropdown
    setSelect(event.target.value);
  };

  //these two update the text on the meme
  const onChangeBottom = (event) => {
    // console.log(event.target.value);
    setBottomText(event.target.value);
  };
  const onChangeTop = (event) => {
    // console.log(event.target.value);
    setTopText(event.target.value);
  };

  //provides the individual URL of every img plus the text
  const finalUrl =
    select +
    '/' +
    topText.replace('', '_') +
    '/' +
    bottomText.replace('', '_') +
    '.jpg';

  // const listItems = names.map((name, i) => name);

  // let memeMapped = memes.map((name, i) => {
  //   return {
  //     name: i } ; } the idea is to map over links and assign links to names which were mapped over kinda the names ARe links

  //this function downloads the image

  function downloadHandler() {
    const url = finalUrl;
    const name = finalUrl.replace('https://memegen.link/', ''); //so that the downloaded img end up with normal names
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, name.toString());
        } else {
          let a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = name.toString();
          a.click();
        }
      });
  }

  return (
    <div className="form" css={divForm}>
      <h2 css={generatorStyle}> This part here generates memes</h2>
      <p>Pick an image:</p>
      <select id="memes" onChange={onChangeSelect} css={inputstyle}>
        {memes.map((link, i) => {
          return (
            <option value={link.replace('api/templates/', '')}>
              "{names[i]}"
            </option>
          );
        })}
        <option value="meme1"></option>
      </select>

      <input
        css={inputstyle}
        placeholder="Top line"
        type="text"
        onChange={onChangeTop}
        value={topText}
      />

      <input
        css={inputstyle}
        placeholder="Bottom line"
        type="text"
        value={bottomText}
        onChange={onChangeBottom}
      />

      <img src={finalUrl} alt="One meme" css={imgstyle}></img>

      <button
        css={buttonstyle}
        data-name={names.toString}
        data-url={finalUrl}
        onClick={downloadHandler}
        // download  --- commented out because it also works without  it
      >
        Download the image
      </button>
    </div>
  );
}

//Klammer situation out of control
