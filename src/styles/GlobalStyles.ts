import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        border: none;
        box-sizing: border-box;
        font-family: inherit;
    }

    li {
      list-style: none;
    }

    a {
      text-decoration: none;
    }

    body {
      font-family: 'Irish Grover', cursive;
    }
`;

export default GlobalStyles;
