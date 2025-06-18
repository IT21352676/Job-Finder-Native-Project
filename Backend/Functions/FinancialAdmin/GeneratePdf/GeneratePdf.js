// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const connection = require('../../../Services/connection');

// module.exports = async function generateFinancialReport(req, res) {
//   const { fromDate, toDate } = req.body;

//   try {
//     const query1 = 'SELECT payment_id, payment_date, service_charge, job_poster FROM parttime_srilanka.payment INNER JOIN parttime_srilanka.job WHERE payment.job_id = job.job_id AND payment_date BETWEEN ? AND ?;';
//     const query2 = 'SELECT FirstName, LastName FROM job_poster WHERE EmailAddress=?';

//     const payments = await queryAsync(query1, [fromDate, toDate]);
//     const returnData = [];

//     if (payments.length > 0) {
//       for (const payment of payments) {
//         const user = await queryAsync(query2, payment.job_poster);
//         payment.posterName = `${user[0].FirstName} ${user[0].LastName}`;
//         returnData.push(payment);
//       }
//     } else {
//       return res.status(404).json("No payments found for the given date range");
//     }

//     const doc = new PDFDocument();
//     const outputFilePath = 'output.pdf';

//     doc.pipe(fs.createWriteStream(outputFilePath));

//     doc.font('Times-Bold')
//       .fontSize(21)
//       .text('Financial Report', { align: 'center' })
//       .text(`From ${formatDate(fromDate)} to ${formatDate(toDate)}`, { align: 'center', marginBottom: 20 })
//       .image('../frontend/src/Assets/logo_trans.png', 40, 20, { width: 80 })
//       .moveDown();

//     doc.fontSize(16).text('Payment Details', { align: 'center', marginTop: 20 }).moveDown();

//     if (returnData.length > 0) {
//       const table = {
//         headers: ['Payment ID', 'Payment Date', 'Service Charge', 'Job Poster'],
//         rows: returnData.map(payment => [
//           payment.payment_id,
//           formatDate(payment.payment_date),
//           payment.service_charge,
//           payment.posterName
//         ]),
//       };
      
//       // Add table to PDF
//       table.rows.forEach((row, rowIndex) => {
//         row.forEach((cell, cellIndex) => {
//           doc.text(cell, {
//             continued: cellIndex < row.length - 1, // Continue text on the same line until the last cell
//             underline: rowIndex === 0 // Underline headers
//           });
//         });
//         doc.moveDown(); // Move to the next line after each row
//       });

//     } else {
//       doc.fillColor('red').fontSize(19).text(`No payment details found from ${formatDate(fromDate)} to ${formatDate(toDate)}`, { align: 'center' });
//     }

//     doc.end();

//     res.status(200).json({ success: true, message: 'PDF generated successfully', path: outputFilePath });

//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     res.status(500).json({ success: false, error: 'Failed to generate PDF' });
//   }
// };

// // Helper function to wrap connection.query in a promise
// function queryAsync(query, values) {
//   return new Promise((resolve, reject) => {
//     connection.query(query, values, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }

// function formatDate(date) {
//   if (date) {
//     const formattedDate = new Date(date);
//     return `${formattedDate.getFullYear()}-${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedDate.getDate().toString().padStart(2, '0')}`;
//   }
//   return '';
// }
