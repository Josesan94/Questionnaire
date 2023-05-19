import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import questionnairesMock from '../mocks/questionnaire.json'

interface Questionnaire {
  questionnaire_id: number;
  questionnaire_description: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledHeaderCell = styled(StyledTableCell)({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
});

const StyledTableContainer = styled(TableContainer)({
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
});

const QuestionnaireTable: React.FC = () => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>(questionnairesMock);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const response = await axios.get('/questionnaires');
        setQuestionnaires(response.data);
      } catch (error) {
        console.error('Failed to fetch questionnaires', error);
      }
    };

    fetchQuestionnaires();
  }, []);

  return (
    <>
    <h1>List of questionnaires</h1>
    <StyledTableContainer >
      <Table>
        <TableHead>
          <TableRow>
            <StyledHeaderCell>Questionnaire ID</StyledHeaderCell>
            <StyledHeaderCell>Description</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questionnaires.map((questionnaire) => (
            <TableRow key={questionnaire.questionnaire_id}>
              <StyledTableCell>{questionnaire.questionnaire_id}</StyledTableCell>
              <StyledTableCell>{questionnaire.questionnaire_description}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
    </>
  );
};

export default QuestionnaireTable;