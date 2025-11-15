import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import createPDFBuffer from "./pdf/templates.js";
import createExcelBuffer from "./excel/exportExcel.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// ======================
// EXCEL REPORT
// ======================
app.post("/report/excel", async (req, res) => {
  try {
    const buffer = await createExcelBuffer(req.body);

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");

    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate Excel", detail: err.message });
  }
});

// ======================
// START SERVICE
// ======================
const PORT = process.env.PORT || 6000;
const server = app.listen(PORT, () =>
  console.log(`Running on port ${PORT}`)
);

export default app;

