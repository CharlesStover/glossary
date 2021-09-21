/* eslint-disable @typescript-eslint/no-magic-numbers */
import { styled } from '@mui/material/styles';

/*
AppBar search component as defined by the MUI documentation:
  https://mui.com/components/app-bar/
*/

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default SearchIconWrapper;
