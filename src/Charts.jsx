import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Charts() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    // Existing chart destroy
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",

      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
        ],

        datasets: [
          {
            label: "Opportunities",

            data: [
              120,
              180,
              150,
              220,
              190,
              260,
            ],

            // Orange line
            borderColor: "#ff7200",

            // Light orange background
            backgroundColor: "rgba(255, 114, 0, 0.15)",

            // Orange points
            pointBackgroundColor: "#ff7200",
            pointBorderColor: "#ff7200",

            borderWidth: 4,

            tension: 0.4,

            fill: true,

            pointRadius: 5,

            pointHoverRadius: 7,

            pointHoverBackgroundColor: "#ff7200",
            pointHoverBorderColor: "#ffffff",
          },
        ],
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: true,

            labels: {
              font: {
                size: 13,
              },
            },
          },

          tooltip: {
            enabled: true,
          },
        },

        scales: {
          x: {
            grid: {
              display: false,
            },

            ticks: {
              color: "#555555",
            },
          },

          y: {
            beginAtZero: true,

            grid: {
              color: "#eeeeee",
            },

            ticks: {
              color: "#555555",
            },
          },
        },
      },
    });

    // Destroy chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      className="chart-container"
      style={{
        position: "relative",
        width: "100%",
        height: "240px",
      }}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Charts;