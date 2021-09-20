import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import type { Theme as ThemeType } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { ComponentType } from 'react';
import { useCallback, useMemo, useState } from 'react';

interface State {
  readonly handleThemeToggle: () => void;
  readonly ThemeIcon: ComponentType<unknown>;
  readonly theme: ThemeType;
}

enum Theme {
  Dark = 'dark',
  Light = 'light',
}

const darkTheme: ThemeType = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme: ThemeType = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function useTheme(): State {
  const prefersDarkMode: boolean = useMediaQuery(
    '(prefers-color-scheme: dark)',
  );

  const getDefaultTheme = (): Theme => {
    if (prefersDarkMode) {
      return Theme.Dark;
    }
    return Theme.Light;
  };

  const [theme, setTheme] = useState(getDefaultTheme);

  return {
    handleThemeToggle: useCallback((): void => {
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      setTheme((oldTheme: Theme): Theme => {
        switch (oldTheme) {
          case Theme.Dark:
            return Theme.Light;
          case Theme.Light:
            return Theme.Dark;
        }
      });
    }, []),

    ThemeIcon: useMemo(() => {
      switch (theme) {
        case Theme.Dark:
          return Brightness7Icon;
        case Theme.Light:
          return Brightness4Icon;
      }
    }, [theme]),

    theme: useMemo((): ThemeType => {
      switch (theme) {
        case Theme.Dark:
          return darkTheme;
        case Theme.Light:
          return lightTheme;
      }
    }, [theme]),
  };
}
