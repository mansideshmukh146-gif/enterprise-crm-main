import React, { useEffect, useState } from "react";
import "./Deals.css";

function Deals() {
  const [deals, setDeals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    customer: "",
    amount: "",
    status: "New",
  });

  // =========================
  // GET ALL DEALS
  // =========================

  const fetchDeals = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/deals"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch deals");
      }

      const data = await response.json();

      setDeals(data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // ADD DEAL
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/deals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            customer: formData.customer,
            amount: Number(formData.amount),
            status: formData.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add deal"
        );
      }

      alert("Deal added successfully!");

      setFormData({
        name: "",
        customer: "",
        amount: "",
        status: "New",
      });

      setShowForm(false);

      fetchDeals();

    } catch (error) {
      console.error("Error adding deal:", error);
      alert(error.message);
    }
  };

  // =========================
  // DELETE DEAL
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deal?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/deals/${id}`,
        {
          method: "DELETE",
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Delete failed: ${response.status} ${text}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete deal"
        );
      }

      alert(data.message || "Deal deleted successfully!");

      fetchDeals();

    } catch (error) {
      console.error("Error deleting deal:", error);
      alert(error.message);
    }
  };

  // =========================
  // CALCULATIONS
  // =========================

  const totalDeals = deals.length;

  const openDeals = deals.filter(
    (deal) =>
      deal.status === "New" ||
      deal.status === "In Progress" ||
      deal.status === "Negotiation"
  ).length;

  const wonDeals = deals.filter(
    (deal) => deal.status === "Won"
  ).length;

  const lostDeals = deals.filter(
    (deal) => deal.status === "Lost"
  ).length;

  return (
    <div className="deals-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="deals-header">

        <div>
          <h1>Deals</h1>

          <p>
            Manage and track your sales opportunities
          </p>
        </div>

        <button
          className="add-deal"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add New Deal"}
        </button>

      </div>


      {/* =========================
          ADD DEAL FORM
      ========================= */}

      {showForm && (
        <div className="deal-form">

          <h2>Add New Deal</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Deal Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter deal name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>Customer</label>

              <input
                type="text"
                name="customer"
                placeholder="Enter customer name"
                value={formData.customer}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>Amount</label>

              <input
                type="number"
                name="amount"
                placeholder="Enter deal amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>Stage</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option value="New">
                  New
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Negotiation">
                  Negotiation
                </option>

                <option value="Won">
                  Won
                </option>

                <option value="Lost">
                  Lost
                </option>

              </select>

            </div>


            <button
              type="submit"
              className="save-deal-btn"
            >
              Save Deal
            </button>

          </form>

        </div>
      )}


      {/* =========================
          DEAL CARDS
      ========================= */}

      <div className="deal-cards">

        <div className="deal-card">
          <p>Total Deals</p>
          <h2>{totalDeals}</h2>
        </div>

        <div className="deal-card">
          <p>Open Deals</p>
          <h2>{openDeals}</h2>
        </div>

        <div className="deal-card">
          <p>Won Deals</p>
          <h2>{wonDeals}</h2>
        </div>

        <div className="deal-card">
          <p>Lost Deals</p>
          <h2>{lostDeals}</h2>
        </div>

      </div>


      {/* =========================
          DEAL TABLE
      ========================= */}

      <div className="deal-table">

        <h2>Recent Deals</h2>

        {loading ? (
          <p>Loading deals...</p>
        ) : deals.length === 0 ? (

          <p>
            No deals found. Add your first deal.
          </p>

        ) : (

          <table>

            <thead>

              <tr>
                <th>Deal Name</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {deals.map((deal) => (

                <tr key={deal._id}>

                  <td>
                    {deal.name}
                  </td>

                  <td>
                    {deal.customer}
                  </td>

                  <td>
                    ₹{Number(deal.amount).toLocaleString("en-IN")}
                  </td>

                  <td>

                    <span
                      className={`deal-status ${deal.status
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {deal.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="delete-deal-btn"
                      onClick={() =>
                        handleDelete(deal._id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default Deals;