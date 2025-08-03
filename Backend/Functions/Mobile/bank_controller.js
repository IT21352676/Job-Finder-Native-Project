const connection = require("../../Services/connection");

// DESC: CREATE BANK ACCOUNT
const createBankAcc = async (req, res) => {
  const { seeker_id, bank, holder, bankACC, branch } = req.body;

  const query = `
    INSERT INTO parttime_srilanka.seeker_wallet 
    (seeker_id, bank, holder, bankACC, branch, earnings) 
    VALUES (?, ?, ?, ?, ?, 1500)
  `;

  if (!seeker_id) {
    return res.status(400).json({ error: "Seeker is not defined" });
  }

  if (!bank || !holder || !bankACC || !branch) {
    return res.status(400).json({ error: "Required fields must be filled" });
  }

  const values = [seeker_id, bank, holder, bankACC, branch];

  connection.query(query, values, (err) => {
    if (err) {
      return res.status(500).json({ error: `Something went wrong: ${err}` });
    }
    return res
      .status(201)
      .json({ message: "Bank account created successfully!" });
  });
};

// DESC: GET ALL BANK DETAILS BY SEEKER ID
const getBankDetails = async (req, res) => {
  const { seeker_id } = req.params;

  const query =
    "SELECT * FROM parttime_srilanka.seeker_wallet WHERE seeker_id = ?";
  if (!seeker_id) {
    return res.status(400).json({ error: "Seeker is not defined" });
  }

  connection.query(query, [seeker_id], (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Something went wrong: ${err}` });
    }
    return res.status(201).json({ data });
  });
};

// DESC: WITHDRAWAL FUNCTION
const withdrawal = async (req, res) => {
  const { wallet_id } = req.params;
  const { amount } = req.body;

  const selectQuery =
    "SELECT * FROM parttime_srilanka.seeker_wallet WHERE wallet_id = ?";
  const updateQuery =
    "UPDATE parttime_srilanka.seeker_wallet SET earnings = ? WHERE wallet_id = ?";
  const insertQuery =
    "INSERT INTO parttime_srilanka.seeker_wallet_debit (wallet_id, transaction_date, amount) VALUES (?, NOW(), ?)";

  if (!wallet_id || !amount) {
    return res.status(400).json({ error: "Wallet ID and amount are required" });
  }

  connection.query(selectQuery, [wallet_id], (err, data) => {
    if (err) return res.status(500).json({ error: `Select failed: ${err}` });

    if (!data.length) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const currentAmount = data[0].earnings;

    if (currentAmount < amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    const newAmount = currentAmount - amount;

    connection.query(updateQuery, [newAmount, wallet_id], (err) => {
      if (err) return res.status(500).json({ error: `Update failed: ${err}` });

      connection.query(insertQuery, [wallet_id, amount], (err) => {
        if (err)
          return res.status(500).json({ error: `Insert failed: ${err}` });

        return res.status(200).json({ message: "Withdrawal successful" });
      });
    });
  });
};

const payment = async (req, res) => {
  const { poster_id, amount, job_id, seeker_id } = req.body;

  if (!poster_id || !amount || !job_id || !seeker_id) {
    return res.status(400).json({ error: "Required fields are empty" });
  }

  const insertQuery = `
    INSERT INTO payment 
    (poster_id, amount, payment_date, device_charge, reseller_charge, seeker_charge, service_charge, job_id) 
    VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)
  `;

  const updateSeekerWalletQuery = `
    UPDATE parttime_srilanka.seeker_wallet 
    SET earnings = earnings + ? 
    WHERE seeker_id = ?
  `;

  const deviceCharge = amount * 0.05;
  const resellerCharge = amount * 0.1;
  const seekerCharge = amount * 0.7;
  const serviceCharge = amount * 0.15;

  const insertValues = [
    poster_id,
    amount,
    deviceCharge,
    resellerCharge,
    seekerCharge,
    serviceCharge,
    job_id,
  ];

  try {
    connection.beginTransaction((err) => {
      if (err) throw err;

      connection.query(insertQuery, insertValues, (err) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ error: `Insert failed: ${err.message}` });
          });
        }

        connection.query(
          updateSeekerWalletQuery,
          [seekerCharge, seeker_id],
          (err) => {
            if (err) {
              return connection.rollback(() => {
                res
                  .status(500)
                  .json({ error: `Wallet update failed: ${err.message}` });
              });
            }

            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  res
                    .status(500)
                    .json({ error: `Commit failed: ${err.message}` });
                });
              }

              return res
                .status(201)
                .json({ message: "Payment successful and wallet updated" });
            });
          }
        );
      });
    });
  } catch (error) {
    res.status(500).json({ error: `Unhandled error: ${error.message}` });
  }
};

module.exports = { createBankAcc, withdrawal, payment, getBankDetails };
