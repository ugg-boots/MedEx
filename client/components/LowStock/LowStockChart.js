import { Bar } from "react-chartjs-2";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const LowStockBarChart = () => {

  const [chartData, setChartData] = useState({});

  // grab product data, useMemo will memoize any changes/re-renders
  const products = useSelector(state => state.catalog.allCatalogItems)
  const labels = useMemo(() => products.map(item => item.product_name), [products])

  const inventory = useSelector(state => state.inventory.displayedInventory)
  console.log('this is the labels from useMemo ', labels)

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
  }, [labels])


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