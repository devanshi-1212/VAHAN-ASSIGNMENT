import axios from "axios";
import React, { useEffect, useState } from "react";
import addNotification from "react-push-notification";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { AddCircleOutlineOutlined as AddIcon } from "@mui/icons-material";

const TableCard = () => {
  const pathname = window.location.pathname;
  const tableName = pathname.slice(8);
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [newEntryValue, setNewEntryValue] = useState([]);
  const [isEditRow, setIsEditRow] = useState(false);
  const [editRowId, setEditRowId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCols = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/tables/" + tableName
        );

        setCols(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllCols();
  }, []);

  useEffect(() => {
    const fetchAllRows = async () => {
      try {
        const res = await axios.get("http://localhost:8800/data/" + tableName);

        setRows(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllRows();
  }, []);

  const handleChange = (e, i) => {
    const updatedValue = [...newEntryValue];

    updatedValue[i] = e.target.value;
    setNewEntryValue(updatedValue);
  };

  const handleAddRow = () => {
    setIsAddingRow(true);
  };

  const handleCancelAdd = () => {
    setIsAddingRow(false);
    setNewEntryValue([]);
  };

  const handleAddEntry = async () => {
    setIsAddingRow(false);

    await axios.post("http://localhost:8800/tables/" + tableName, [
      newEntryValue,
      cols,
    ]);

    // console.log("axios sent request to add entry");
    setNewEntryValue([]);

    addNotification({
      title: "Entry created successfully!",
      native: true,
    });

    // console.log("notification sent");
    window.location.reload();
  };

  const handleEditRow = (e) => {
    setIsEditRow(true);
    setEditRowId(e);
  };

  const handleCancelEditRow = () => {
    setIsEditRow(false);
    setEditRowId(0);
  };

  const handleEditEntry = async () => {
    await axios.put("http://localhost:8800/tables/" + tableName, [
      newEntryValue,
      cols,
      editRowId,
    ]);

    setIsEditRow(false);
    setEditRowId(0);

    addNotification({
      title: "Entry edited successfully!",
      native: true,
    });

    // console.log("notification sent");
    window.location.reload();
  };

  const handleDeleteRow = async (e) => {
    let answer = window.confirm(`Do you want to delete entry index ${e} ?`);

    if (answer) {
      try {
        console.log(e);
        await axios.delete("http://localhost:8800/tables/" + tableName, {
          data: { e },
        });

        addNotification({
          title: `Entry indexed at "${e}" deleted successfully!`,
          native: true,
        });

        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>{tableName}</h1>

      <Button
        variant="contained"
        onClick={() => handleAddRow()}
        endIcon={<AddIcon />}
        style={{ marginRight: 20 }}
      >
        Make new entry
      </Button>

      <Button variant="contained" onClick={() => navigate("/")}>
        Go to Dashboard
      </Button>

      <br />

      {isAddingRow && (
        <div>
          {cols.map((col, i) => (
            <TextField
              key={i}
              label={col.Field}
              variant="outlined"
              fullWidth
              onChange={(e) => handleChange(e, i)}
            />
          ))}

          <br />
          <br />

          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleAddEntry}
          >
            Save New Entry
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleCancelAdd()}
          >
            Cancel
          </Button>
        </div>
      )}

      {isEditRow && (
        <div>
          <h4>Index {editRowId}</h4>

          {cols.slice(1).map((col, i) => (
            <TextField
              key={i}
              label={col.Field}
              variant="outlined"
              fullWidth
              onChange={(e) => handleChange(e, i)}
            />
          ))}

          <br />
          <br />

          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEditEntry()}
          >
            Edit Entry
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleCancelEditRow()}
          >
            Cancel Editing
          </Button>
        </div>
      )}

      <TableContainer sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              {cols.map((col) => (
                <TableCell key={col.Field}>{col.Field}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {Object.values(row).map((value) => (
                  <TableCell key={value}>{value}</TableCell>
                ))}

                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditRow(row.Index)}
                  >
                    Edit
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDeleteRow(row.Index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableCard;
