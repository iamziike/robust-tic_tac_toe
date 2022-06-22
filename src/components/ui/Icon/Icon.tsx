import styled from 'styled-components';

const StyledIcon = styled.span`
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(1.5);
  }
`;

type IconProps = {
  item: React.ReactNode;
  link?: string;
};

const Icon = ({ item, link }: IconProps) => {
  const icon = link ? <a href={link}>{item}</a> : item;

  return <StyledIcon>{icon}</StyledIcon>;
};

export default Icon;
