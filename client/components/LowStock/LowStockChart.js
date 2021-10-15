import { Bar } from "react-chartjs-2";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";


export const LowStockBarChart = () => {
  
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartData, setChartData] = useState({});

  const catalog = useSelector(state => state.catalog.allCatalogItems);
  const inventory = useSelector(state => state.inventory.displayedInventory)
  const labels = catalog.map(item => item.product_name);
  console.log('this is the labels outisde useEffect: ', labels)

  const chartConfig = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Current Inventory',
          data: [1, 2, 3, 4],
          backgroundColor: '#37b4d4',
        },
        {
          label: 'Target Max Stock',
          data: [5, 8, 10, 13],
          backgroundColor: '#d1349d',
        },
      ]
    },

  }


  useEffect(() => {
    console.log('this is the labels inside useEffect: ', labels)
    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Current Inventory',
          data: [1, 2, 3, 4],
          backgroundColor: '#37b4d4',
        },
        {
          label: 'Target Max Stock',
          data: [5, 8, 10, 13],
          backgroundColor: '#d1349d',
        },
      ],
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
    })
  }, [])


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