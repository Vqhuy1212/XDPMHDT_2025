import PDFDocument from "pdfkit";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import path from "path";

// Khởi tạo canvas cho Chart.js
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 600, height: 400, backgroundColour: "white" });

export default async function createPDFBuffer(data) {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    // ========================
    // HEADER WITH LOGO
    // ========================
    doc.image(path.join(__dirname, 'logo.png'), 40, 40, { width: 50 });
    doc.fontSize(22).text("EV Rental Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Generated at: ${new Date().toLocaleString()}`);
    doc.moveDown(2);

    // ========================
    // SUMMARY SECTION
    // ========================
    doc.fontSize(16).text("─ Summary ─");
    doc.moveDown();

    if (data.summary) {
      data.summary.forEach((item) => {
        doc.fontSize(12).text(`${item.label}: ${item.value}`);
      });
    }

    doc.moveDown(2);

    // ========================
    // TABLE
    // ========================
    doc.fontSize(16).text("─ Detailed Records ─");
    doc.moveDown();

    const tableTop = doc.y;

    doc.fontSize(12).text("Date", 40, tableTop);
    doc.text("Vehicle", 150, tableTop);
    doc.text("Renter", 260, tableTop);
    doc.text("Cost", 380, tableTop);
    doc.text("Status", 460, tableTop);

    let y = tableTop + 20;

    data.records?.forEach((r) => {
      doc.text(r.date, 40, y);
      doc.text(r.vehicle, 150, y);
      doc.text(r.renter, 260, y);
      doc.text(r.cost + " $", 380, y);
      doc.text(r.status, 460, y);
      y += 18;
    });

    doc.moveDown(2);

    // ========================
    // ADDING A CHART
    // ========================
    const chartData = {
      labels: data.chartLabels,
      datasets: [{
        label: 'Rentals by Vehicle',
        data: data.chartData,
        borderColor: 'rgb(17, 119, 187)',
        backgroundColor: 'rgba(17, 119, 187, 0.2)',
        fill: true,
      }]
    };

    const chartConfig = {
      type: 'line', // Choose chart type (line, bar, etc.)
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Rentals Per Vehicle' },
          legend: { display: true }
        },
        scales: {
          x: { title: { display: true, text: 'Vehicles' } },
          y: { title: { display: true, text: 'Number of Rentals' } }
        }
      }
    };

    // Render chart as base64 image
    const chartImage = await chartJSNodeCanvas.renderToDataURL(chartConfig);

    doc.text("─ Chart: Rentals by Vehicle ─");
    doc.moveDown();
    doc.image(chartImage, { fit: [500, 300], align: 'center' });

    doc.end();
  });
}
