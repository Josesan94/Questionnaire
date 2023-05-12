import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import peopleList from '../mocks/people.json'
import questionnairesMock from '../mocks/questionnaire.json'

interface Questionnaire {
  questionnaire_id: number;
  questionnaire_description: string;
}

interface Person {
  name: string;
  surname: string;
  email: string;
  whatsapp: string;
}

const AssignQuestionnaireForm: React.FC = () => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>(questionnairesMock);
  const [people, setPeople] = useState<Person[]>(peopleList);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<
    number | ""
  >(0);
  const [selectedPerson, setSelectedPerson] = useState<string | "">("");

  useEffect(() => {
    const fetchQuestionnairesAndPeople = async () => {
      try {
        const [questionnairesResponse, peopleResponse] = await Promise.all([
          axios.get("/questionnaires"),
          axios.get("/people"),
        ]);

        setQuestionnaires(questionnairesResponse.data);
        setPeople(peopleResponse.data);
      } catch (error) {
        console.error("Failed to fetch questionnaires or people", error);
      }
    };

    fetchQuestionnairesAndPeople();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const person = people.find((p) => p.email === selectedPerson);

  if (!person) {
    console.error('Selected person not found');
    return;
  }

  const newAssignedQuestionnaire = {
    Assigned_questionnaire_id: Math.random(), // generate a random ID for demonstration purposes
    Id_questionnaire: selectedQuestionnaire,
    Name: person.name,
    Surname: person.surname,
    Mail: person.email,
    Whatsapp: person.whatsapp,
  };

  console.log('Generated JSON:', newAssignedQuestionnaire);

    try {
      const response = await axios.post("/assigned-questionnaires", {
        questionnaire_id: selectedQuestionnaire,
        person_email: selectedPerson,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Failed to assign questionnaire", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel id="questionnaire-select-label">Questionnaire</InputLabel>
        <Select
          labelId="questionnaire-select-label"
          value={selectedQuestionnaire}
          onChange={(event) =>
            setSelectedQuestionnaire(event.target.value as number)
          }
        >
          {questionnaires.map((questionnaire) => (
            <MenuItem
              key={questionnaire.questionnaire_id}
              value={questionnaire.questionnaire_id}
            >
              {questionnaire.questionnaire_description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="person-select-label">Person</InputLabel>
        <Select
          labelId="person-select-label"
          value={selectedPerson}
          onChange={(event) => setSelectedPerson(event.target.value as string)}
        >
          {people.map((person) => (
            <MenuItem key={person.email} value={person.email}>
              {person.name} {person.surname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Assign Questionnaire
      </Button>
    </form>
  );
};

export default AssignQuestionnaireForm;
