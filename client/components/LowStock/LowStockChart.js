import { Bar } from "react-chartjs-2";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const LowStockBarChart = () => {
  
  // const labels = useSelector(state => state.catalog.allCatalogItems);
  

  // const selectLabels = createSelector((state) => state.catalog.allCatalogItems, (catalogItems) => catalogItems.map(items => items.product_name));
  // const labels = useSelector(selectLabels)

  const [chartData, setChartData] = useState({});
  const products = useSelector(state => state.catalog.allCatalogItems)
  const labels = useMemo(() => products.map(item => item.product_name), [products])
  const inventory = useSelector(state => state.inventory.displayedInventory)
  // const labels = catalog.map(item => item.product_name); //useMemo / useSelector
  console.log('this is the labels from useMemo ', labels)


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