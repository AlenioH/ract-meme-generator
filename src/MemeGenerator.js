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
  const [img, setImg] = useState([]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  // async function fetchImage() {
  //   //function on submit!!
  //   // Get the memes
  //   const imgData = await fetch('https://memegen.link/')
  //     .then((res) => res.json())
  //     .catch((err) => console.error(err));
  //   // const { memes } = await imgData.data;
  //   // Update images state
  //   // await setImg(memes);
  //   // Update activeImage state
  //   // await setActiveImage(memes[0].url);
  // }

  //   fetch("https://memegen.link/bender/my_own_app/with_black_jack_and_hooks.jpg?watermark=none", {
  //   "referrer": "https://memegen.link/",
  //   "referrerPolicy": "no-referrer-when-downgrade",
  //   "body": null,
  //   "method": "GET",
  //   "mode": "cors",
  //   "credentials": "omit"
  // });
  return (
    <div className="form">
      <h2 css={generatorStyle}> This part here generates memes</h2>
      <label for="memes">Choose image:</label>
      <select id="memes">
        <option value="meme1">
          {/* '<a href="https://memegen.link/">Bender</a>' this return just empty objectsgi */}{' '}
          some value
        </option>
      </select>
      <input
        name="text-top"
        placeholder="Text top"
        type="text"
        value={props.topText}
      />
      <input
        name="text-bottom"
        placeholder="Text bottom"
        type="text"
        value={props.topBottom}
      />
    </div>
  );
}

export default MemeGenerator;
