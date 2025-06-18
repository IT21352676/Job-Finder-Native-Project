const { HttpStatusCode } = require('axios');
const connection = require('../../../Services/connection');

module.exports = async function GetMonthlyRevenue(req, res) {
    const sql = `
    SELECT
    MONTH(payment_date) AS month_number,  
        SUM((seeker_charge)*10/100+(service_charge)) AS monthly_revenue  
    FROM
        parttime_srilanka.payment
    WHERE
        YEAR(payment_date) = YEAR(CURDATE())  
    GROUP BY
        month_number  
    ORDER BY
        month_number;
    
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err); 
            return res.status(HttpStatusCode.InternalServerError).json("Internal Server Error"); 
        }
        

        if (!result || result.length === 0) {
            return res.status(HttpStatusCode.NotFound).json("No data found"); 
        }

       
        return res.status(HttpStatusCode.Ok).json(result);
    });
};
