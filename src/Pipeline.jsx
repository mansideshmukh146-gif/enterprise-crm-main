import React, { useEffect, useState } from "react";
import "./Pipeline.css";

function Pipeline() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    amount: "",
    stage: "New",
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
            ...formData,
            amount: Number(formData.amount),
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
        title: "",
        company: "",
        amount: "",
        stage: "New",
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

      if (!response.ok) {
        throw new Error(
          `Delete failed: ${response.status} ${text}`
        );
      }

      const data = JSON.parse(text);

      alert(
        data.message || "Deal deleted successfully!"
      );

      fetchDeals();
    } catch (error) {
      console.error("Error deleting deal:", error);
      alert(error.message);
    }
  };

  // =========================
  // PIPELINE STAGES
  // =========================
  const stages = [
    "New",
    "In Progress",
    "Negotiation",
    "Won",
  ];

  return (
    <div className="pipeline-page">

      {/* HEADER */}
      <div className="pipeline-header">
        <div>
          <h1>Sales Pipeline</h1>
          <p>
            Manage your sales opportunities and deals.
          </p>
        </div>

        <button
          className="add-deal-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add Deal"}
        </button>
      </div>

      {/* ADD DEAL FORM */}
      {showForm && (
        <div className="deal-form">

          <h2>Add New Deal</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Deal Title</label>

              <input
                type="text"
                name="title"
                placeholder="Enter deal title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company</label>

              <input
                type="text"
                name="company"
                placeholder="Enter company name"
                value={formData.company}
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
                name="stage"
                value={formData.stage}
                onChange={handleChange}
              >
                <option value="New">New</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Negotiation">
                  Negotiation
                </option>
                <option value="Won">Won</option>
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

      {/* PIPELINE */}
      <div className="pipeline">

        {stages.map((stage) => (
          <div className="stage" key={stage}>

            <h3>{stage}</h3>

            {loading ? (
              <p>Loading...</p>
            ) : (
              deals
                .filter((deal) => deal.stage === stage)
                .map((deal) => (
                  <div
                    className="deal-card"
                    key={deal._id}
                  >
                    <h4>{deal.title}</h4>

                    <p>{deal.company}</p>

                    <strong>
                      ₹{Number(deal.amount).toLocaleString("en-IN")}
                    </strong>

                    <br />

                    <button
                      className="delete-deal-btn"
                      onClick={() =>
                        handleDelete(deal._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default Pipeline;