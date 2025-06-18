const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function getGroupedIncome(req, res) {
    const sql = `
        SELECT 
            (SELECT IFNULL(SUM(amount), 0) 
             FROM payment 
             WHERE DATE(payment_date) = CURRENT_DATE()) AS total_today,

            (SELECT IFNULL(SUM(amount), 0) 
             FROM payment 
             WHERE YEAR(payment_date) = YEAR(CURRENT_DATE()) 
               AND MONTH(payment_date) = MONTH(CURRENT_DATE())) AS total_month,
               
            (SELECT IFNULL(SUM(amount), 0) 
             FROM payment 
             WHERE YEAR(payment_date) = YEAR(CURRENT_DATE())) AS total_year;
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err); 
            return res.status(HttpStatusCode.InternalServerError).json("Internal Server Error"); 
        }
        
        // Loop through the result object to check for null values and replace them with 0
        const sanitizedResult = result.map(item => {
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    if (item[key] === null) {
                        item[key] = 0;
                    }
                }
            }
            return item;
        });

        if (!sanitizedResult || sanitizedResult.length === 0) {
            return res.status(HttpStatusCode.NotFound).json("No data found"); 
        }

        return res.status(HttpStatusCode.Ok).json(sanitizedResult);
    });
};
