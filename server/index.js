import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
});
const dbname = process.env.DB_DBNAME;

// this line allows us to send any json file using a client
// without this i was getting error when sending data from postman to create new entry
app.use(express.json());

// this line is allowing me to see all books in clg of inspect.
// console.log(res) inside fetchAllBooks
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend.");
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

// i ran this command in workbench and then i could see all rows in local host /books
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rashmisharma';

// SHOW ALL TABLES IN DATABASE
app.get("/tables", (req, res) => {
  const q = "SHOW TABLES";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// CREATE NEW TABLE
app.post("/tables", (req, res) => {
  const tableName = req.body[0].toLowerCase();
  const attributes = req.body[1];
  let q = `CREATE TABLE ${dbname}.${tableName}(`;

  q += "`" + "Index" + "` " + "INT PRIMARY KEY, ";

  attributes.map((val) => {
    const attrName = val["colname"];
    const datatype = val["coltype"];

    q += "`" + `${attrName}` + "` " + `${datatype}` + ", ";
  });

  q = q.slice(0, -1);
  q = q.slice(0, -1);
  q += ");";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json("Table has been created successfully.");
  });
});

// DELETE A TABLE
app.delete("/tables", (req, res) => {
  const tableName = Object.values(req.body)[0];
  const q = `DROP TABLE ${dbname}.${tableName}`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json("Table has been deleted successfully.");
  });
});

// SHOW COLUMNS IN A TABLE
app.get("/tables/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  let q = `SHOW COLUMNS FROM ${dbname}.${tableName}`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// INSERT ROW IN A TABLE
app.post("/tables/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  const cols = req.body[1];
  const vals = req.body[0];
  let q = `INSERT INTO ${dbname}.${tableName}(`;

  cols.map((col) => {
    const colName = col.Field;

    q += "`" + colName + "`, ";
  });

  q = q.slice(0, -1);
  q = q.slice(0, -1);
  q += ") VALUES(";

  vals.map((val, i) => {
    if (cols[i].Type === "tinyint(1)") q += val + ", ";
    else q += "'" + val + "', ";
  });

  q = q.slice(0, -1);
  q = q.slice(0, -1);
  q += ");";

  // console.log(q);

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// EDIT A ROW IN A TABLE
app.put("/tables/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  const cols = req.body[1];
  const vals = req.body[0];
  let q = `UPDATE ${dbname}.${tableName} SET `;

  vals.map((val, i) => {
    const colName = cols[i + 1].Field;

    q += "`" + colName + "`" + ` = `;

    if (cols[i + 1].Type === "tinyint(1)") q += val + ", ";
    else q += "'" + val + "', ";
  });

  q = q.slice(0, -1);
  q = q.slice(0, -1);
  q += " WHERE (" + "`" + "Index" + "` = " + "'" + `${req.body[2]}` + "');";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// DELETE A ROW FROM A TABLE
app.delete("/tables/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  const index = req.body["e"];
  const q =
    `DELETE FROM ${dbname}.${tableName} WHERE (` +
    "`Index` = '" +
    `${index}` +
    "');";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json("Entry has been deleted successfully.");
  });
});

// SHOW ALL ROWS FROM A TABLE
app.get("/data/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  const q = `SELECT * FROM ${dbname}.${tableName}`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
