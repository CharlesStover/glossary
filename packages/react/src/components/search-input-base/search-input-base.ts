/* eslint-disable @typescript-eslint/no-magic-numbers */
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

/*
AppBar search component as defined by the MUI documentation:
  https://mui.com/components/app-bar/
*/

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',

  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default StyledInputBase;
