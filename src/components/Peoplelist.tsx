import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import peopleList from "../mocks/people.json";

interface Person {
  name: string;
  surname: string;
  email: string;
  whatsapp: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledHeaderCell = styled(StyledTableCell)({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
});

const StyledTableContainer = styled(TableContainer)({
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
});

const PeopleList: React.FC = () => {
  const [people, setPeople] = useState<Person[]>(peopleList);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get("/people");
        setPeople(response.data);
      } catch (error) {
        console.error("Failed to fetch people", error);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
    <h1>List of people</h1>
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledHeaderCell>Name</StyledHeaderCell>
            <StyledHeaderCell>Surname</StyledHeaderCell>
            <StyledHeaderCell>Email</StyledHeaderCell>
            <StyledHeaderCell>WhatsApp</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person, index) => (
            <TableRow key={index}>
              <StyledTableCell>{person.name}</StyledTableCell>
              <StyledTableCell>{person.surname}</StyledTableCell>
              <StyledTableCell>{person.email}</StyledTableCell>
              <StyledTableCell>{person.whatsapp}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
    </>
  );
};

export default PeopleList;
