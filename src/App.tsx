import React from 'react';

import { Container, Box } from '@mui/material';
import QuestionnaireTable from './components/QuestionnaireTable';
import PeopleList from './components/Peoplelist';
import AssignQuestionnaireForm from './components/AssignQuestionnaireForm';
import AssignedQuestionnaireTable from './components/AssignedQuestionnaire';

function App() {
  return (
    <Container>
      <Box sx={{ marginBottom: 2 }}>
        <QuestionnaireTable />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <PeopleList />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <AssignQuestionnaireForm />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <AssignedQuestionnaireTable />
      </Box>
    </Container>
  );
}

export default App;
