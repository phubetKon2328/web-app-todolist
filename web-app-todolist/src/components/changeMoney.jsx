import { useState } from "react";

function ChangeCalculator() {
  const [amountDue, setAmountDue] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [change, setChange] = useState(null);

  const calculateChange = () => {
    const due = parseFloat(amountDue);
    const paid = parseFloat(amountPaid);

    if (isNaN(due) || isNaN(paid) || paid < due) {
      alert("Please enter valid amounts");
      return;
    }

    let change = paid - due;
    const denominations = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
    const changeBreakdown = {};

    for (let denomination of denominations) {
      const count = Math.floor(change / denomination);
      change %= denomination;
      if (count > 0) {
        changeBreakdown[denomination] = count;
      }
    }
    setChange(changeBreakdown);
  };
  return (
    <div>
      <h2>Change Calculator</h2>
      <div>
        <label>Amount Due:</label>
        <input
          type="number"
          value={amountDue}
          onChange={(e) => setAmountDue(e.target.value)}
        />
      </div>
      <div>
        <label>Amount Paid:</label>
        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
        />
      </div>
      <button onClick={calculateChange}>Calculate Change</button>
      {change && (
        <div>
          <h3>Change Breakdown:</h3>
          <ul>
            {Object.entries(change).map(([denomination, count]) => (
              <li key={denomination}>
                {count} x {denomination}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChangeCalculator;
