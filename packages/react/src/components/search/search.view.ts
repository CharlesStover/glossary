/* eslint-disable @typescript-eslint/no-magic-numbers */
import { alpha, styled } from '@mui/material/styles';

/*
AppBar search component as defined by the MUI documentation:
  https://mui.com/components/app-bar/
*/

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const Search = styled('div')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  marginRight: theme.spacing(2),
  position: 'relative',
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },

  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}));

export default Search;
