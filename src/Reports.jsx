import React, { useEffect, useState } from "react";
import "./Reports.css";

function Reports() {
  const [reports, setReports] = useState({
    totalCustomers: 0,
    totalLeads: 0,
    totalDeals: 0,
    wonDeals: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/reports"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();

      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="reports-page">
        <h1>Reports</h1>
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="reports-page">

      <h1>Reports</h1>

      <p>View and analyze your CRM reports.</p>

      <div className="report-cards">

        <div className="report-card">
          <h3>Total Customers</h3>
          <h2>{reports.totalCustomers}</h2>
          <p>Customers in CRM</p>
        </div>

        <div className="report-card">
          <h3>Total Leads</h3>
          <h2>{reports.totalLeads}</h2>
          <p>Leads in CRM</p>
        </div>

        <div className="report-card">
          <h3>Total Deals</h3>
          <h2>{reports.totalDeals}</h2>
          <p>All pipeline deals</p>
        </div>

        <div className="report-card">
          <h3>Total Revenue</h3>

          <h2>
            ₹{Number(reports.totalRevenue).toLocaleString("en-IN")}
          </h2>

          <p>Revenue from Won deals</p>
        </div>

      </div>

      <div className="report-table">

        <h2>Sales Report</h2>

        <table>

          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Total Customers</td>
              <td>{reports.totalCustomers}</td>
            </tr>

            <tr>
              <td>Total Leads</td>
              <td>{reports.totalLeads}</td>
            </tr>

            <tr>
              <td>Total Deals</td>
              <td>{reports.totalDeals}</td>
            </tr>

            <tr>
              <td>Won Deals</td>
              <td>{reports.wonDeals}</td>
            </tr>

            <tr>
              <td>Total Revenue</td>
              <td>
                ₹{Number(reports.totalRevenue).toLocaleString("en-IN")}
              </td>
            </tr>

          </tbody>

        </table>

      </div>

      <button
        className="refresh-report-btn"
        onClick={fetchReports}
      >
        Refresh Reports
      </button>

    </div>
  );
}

export default Reports;