import styled from 'styled-components';

type IconProps = {
  item: React.ReactNode;
  className?: string;
  link?: string;
  description?: string;
  onClick?: VoidFunction;
};

const StyledIcon = styled.span<{ description?: string }>`
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;

  &::after {
    ${({ description }) => (description ? `content: '${description}'` : '')};
    z-index: 100;
    position: absolute;
    white-space: nowrap;
    top: 0%;
    left: 110%;
    opacity: 0.9;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    padding: 2px 10px;
    border-radius: 5px;
    pointer-events: none;
    transform: scale(0);
    transition: transform 0.3s;
  }

  &:hover {
    transform: scale(1.2);
    z-index: 100;

    &::after {
      transform: scale(0.8);
    }
  }

  &:active {
    transform: scale(1.5);
  }

  & svg * {
    fill: currentColor;
  }
`;

const Icon = ({ item, link, description, className, onClick }: IconProps) => {
  const icon = (
    <StyledIcon
      className={className}
      onClick={onClick}
      description={description}
    >
      {item}
    </StyledIcon>
  );

  // const icon = link ? <a href={link}>{item}</a> : item;

  return link ? <a href={link}>{icon}</a> : icon;
};

export default Icon;
