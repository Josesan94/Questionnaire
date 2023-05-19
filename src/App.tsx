import React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {theme} from './theme/theme'
import { Container, Box, CssBaseline } from '@mui/material';
import QuestionnaireTable from './components/QuestionnaireTable';
import PeopleList from './components/Peoplelist';
import AssignQuestionnaireForm from './components/AssignQuestionnaireForm';
import AssignedQuestionnaireTable from './components/AssignedQuestionnaire';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <Container>
      <Box sx={{ marginBottom: 5 }}>
        <QuestionnaireTable />
      </Box>
      <Box sx={{ marginBottom: 5 }}>
        <PeopleList />
      </Box>
      <Box sx={{ marginBottom: 5 }}>
        <AssignQuestionnaireForm />
      </Box>
      <Box sx={{ marginBottom: 5 }}>
        <AssignedQuestionnaireTable />
      </Box>
    </Container>
    </ThemeProvider>
  );
}

export default App;
