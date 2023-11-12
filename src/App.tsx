import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { DropZone } from './components/DropZone/DropZone';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
      <DropZone />
    </MantineProvider>
  );
}
