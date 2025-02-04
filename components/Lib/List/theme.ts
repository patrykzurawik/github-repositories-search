import { createTheme, TableStyles } from 'react-data-table-component';

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
    highlightOnHover: {
      default: 'var(--color-accent-transparent)',
    },
  },
  'dark'
);

const styles: TableStyles = {
  rows: {
    style: {
      border: '1px solid var(--color-background-light)',
    },
  },
  headRow: {
    style: {
      border: '1px solid var(--color-background-light)',
    },
  },
  head: {
    style: {
      backgroundColor: 'var(--color-glass)',
    },
  },
  headCells: {
    style: {
      padding: 'var(--gap-sm)',
      fontWeight: 'bold',
      fontSize: '1.2em',
      color: 'var(--color-accent)',
    },
  },
  cells: {
    style: {
      padding: 'var(--gap-sm)',
    },
  },
  pagination: {
    style: {
      border: '1px solid var(--color-background-light)',
      backgroundColor: 'var(--color-glass)',
      justifyContent: 'center',
    },
  },
};

export {
  getTheme,
  styles,
};