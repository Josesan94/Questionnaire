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



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledHeaderCell = styled(StyledTableCell)({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: theme.spacing(2, 2, 0, 0),
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  '.MuiTypography-root': {
    color: theme.palette.text.secondary,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));


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
          (aq) => aq.assigned_questionnaire_id !== id
        )
        
      );
      console.log("BORRADO")
      //procedimiento para el borrado de cuestionarios, si existiese endpoint correspondiente
    // try {
    //   await axios.delete(`/assigned-questionnaires/${id}`);
    //   setAssignedQuestionnaires(
    //     assignedQuestionnaires.filter(
    //       (aq) => aq.assigned_questionnaire_id !== id
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

 //PROCEDIMIENTO PARA EDITAR CUESTIONARIOS Y GUARDAR INFORMACION EN EP.
  // const HandleEditAssignedQuestionnaire = async (
  //   assignedQuestionnaireId: number,
  //   updatedData: Partial<AssignedQuestionnaire>
  // ) => {
  //   try {
  //     await axios.put(
  //       `/api/assigned-questionnaires/${assignedQuestionnaireId}`,
  //       updatedData
  //     );
  //     setAssignedQuestionnaires((prevState) => {
  //       return prevState.map((assignedQuestionnaire) => {
  //         if (
  //           assignedQuestionnaire.assigned_questionnaire_id ===
  //           assignedQuestionnaireId
  //         ) {
  //           return { ...assignedQuestionnaire, ...updatedData };
  //         }
  //         return assignedQuestionnaire;
  //       });
  //     });
  //   } catch (error) {
  //     console.error("Error editing assigned questionnaire:", error);
  //   }
  // };

  const handleView = (assignedQuestionnaire: AssignedQuestionnaire) => {
    setCurrentQuestionnaire(assignedQuestionnaire);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // TODO: Implement handleEdit and handleView

  return (
    <>
    <h1>Assigned questionnaires</h1>
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledHeaderCell>Assigned ID</StyledHeaderCell>
            <StyledHeaderCell>Questionnaire ID</StyledHeaderCell>
            <StyledHeaderCell>Name</StyledHeaderCell>
            <StyledHeaderCell>Surname</StyledHeaderCell>
            <StyledHeaderCell>Email</StyledHeaderCell>
            <StyledHeaderCell>WhatsApp</StyledHeaderCell>
            <StyledHeaderCell>Actions</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignedQuestionnaires.map((assignedQuestionnaire) => (
            <TableRow key={assignedQuestionnaire.assigned_questionnaire_id}>
              <StyledTableCell>
                {assignedQuestionnaire.assigned_questionnaire_id}
              </StyledTableCell>
              <StyledTableCell>{assignedQuestionnaire.questionnaire_id}</StyledTableCell>
              <StyledTableCell>
                {editMode === assignedQuestionnaire.assigned_questionnaire_id ? (
                  <TextField name="name" value={tempData.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
                ) : (
                  assignedQuestionnaire.name
                )}
              </StyledTableCell>
              <StyledTableCell>
                {editMode === assignedQuestionnaire.assigned_questionnaire_id ? (
                  <TextField name="surname" value={tempData.surname || ''} onChange={(e) => handleChange('surname', e.target.value)} />
                ) : (
                  assignedQuestionnaire.surname
                )}
              </StyledTableCell>
              <StyledTableCell>
                {editMode === assignedQuestionnaire.assigned_questionnaire_id ? (
                  <TextField name="email" value={tempData.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
                ) : (
                  assignedQuestionnaire.email
                )}
              </StyledTableCell>
              <StyledTableCell>
                {editMode === assignedQuestionnaire.assigned_questionnaire_id ? (
                  <TextField name="whatsapp" value={tempData.whatsapp || ''} onChange={(e) => handleChange('whatsapp', e.target.value)} />
                ) : (
                  assignedQuestionnaire.whatsapp
                )}
              </StyledTableCell>
              <StyledTableCell>
                <StyledIconButton onClick={() => handleView(assignedQuestionnaire)}>
                  <VisibilityIcon />
                </StyledIconButton>

                <StyledDialog open={open} onClose={handleClose}>
                  <StyledDialogTitle>Questionnaire Details</StyledDialogTitle>
                  <StyledDialogContent>
                    {currentQuestionnaire && (
                      <div>
                        <StyledDialogContentText>
                          <strong>Assigned ID:</strong> {currentQuestionnaire.assigned_questionnaire_id}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                          <strong>Questionnaire ID:</strong> {currentQuestionnaire.questionnaire_id}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                          <strong>Name:</strong> {currentQuestionnaire.name}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                          <strong>Surname:</strong> {currentQuestionnaire.surname}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                          <strong>Email:</strong> {currentQuestionnaire.email}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                          <strong>WhatsApp:</strong> {currentQuestionnaire.whatsapp}
                        </StyledDialogContentText>
                      </div>
                    )}
                  </StyledDialogContent>
                  <DialogActions>
                    <StyledButton onClick={handleClose} color="primary">
                      Close
                    </StyledButton>
                  </DialogActions>
                </StyledDialog>
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
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
    </>
  );
};

export default AssignedQuestionnaireTable;
