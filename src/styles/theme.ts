export const colors = {
  black: 'hsl(0, 0%, 21%)',
  white: 'hsl(0, 0%, 100%)',
  'opacified-white': 'hsla(0, 0%, 95%, 0.847)',
  'opacified-black': 'hsla(0, 0%, 0%, 0.247)',
} as const;

const boxShadow = {
  default: `0px 1px 4px ${colors['opacified-black']}`,
} as const;

const textShadow = {
  default: `0px 1px 4px ${colors['opacified-black']}`,
} as const;

const spacing = {
  xsm: '5px',
  sm: '10px',
  df: '20px',
  md: '30px',
  lg: '40px',
} as const;

const transition = {
  bouncy: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

const theme = {
  boxShadow,
  textShadow,
  spacing,
  transition,
};

export default theme;
