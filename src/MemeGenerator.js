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

function MemeGenerator(props) {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memes, setMemes] = useState([]);
  const [names, setNames] = useState([]);
  const [select, setSelect] = useState('https://memegen.link/bender');
  // {
  //   headers: { 'Content-Type': 'application/json' },
  // }
  useEffect(() => {
    fetch('https://memegen.link/api/templates/')
      .then((res) => res.json())

      .then((data) => {
        //console.log(Object.values(data));
        // log all the names and urls from templates as Object
        const imgNames = Object.keys(data);
        // console.log(Object.keys(data));
        setNames(imgNames);
        const imgLinks = Object.values(data);
        setMemes(imgLinks);
        // console.log(Object.entries(data));
      })
      .catch((e) => console.log(e));
  }, []);
  const onChangeSelect = (event) => {
    // Step 2: Update the value with whatever the user types in the box
    setSelect(event.target.value);
  };
  const onChangeBottom = (event) => {
    console.log(event.target.value);
    setBottomText(event.target.value);
  };
  const onChangeTop = (event) => {
    console.log(event.target.value);
    setTopText(event.target.value); //it tracks the changes i think but how do i get the text to show on the pic, just a thought: generating a meme should be a function, so that the set values get passed in there
  };

  const finalUrl =
    select +
    '/' +
    topText.replace('', '_') +
    '/' +
    bottomText.replace('', '_') +
    '.jpg';

  // let memeMapped = memes.map((name, i) => {
  //   return {
  //     name: i } ; } the idea is to map over links and assign links to names which were mapped over

  function downloadHandler() {
    const url = finalUrl;
    const name = names;
    // name.toString();
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        //IE and edge not works with a.click() for downloading
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
    <div className="form">
      <h2 css={generatorStyle}> This part here generates memes</h2>
      <select id="memes" onChange={onChangeSelect}>
        {memes.map((name, i) => {
          return (
            <option key={i} value={name.replace('api/templates/', '')}>
              {name.replace('api/templates/', '')}
            </option>
          );
        })}
        <option value="meme1"></option>
      </select>

      <input
        // name="text-top"
        placeholder="Text top"
        type="text"
        onChange={onChangeTop}
        value={topText}
      />

      <input
        // name="text-bottom"
        placeholder="Text bottom"
        type="text"
        value={bottomText}
        onChange={onChangeBottom}
      />

      <img src={finalUrl} alt="One meme"></img>

      <button
        data-name={names.toString}
        data-url={finalUrl}
        //it works without - opens a save as window but a user needs to type in the data format. otherwise it throws an error
        //   download={downloadHandler} well this doesnt work,,,,ok the whole thing downloads but name/format issue plus datei type schaut lustig aus
        onClick={downloadHandler}
        download
      >
        Download the image
      </button>
    </div>
  );
}
//figure out the klammer situation
