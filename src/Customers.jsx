import "./Customers.css";
import { useEffect, useState } from "react";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Get customers from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  // Save customer to backend
  const handleSaveCustomer = async () => {
    if (!formData.name || !formData.email) {
      alert("Please enter name and email");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error adding customer");
        return;
      }

      alert("Customer added successfully!");

      // Add new customer to list
      setCustomers([...customers, data]);

      // Clear form
      setFormData({
        name: "",
        email: "",
      });

      // Close form
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please check backend.");
    }
  };

  return (
    <div className="customers-page">

      {/* HEADER */}
      <div className="customers-header">
        <div>
          <h1>Customers</h1>
          <p>Manage your customers and business accounts</p>
        </div>

        <button
          className="add-customer"
          onClick={() => setShowForm(true)}
        >
          + Add Customer
        </button>
      </div>

      {/* ADD CUSTOMER FORM */}
      {showForm && (
        <div className="customer-form">
          <h2>Add Customer</h2>

          <input
            type="text"
            placeholder="Customer Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <button
            className="save-customer"
            onClick={handleSaveCustomer}
          >
            Save Customer
          </button>

          <button
            className="cancel-customer"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div className="customer-cards">

        <div className="customer-card">
          <p>Total Customers</p>
          <h2>{customers.length}</h2>
        </div>

        <div className="customer-card">
          <p>Active Customers</p>
          <h2>{customers.length}</h2>
        </div>

        <div className="customer-card">
          <p>New Customers</p>
          <h2>{customers.length}</h2>
        </div>

        <div className="customer-card">
          <p>Total Accounts</p>
          <h2>{customers.length}</h2>
        </div>

      </div>

      {/* SEARCH */}
      <div className="customer-search">
        <input
          type="text"
          placeholder="Search customers..."
        />

        <select>
          <option>All Customers</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* CUSTOMER TABLE */}
      <div className="customer-table">

        <h2>Customer List</h2>

        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>

                <td>{customer.name}</td>

                <td>{customer.email}</td>

                <td>
                  {customer.createdAt
                    ? new Date(
                        customer.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  <span className="customer-active">
                    Active
                  </span>
                </td>

                <td>
                  <button className="customer-view">
                    View
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Customers;
