const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Cấu hình kết nối PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "NewDB",
  password: "nhan123",
  port: 5432,
});

// Kiểm tra kết nối cơ sở dữ liệu khi khởi động server
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client:", err.stack);
  } else {
    console.log("Database connection successful");
    release();
  }
});

//Collection JoinProject

// get để lấy dữ liệu bảng JoinProject
app.get("/api/projects", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "JoinProject"'); // Sử dụng dấu ngoặc kép nếu tên bảng có chữ hoa
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Create JoinProject
app.post("/api/projects", async (req, res) => {
  const { status_id, DateStart, DateEnd, ProductName, Description } = req.body;

  const startDate = new Date(DateStart);
  const endDate = new Date(DateEnd);

  const localStartDate = new Date(
    startDate.getTime() - startDate.getTimezoneOffset() * 60000
  );

  const localEndDate = new Date(
    endDate.getTime() - endDate.getTimezoneOffset() * 60000
  );

  try {
    const result = await pool.query(
      'INSERT INTO "JoinProject" (status_id, "DateStart", "DateEnd", "ProductName", "Description") VALUES ($1 ,$2, $3, $4, $5)',
      [
        status_id,
        localStartDate.toISOString(),
        localEndDate.toISOString(),
        ProductName,
        Description,
      ]
    );
    res.status(201).json(result);
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Internal Server Error");
  }
});

//Update JoinProject

app.put("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  const { DateStart, DateEnd, ProductName, Description } = req.body;

  const startDate = new Date(DateStart);
  const endDate = new Date(DateEnd);

  const localStartDate = new Date(
    startDate.getTime() - startDate.getTimezoneOffset() * 60000
  );
  const localEndDate = new Date(
    endDate.getTime() - endDate.getTimezoneOffset() * 60000
  );

  try {
    const result = await pool.query(
      'UPDATE "JoinProject" SET "DateStart" = $1, "DateEnd" = $2, "ProductName" = $3, "Description" = $4 WHERE id = $5',
      [
        localStartDate.toISOString(),
        localEndDate.toISOString(),
        ProductName,
        Description,
        id,
      ]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete JoinProject

app.put("/api/projects/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE "JoinProject" SET status_id = $1 WHERE id = $2',
      [false, id]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Collection Education

// get để lấy dữ liệu bảng Education
app.get("/api/education", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Education"'); // Sử dụng dấu ngoặc kép nếu tên bảng có chữ hoa
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Create Education
app.post("/api/education", async (req, res) => {
  const {
    status_id,
    DateStart,
    DateEnd,
    File,
    StandardTrain,
    BasisTrain,
    FormTrain,
    TypeTrain,
    SpecializedTrain,
    IndustryTrain,
    DegreeClassification,
    TitleTrain,
    EducationLevel,
    SentStudy,
  } = req.body;

  const startDate = new Date(DateStart);
  const endDate = new Date(DateEnd);

  const localStartDate = new Date(
    startDate.getTime() - startDate.getTimezoneOffset() * 60000
  );
  const localEndDate = new Date(
    endDate.getTime() - endDate.getTimezoneOffset() * 60000
  );

  try {
    const result = await pool.query(
      'INSERT INTO "Education" (status_id, "DateStart", "DateEnd", "File", "StandardTrain", "BasisTrain", "FormTrain", "TypeTrain", "SpecializedTrain", "IndustryTrain", "DegreeClassification", "TitleTrain", "EducationLevel", "SentStudy") VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
      [
        status_id,
        localStartDate.toISOString(),
        localEndDate.toISOString(),
        File,
        StandardTrain,
        BasisTrain,
        FormTrain,
        TypeTrain,
        SpecializedTrain,
        IndustryTrain,
        DegreeClassification,
        TitleTrain,
        EducationLevel,
        SentStudy,
      ]
    );
    res.status(201).json(result);
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Education
app.put("/api/education/:id", async (req, res) => {
  const { id } = req.params;
  const {
    DateStart,
    DateEnd,
    File,
    StandardTrain,
    BasisTrain,
    FormTrain,
    TypeTrain,
    SpecializedTrain,
    IndustryTrain,
    DegreeClassification,
    TitleTrain,
    EducationLevel,
    SentStudy,
  } = req.body;

  const startDate = new Date(DateStart);
  const endDate = new Date(DateEnd);

  const localStartDate = new Date(
    startDate.getTime() - startDate.getTimezoneOffset() * 60000
  );
  const localEndDate = new Date(
    endDate.getTime() - endDate.getTimezoneOffset() * 60000
  );

  try {
    const result = await pool.query(
      'UPDATE "Education" SET "DateStart" = $1, "DateEnd" = $2, "File" = $3, "StandardTrain" = $4 ,"BasisTrain" = $5, "FormTrain" = $6, "TypeTrain" = $7, "SpecializedTrain" = $8, "IndustryTrain" = $9, "DegreeClassification" = $10, "TitleTrain" = $11, "EducationLevel" = $12, "SentStudy" = $13 WHERE id = $14',
      [
        localStartDate.toISOString(),
        localEndDate.toISOString(),
        File,
        StandardTrain,
        BasisTrain,
        FormTrain,
        TypeTrain,
        SpecializedTrain,
        IndustryTrain,
        DegreeClassification,
        TitleTrain,
        EducationLevel,
        SentStudy,
        id,
      ]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Education
app.put("/api/education/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE "Education" SET status_id = $1 WHERE id = $2',
      [false, id]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Collection Certificate

// get để lấy dữ liệu bảng Certificate
app.get("/api/certificate", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Certificate"'); // Sử dụng dấu ngoặc kép nếu tên bảng có chữ hoa
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Create Certificate
app.post("/api/certificate", async (req, res) => {
  const {
    status_id,
    DateStart,
    DateEnd,
    DateCertificate,
    DegreeCertificate,
    TypeCertificate,
    FieldCertificate,
    LevelCertificate,
    File,
    BasisTrain,
    LocationTrain,
    Classification,
    Score,
    SentStudy,
    InternationalCertificate,
  } = req.body;

  const startDate = new Date(DateStart);
  const endDate = new Date(DateEnd);
  const cerDate = new Date(DateCertificate);

  const localStartDate = new Date(
    startDate.getTime() - startDate.getTimezoneOffset() * 60000
  );
  const localEndDate = new Date(
    endDate.getTime() - endDate.getTimezoneOffset() * 60000
  );
  const localCerDate = new Date(
    cerDate.getTime() - cerDate.getTimezoneOffset() * 60000
  );

  console.log("INSERT");

  console.log(localStartDate.toISOString());
  console.log(localEndDate.toISOString());
  console.log(localCerDate.toISOString());
  try {
    const result = await pool.query(
      'INSERT INTO "Certificate" (status_id, "DateStart", "DateEnd", "DateCertificate", "DegreeCertificate", "TypeCertificate", "FieldCertificate", "LevelCertificate", "File", "BasisTrain", "LocationTrain", "Classification", "Score", "SentStudy", "InternationalCertificate") VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
      [
        status_id,
        localStartDate.toISOString(),
        localEndDate.toISOString(),
        localCerDate.toISOString(),
        DegreeCertificate,
        TypeCertificate,
        FieldCertificate,
        LevelCertificate,
        File,
        BasisTrain,
        LocationTrain,
        Classification,
        Score,
        SentStudy,
        InternationalCertificate,
      ]
    );
    res.status(201).json(result);
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Certificate
app.put("/api/certificate/:id", async (req, res) => {
  const { id } = req.params;
  const {
    DateStart,
    DateEnd,
    DateCertificate,
    DegreeCertificate,
    TypeCertificate,
    FieldCertificate,
    LevelCertificate,
    File,
    BasisTrain,
    LocationTrain,
    Classification,
    Score,
    SentStudy,
    InternationalCertificate,
  } = req.body;

  const startDate = new Date(DateStart);
  const endDate = new Date(DateEnd);
  const cerDate = new Date(DateCertificate);

  const localStartDate = new Date(
    startDate.getTime() - startDate.getTimezoneOffset() * 60000
  );
  const localEndDate = new Date(
    endDate.getTime() - endDate.getTimezoneOffset() * 60000
  );
  const localCerDate = new Date(
    cerDate.getTime() - cerDate.getTimezoneOffset() * 60000
  );

  console.log("UPDATE");

  console.log(localStartDate.toISOString());
  console.log(localEndDate.toISOString());
  console.log(localCerDate.toISOString());

  try {
    const result = await pool.query(
      'UPDATE "Certificate" SET "DateStart" = $1, "DateEnd" = $2, "DateCertificate" = $3, "DegreeCertificate" = $4 ,"TypeCertificate" = $5, "FieldCertificate" = $6, "LevelCertificate" = $7, "File" = $8, "BasisTrain" = $9, "LocationTrain" = $10, "Classification" = $11, "Score" = $12, "SentStudy" = $13, "InternationalCertificate" = $14 WHERE id = $15',
      [
        localStartDate.toISOString(),
        localEndDate.toISOString(),
        localCerDate.toISOString(),
        DegreeCertificate,
        TypeCertificate,
        FieldCertificate,
        LevelCertificate,
        File,
        BasisTrain,
        LocationTrain,
        Classification,
        Score,
        SentStudy,
        InternationalCertificate,
        id,
      ]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Certificate
app.put("/api/certificate/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE "Certificate" SET status_id = $1 WHERE id = $2',
      [false, id]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Collection Training

// get để lấy dữ liệu bảng Training
app.get("/api/training", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Training"'); // Sử dụng dấu ngoặc kép nếu tên bảng có chữ hoa
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Create Training
app.post("/api/training", async (req, res) => {
  const {
    status_id,
    DateStart,
    DateEnd,
    Unit,
    JobTitle,
    CourseTrain,
    OrganizeForm,
    UnitTrain,
    Score,
    ResultTrain,
    ResultSubject,
    Status,
    CostTrain,
    TimeCommit,
    TimeCommitRemain,
    IssueCertificate,
    Contract,
    ContentCommit,
  } = req.body;

  const startDate = new Date(DateStart);
  const endDate = new Date(DateEnd);

  const localStartDate = new Date(
    startDate.getTime() - startDate.getTimezoneOffset() * 60000
  );
  const localEndDate = new Date(
    endDate.getTime() - endDate.getTimezoneOffset() * 60000
  );

  try {
    const result = await pool.query(
      'INSERT INTO "Training" (status_id, "DateStart", "DateEnd", "Unit", "JobTitle", "CourseTrain", "OrganizeForm", "UnitTrain", "Score", "ResultTrain", "ResultSubject", "Status", "CostTrain", "TimeCommit", "TimeCommitRemain", "IssueCertificate", "Contract", "ContentCommit") VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)',
      [
        status_id,
        localStartDate.toISOString(),
        localEndDate.toISOString(),
        Unit,
        JobTitle,
        CourseTrain,
        OrganizeForm,
        UnitTrain,
        Score,
        ResultTrain,
        ResultSubject,
        Status,
        CostTrain,
        TimeCommit,
        TimeCommitRemain,
        IssueCertificate,
        Contract,
        ContentCommit,
      ]
    );
    res.status(201).json(result);
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Training
app.put("/api/training/:id", async (req, res) => {
  const { id } = req.params;
  const {
    DateStart,
    DateEnd,
    Unit,
    JobTitle,
    CourseTrain,
    OrganizeForm,
    UnitTrain,
    Score,
    ResultTrain,
    ResultSubject,
    Status,
    CostTrain,
    TimeCommit,
    TimeCommitRemain,
    IssueCertificate,
    Contract,
    ContentCommit,
  } = req.body;

  const startDate = new Date(DateStart);
  const endDate = new Date(DateEnd);

  const localStartDate = new Date(
    startDate.getTime() - startDate.getTimezoneOffset() * 60000
  );
  const localEndDate = new Date(
    endDate.getTime() - endDate.getTimezoneOffset() * 60000
  );

  try {
    const result = await pool.query(
      'UPDATE "Training" SET "DateStart" = $1, "DateEnd" = $2, "Unit" = $3, "JobTitle" = $4 ,"CourseTrain" = $5, "OrganizeForm" = $6, "UnitTrain" = $7, "Score" = $8, "ResultTrain" = $9, "ResultSubject" = $10, "Status" = $11, "CostTrain" = $12, "TimeCommit" = $13, "TimeCommitRemain" = $14, "IssueCertificate" = $15, "Contract" = $16, "ContentCommit" = $17 WHERE id = $18',
      [
        localStartDate.toISOString(),
        localEndDate.toISOString(),
        Unit,
        JobTitle,
        CourseTrain,
        OrganizeForm,
        UnitTrain,
        Score,
        ResultTrain,
        ResultSubject,
        Status,
        CostTrain,
        TimeCommit,
        TimeCommitRemain,
        IssueCertificate,
        Contract,
        ContentCommit,
        id,
      ]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Training
app.put("/api/training/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE "Training" SET status_id = $1 WHERE id = $2',
      [false, id]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
