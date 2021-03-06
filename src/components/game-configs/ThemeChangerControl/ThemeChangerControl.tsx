import useFunctionalityStore from '../../../store/store-hooks/userFunctionalityStore';
import Icon from '../../ui/Icon/Icon';
import { ReactComponent as NightThemeIcon } from '/src/assets/night-theme.svg';
import { ReactComponent as DayThemeIcon } from '/src/assets/sun-theme.svg';

type ThemeChangerControlProps = {
  shouldShowDescription?: boolean;
};

const ThemeChangerControl = ({
  shouldShowDescription = true,
}: ThemeChangerControlProps) => {
  const { getStore, changeTheme } = useFunctionalityStore();

  const { themeMode } = getStore();

  const handleClick = () => {
    changeTheme(themeMode === 'DARK' ? 'LIGHT' : 'DARK');
  };

  const icon = themeMode === 'DARK' ? <DayThemeIcon /> : <NightThemeIcon />;

  return (
    <Icon
      item={icon}
      onClick={handleClick}
      description={shouldShowDescription ? 'Change Theme' : ''}
    />
  );
};

export default ThemeChangerControl;
