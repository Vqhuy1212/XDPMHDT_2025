import ExcelJS from 'exceljs';

export default async function createExcelBuffer(data) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Report'); // Thêm worksheet mới

  // ========================
  // HEADER
  // ========================
  ws.mergeCells('A1', 'E1');
  ws.getCell('A1').value = 'EV Rental Report'; // Tiêu đề báo cáo
  ws.getCell('A1').font = { size: 20, bold: true };
  ws.getCell('A1').alignment = { horizontal: 'center' };

  ws.addRow([]); // Thêm dòng trống

  // ========================
  // SUMMARY
  // ========================
  ws.addRow(['Summary']);
  ws.getRow(3).font = { bold: true }; // Định dạng chữ đậm

  data.summary?.forEach((s) => {
    ws.addRow([s.label, s.value]);
  });

  ws.addRow([]); // Thêm dòng trống

  // ========================
  // TABLE HEADER
  // ========================
  ws.addRow(['Date', 'Vehicle', 'Renter', 'Cost', 'Status']);
  const header = ws.getRow(ws.lastRow.number);
  header.font = { bold: true };
  header.border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  };

  // ========================
  // TABLE DATA
  // ========================
  data.records?.forEach((r) => {
    ws.addRow([r.date, r.vehicle, r.renter, r.cost, r.status]);
  });

  // ========================
  // CHART DATA (NEW SHEET)
  // ========================
  const chartSheet = wb.addWorksheet('Chart Data');
  chartSheet.addRow(['Vehicle', 'Rentals']);

  data.chartLabels?.forEach((label, index) => {
    chartSheet.addRow([label, data.chartData[index]]);
  });

  // ========================
  // STYLING COLUMNS
  // ========================
  ws.columns.forEach((col) => {
    col.width = 20; // Cài đặt chiều rộng cột
  });

  // Thêm border cho các ô
  ws.eachRow({ includeEmpty: false }, function (row) {
    row.eachCell({ includeEmpty: true }, function (cell) {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  });

  // ========================
  // FINAL BUFFER
  // ========================
  return await wb.xlsx.writeBuffer();
}
