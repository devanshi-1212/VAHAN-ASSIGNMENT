import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import addNotification from "react-push-notification";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

const Dashboard = () => {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTables = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tables");

        setTables(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllTables();
  }, []);

  const handleView = (e) => {
    let path = "/tables/" + e;

    console.log(path);
    navigate(path);
  };

  const handleDelete = async (e) => {
    let answer = window.confirm(`Do you want to delete table ${e} ?`);

    if (answer) {
      try {
        await axios.delete("http://localhost:8800/tables", { data: { e } });

        addNotification({
          title: `Table "${e}" deleted successfully!`,
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
      <h1>Welcome, User!</h1>

      <Button variant="contained" onClick={() => navigate("/createtable")}>
        Create new table
      </Button>
      <br />
      <br />
      <br />

      <Grid container spacing={2}>
        {tables.map((table, i) => (
          <Grid item xs={6} sm={3} md={3} key={i}>
            <Card>
              <CardContent>
                <Typography variant="body2">Table {i + 1}</Typography>
                <Typography variant="h5">{table.Tables_in_test}</Typography>
                <br />
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleView(table.Tables_in_test)}
                  >
                    View/Update Table
                  </Button>
                  <br /> <br />
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(table.Tables_in_test)}
                  >
                    Delete Table
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
