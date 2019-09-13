import { css } from 'styled-components';


export const FONT_WEIGHT = {
  light: 100,
  regular: 400,
  semibold: 600,
  bold: 800
};

export const FONT_SIZE = {
  small: '14px',
  medium: '16px',
  large: '18px',
  xLarge: '26px',
  xxLarge: '29px'
};


const sizes = {
  desktop: 1920,
  smallDesktop: 1440,
  tablet: 1024,
  phone: 576,
};

const minSizes = {
  desktop: 1440,
  smallDesktop: 1024,
  tablet: 576,
  phone: 0,
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(...args)}
      }
    `;

  return acc;
}, {});

export const inverseMedia = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
      @media (min-width: ${minSizes[label] / 16}em) {
        ${css(...args)}
      }
    `;

  return acc;
}, {});


export default media;