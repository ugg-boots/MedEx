import { Bar } from "react-chartjs-2";
import React from "react";

export const LowStockBarChart = ({ chartData }) => {

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Target Stock vs. Current Inventory'
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              ticks: {
                beginAtZero: true
              }
            }
          }
        }}
        />
    </div>
  )
}