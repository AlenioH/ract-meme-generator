import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';

const generatorStyle = css`
  text-align: center;
  text-transform: uppercase;
  font-family: fantasy;
`;

function MemeGenerator(props) {
  // const [img, setImg] = useState([]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  //  async function fetchImage() {
  //   //function onclick
  // do i need an API key????
  //   // Get the memes
  //    try const imgData = await fetch('https://memegen.link')
  //   .then((res) => console.log(imgData));
  // //     .then((res) => res.json())
  //  .catch((err) => console.error(err));
  //   // const { memes } = await imgData.data;
  //   // Update images state
  //   // await setImg(memes);
  // }
  const onChangeBottom = (event) => {
    console.log(event.target.value);
    setBottomText(event.target.value);
  };
  const onChangeTop = (event) => {
    console.log(event.target.value);
    setTopText(event.target.value); //it tracks the changes i think but how do i get the text to show on the pic
  };
  const link =
    'https://memegen.link/bender/' +
    { topText } +
    '/' +
    { bottomText } +
    '.jpg'; //and replace spaces with lodashes;

  return (
    <div className="form">
      <h2 css={generatorStyle}> This part here generates memes</h2>

      <img src={link} alt="One meme"></img>
      {/* <label for="memes">Choose image:</label>
      <select id="memes">
        <option value="meme1">Memes everywhere</option>
      </select> */}

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

      {/* <button type="button" onClick={() => props.onSubmit(topText, bottomText)}>
        Submit! 
      </button> */}
    </div>
  ); //the button kinda crashes everything
}

export default MemeGenerator;

// https://memegen.link/bender/my_own_app/with_black_jack_and_hooks.jpg
