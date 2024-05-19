import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addNotification from "react-push-notification";
import axios from "axios";
import { Button } from "@mui/material";

const CreateTable = () => {
  const options = [
    { label: "Select", value: "Select" },
    { label: "Integer", value: "INT" },
    { label: "String", value: "VARCHAR(255)" },
    { label: "Character", value: "CHAR" },
    { label: "Decimal", value: "DOUBLE" },
    { label: "True/False", value: "BOOLEAN" },
    { label: "Date", value: "DATETIME()" },
  ];

  const [tableName, setTableName] = useState([{ name: "" }]);
  const [row, setRow] = useState([
    {
      colname: "",
      coltype: "",
    },
  ]);

  const navigate = useNavigate();

  const handleAddRow = () => {
    setRow([
      ...row,
      {
        colname: "",
        coltype: "",
      },
    ]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...row];

    onChangeVal[i][name] = value;
    setRow(onChangeVal);
  };

  const handleTableName = (e) => {
    setTableName(e.target.value);
  };

  const handleDelete = (i) => {
    const updatedRow = row
      .filter((val, index) => index !== i)
      .map((val) => ({
        ...val,
      }));

    setRow(updatedRow);
  };

  const handleSubmit = async (e) => {
    console.log(row);
    // e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8800/tables", [
        tableName,
        row,
      ]);

      console.log(res);

      // console.log("axios post table created");

      setTableName({ name: "" });
      setRow([
        {
          colname: "",
          coltype: "",
        },
      ]);

      // console.log("new rows set");

      if (res.data === "Table has been created successfully.") {
        addNotification({
          title: `Table "${tableName}" created successfully!`,
          native: true,
        });

        navigate("/");
      } else {
        addNotification({
          title: `Incorrect selection done. Create table according to MySQL rules`,
          native: true,
        });

        window.location.reload();
      }

      // console.log("notification sent");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Create a new table</h1>

      <div>
        <Button
          variant="contained"
          onClick={() => handleAddRow()}
          style={{ marginRight: 20 }}
        >
          Add new column
        </Button>

        <Button
          variant="contained"
          onClick={() => handleSubmit()}
          style={{ marginRight: 20 }}
        >
          Create Table
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          style={{ marginRight: 20 }}
        >
          Go to Dashboard
        </Button>

        <div>
          Table Name:
          <input
            type="text"
            name="tableName"
            style={{ margin: "10px 60px" }}
            onChange={(e) => handleTableName(e)}
          />
        </div>

        <div>
          <span style={{ margin: "10px 60px" }}>Column Name</span>
          <span style={{ margin: "10px 45px" }}>Datatype</span>
        </div>

        {row.map((val, i) => {
          return (
            <div key={i}>
              <input
                type="text"
                name="colname"
                value={val.colname}
                onChange={(e) => handleChange(e, i)}
                style={{ margin: "10px 10px" }}
              />

              <select
                name="coltype"
                value={val.coltype}
                onChange={(e) => handleChange(e, i)}
              >
                {options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>

              {row.length > 1 && (
                <button onClick={() => handleDelete(i)}>Delete</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateTable;
