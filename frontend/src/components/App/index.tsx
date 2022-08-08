import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Toaster } from 'react-hot-toast';
import { AppRoutes } from '../../routes';
import GlobalStyles from '../../styles/global';

import * as S from './styles';

import { defaultTheme } from '../../styles/themes/default';
import { AuthProvider } from '../../contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyles />

          <Toaster
            toastOptions={{
              duration: 2000,
            }}
          />

          <S.Container>
            <S.Wrapper>
              <AppRoutes />
            </S.Wrapper>
          </S.Container>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
