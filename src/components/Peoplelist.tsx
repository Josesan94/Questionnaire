import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import peopleList from '../mocks/people.json'

interface Person {
  name: string;
  surname: string;
  email: string;
  whatsapp: string;
}

const PeopleList: React.FC = () => {
  const [people, setPeople] = useState<Person[]>(peopleList);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get('/people');
        setPeople(response.data);
      } catch (error) {
        console.error('Failed to fetch people', error);
      }
    };

    fetchPeople();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>WhatsApp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person, index) => (
            <TableRow key={index}>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.surname}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.whatsapp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PeopleList;