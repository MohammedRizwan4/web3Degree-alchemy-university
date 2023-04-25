const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

// f95ddd0307fa8d3d6f51595551ba7dffe07781b81300715a93c5c48975980ad7
// 0446d9a52c70075a9d658510aadf4ab554306f689f579b0084fee66c0a10ee9509c681b337d45354f1323595fa4e0fb3a16ab423a8ada6f3467c65959d7a92afed

// 9b6a8baa6ef7c8a583773f5d2fa0bcf7f816742d8e844965a67eb92c9b77e32f
// 04f71d81860f6a678dbe9d70e7a516f23a61b23853593bab0901884fea0118b35fb6d9486b574aaafb54000b4f9d706fab6001cdc94d287e6a7e43dc42c4872cfc

// 7f6ba326970216ac6decabe34164014bfc8e9d3c34f1562a1d286ed2a52310eb
// 0436b2cf490a3c5cbf34dbf00a751beb22a059d87459452f286ae247ac4e5bea7c7bc55f033a34f0196c5f293320bfaacc9d7ed6ebb7f786d89efc3b0381773f38

const balances = {
  "0446d9a52c70075a9d658510aadf4ab554306f689f579b0084fee66c0a10ee9509c681b337d45354f1323595fa4e0fb3a16ab423a8ada6f3467c65959d7a92afed": 100,
  "04f71d81860f6a678dbe9d70e7a516f23a61b23853593bab0901884fea0118b35fb6d9486b574aaafb54000b4f9d706fab6001cdc94d287e6a7e43dc42c4872cfc": 50,
  "0436b2cf490a3c5cbf34dbf00a751beb22a059d87459452f286ae247ac4e5bea7c7bc55f033a34f0196c5f293320bfaacc9d7ed6ebb7f786d89efc3b0381773f38": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
