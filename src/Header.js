/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const headerMain = css`
  text-align: center;
  text-transform: uppercase;
  font-family: fantasy;
`;

function Header() {
  return <h1 css={headerMain}>Header</h1>;
}

export default Header;
