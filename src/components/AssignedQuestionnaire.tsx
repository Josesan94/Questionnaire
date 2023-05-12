import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon, Save as SaveIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import AssignedQuestionnairesMock from '../mocks/assigned-questionnaires.json'

interface AssignedQuestionnaire {
  assigned_questionnaire_id: number;
  questionnaire_id: number;
  name: string;
  surname: string;
  email: string;
  whatsapp: string;
}

const AssignedQuestionnaireTable: React.FC = () => {
  const [assignedQuestionnaires, setAssignedQuestionnaires] = useState<AssignedQuestionnaire[]>(AssignedQuestionnairesMock);
  const [open, setOpen] = useState(false);
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState<AssignedQuestionnaire | null>(null);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [tempData, setTempData] = useState<Partial<AssignedQuestionnaire>>({});

  useEffect(() => {
    const fetchAssignedQuestionnaires = async () => {
      try {
        const response = await axios.get("/assigned-questionnaires");
        setAssignedQuestionnaires(response.data);
      } catch (error) {
        console.error("Failed to fetch assigned questionnaires", error);
      }
    };

    fetchAssignedQuestionnaires();
  }, []);

  const handleDelete = async (id: number) => {
      setAssignedQuestionnaires(
        assignedQuestionnaires.filter(
          (aq) => aq.assigned_questionnaire_id !== 1
        )
        
      );
      console.log("BORRADO")
    // try {
    //   await axios.delete(`/assigned-questionnaires/${id}`);
    //   setAssignedQuestionnaires(
    //     assignedQuestionnaires.filter(
    //       (aq) => aq.assigned_questionnaire_id !== 1
    //     )
        
    //   );
    //   console.log("BORRADO")
    // } catch (error) {
    //   console.error("Failed to delete assigned questionnaire", error);
    // }
  };
   const handleChange = (name: keyof AssignedQuestionnaire, value: string) => {
    setTempData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = (assignedQuestionnaire: AssignedQuestionnaire) => {
    setTempData(assignedQuestionnaire);
    setEditMode(assignedQuestionnaire.assigned_questionnaire_id);
  };

  const handleSave = (assignedQuestionnaire: AssignedQuestionnaire) => {
    setAssignedQuestionnaires((prevData) =>
      prevData.map((item) =>
        item.assigned_questionnaire_id === assignedQuestionnaire.assigned_questionnaire_id ? { ...item, ...tempData } : item
      )
    );
    setEditMode(null);
  };


  const HandleEditAssignedQuestionnaire = async (
    assignedQuestionnaireId: number,
    updatedData: Partial<AssignedQuestionnaire>
  ) => {
    try {
      await axios.put(
        `/api/assigned-questionnaires/${assignedQuestionnaireId}`,
        updatedData
      );
      setAssignedQuestionnaires((prevState) => {
        return prevState.map((assignedQuestionnaire) => {
          if (
            assignedQuestionnaire.assigned_questionnaire_id ===
            assignedQuestionnaireId
          ) {
            return { ...assignedQuestionnaire, ...updatedData };
          }
          return assignedQuestionnaire;
        });
      });
    } catch (error) {
      console.error("Error editing assigned questionnaire:", error);
    }
  };

  const handleView = (assignedQuestionnaire: AssignedQuestionnaire) => {
    setCurrentQuestionnaire(assignedQuestionnaire);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // TODO: Implement handleEdit and handleView

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Assigned ID</TableCell>
            <TableCell>Questionnaire ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>WhatsApp</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignedQuestionnaires.map((assignedQuestionnaire) => (
            <TableRow key={assignedQuestionnaire.assigned_questionnaire_id}>
              <TableCell>
                {assignedQuestionnaire.assigned_questionnaire_id}
              </TableCell>
              <TableCell>{assignedQuestionnaire.questionnaire_id}</TableCell>
              <TableCell>
                {editMode === assignedQuestionnaire.assigned_questionnaire_id ? (
                  <TextField name="name" value={tempData.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
                ) : (
                  assignedQuestionnaire.name
                )}
              </TableCell>
              <TableCell>
                {editMode === assignedQuestionnaire.assigned_questionnaire_id ? (
                  <TextField name="surname" value={tempData.surname || ''} onChange={(e) => handleChange('surname', e.target.value)} />
                ) : (
                  assignedQuestionnaire.surname
                )}
              </TableCell>
              <TableCell>
                {editMode === assignedQuestionnaire.assigned_questionnaire_id ? (
                  <TextField name="email" value={tempData.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
                ) : (
                  assignedQuestionnaire.email
                )}
              </TableCell>
              <TableCell>
                {editMode === assignedQuestionnaire.assigned_questionnaire_id ? (
                  <TextField name="whatsapp" value={tempData.whatsapp || ''} onChange={(e) => handleChange('whatsapp', e.target.value)} />
                ) : (
                  assignedQuestionnaire.whatsapp
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleView(assignedQuestionnaire)}>
                  <VisibilityIcon />
                </IconButton>

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Questionnaire Details</DialogTitle>
                  <DialogContent>
                    {currentQuestionnaire && (
                      <div>
                        <DialogContentText>
                          <strong>Assigned ID:</strong> {currentQuestionnaire.assigned_questionnaire_id}
                        </DialogContentText>
                        <DialogContentText>
                          <strong>Questionnaire ID:</strong> {currentQuestionnaire.questionnaire_id}
                        </DialogContentText>
                        <DialogContentText>
                          <strong>Name:</strong> {currentQuestionnaire.name}
                        </DialogContentText>
                        <DialogContentText>
                          <strong>Surname:</strong> {currentQuestionnaire.surname}
                        </DialogContentText>
                        <DialogContentText>
                          <strong>Email:</strong> {currentQuestionnaire.email}
                        </DialogContentText>
                        <DialogContentText>
                          <strong>WhatsApp:</strong> {currentQuestionnaire.whatsapp}
                        </DialogContentText>
                      </div>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
                {editMode === assignedQuestionnaire.assigned_questionnaire_id ? (
                  <IconButton onClick={() => handleSave(assignedQuestionnaire)}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleEdit(assignedQuestionnaire)}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton onClick={() => handleDelete(assignedQuestionnaire.assigned_questionnaire_id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssignedQuestionnaireTable;
