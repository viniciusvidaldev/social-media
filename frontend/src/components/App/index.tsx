import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AppRoutes } from '../../routes';
import GlobalStyles from '../../styles/global';

import * as S from './styles';

import { defaultTheme } from '../../styles/themes/default';
import { Header } from '../Header';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <S.Container>
          <Header />

          <S.Wrapper>
            <AppRoutes />
          </S.Wrapper>
        </S.Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
