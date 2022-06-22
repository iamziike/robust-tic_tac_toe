const color = {
  black: 'hsl(0, 0%, 21%)',
  white: 'hsl(0, 0%, 100%)',
  'opacified-black': 'hsla(0, 0%, 0%, 0.247)',
  'opacified-black--deep': 'hsla(0, 0%, 0%, 0.6)',
} as const;

const boxShadow = {
  default: `0px 1px 4px ${color['opacified-black']}`,
} as const;

const textShadow = {
  default: `0px 1px 4px ${color['opacified-black']}`,
} as const;

const spacing = {
  xsm: '5px',
  sm: '10px',
  df: '20px',
  md: '30px',
  lg: '40px',
} as const;

const theme = {
  color,
  boxShadow,
  textShadow,
  spacing,
};

export default theme;
