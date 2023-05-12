import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import questionnairesMock from '../mocks/questionnaire.json'
interface Questionnaire {
  questionnaire_id: number;
  questionnaire_description: string;
}

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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Questionnaire ID</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questionnaires.map((questionnaire) => (
            <TableRow key={questionnaire.questionnaire_id}>
              <TableCell>{questionnaire.questionnaire_id}</TableCell>
              <TableCell>{questionnaire.questionnaire_description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuestionnaireTable;