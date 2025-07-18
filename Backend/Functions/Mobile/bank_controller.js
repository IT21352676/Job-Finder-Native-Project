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

module.exports = { createBankAcc, withdrawal };
