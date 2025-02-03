import { createTheme } from 'react-data-table-component';

const getTheme = () => createTheme(
  'ghs',
  {
    text: {
      primary: 'var(--color-text)',
      secondary: 'var(--color-text)',
    },
    background: {
      default: 'transparent',
    },
    striped: {
      default: 'var(--color-background)',
    },
    divider: {
      default: 'var(--color-background)',
    },
    sortFocus: {
      default: 'blue',
    },
  },
  'dark'
);

const styles = {
  headCells: {
    style: {
      fontWeight: 'bold',
      fontSize: '1.2em',
      color: 'var(--color-accent)',
    },
  },
};

export {
  getTheme,
  styles,
};