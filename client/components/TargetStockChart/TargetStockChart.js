import { Bar } from "react-chartjs-2";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { Bloodtype } from "@mui/icons-material";

export const TargetStockChart = () => {

  const [chartData, setChartData] = useState({});

  // grab product data, useMemo will memoize any changes/re-renders
  const products = useSelector(state => state.catalog.allCatalogItems)
  const labels = useMemo(() => products.map(item => item.product_name), [products])

  // grab from inventory the displayedInventory which gives the total number of quantities at the moment
  const inventory = useSelector(state => state.inventory.displayedInventory)

  /* React will load before Redux, so inside useEffect, pass in the memoized value of labels once it's re-rendered. Because it only re-renders when
  anything changes within state.catalog.allCatalogItems, in our case it will only render 1 time after information has been loaded, this will stop the
  useEffect infinite loop */

  useEffect(() => {
    console.log('this is the labels inside useEffect: ', labels)
    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Current Inventory',
          data: inventory.map(item => item.quantity),
          backgroundColor: '#36008D',
        },
        {
          label: 'Target Max Stock',
          data: products.map(item => item.max_stock),
          backgroundColor: '#00C9B8',
        },
      ],
      plugins: {
        title: {
          display: true,
          text: 'Target Stock vs. Current Inventory',
        },
      },
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Items'
          },
          stacked: true,
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Quantity',
            weight: 'bold',
          },
          ticks: {
            beginAtZero: true
          }
        }
      }
    })
  }, [labels, inventory])


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