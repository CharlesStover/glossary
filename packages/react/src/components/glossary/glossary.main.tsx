import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import Item from '../../components/item';
import Search from '../../components/search';
import SearchIconWrapper from '../../components/search-icon-wrapper';
import StyledInputBase from '../../components/search-input-base';
import type DefinitionFileGetter from '../../types/definition-file-getter';
import mapComponentToPropMapper from '../../utils/map-component-to-prop-mapper';
import useGlossary from './glossary.main.hook';

interface Props {
  readonly children: Readonly<Record<string, DefinitionFileGetter>>;
}

const mapPropsToItem = mapComponentToPropMapper(Item);

export default function Glossary({ children }: Props): ReactElement {
  const {
    handleSearchChange,
    handleThemeToggle,
    itemsProps,
    search,
    ThemeIcon,
    theme,
  } = useGlossary(children);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography component="h1" noWrap variant="h6">
            Glossary
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
              placeholder="Search…"
              value={search}
            />
          </Search>
          <Box flexGrow={1} textAlign="right">
            <IconButton onClick={handleThemeToggle}>
              <ThemeIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <List>{itemsProps.map(mapPropsToItem)}</List>
    </ThemeProvider>
  );
}
