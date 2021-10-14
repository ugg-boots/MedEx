import { Bar } from "react-chartjs-2";

export const LowStockBarChart = ({ chartData }) => {

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Low Stock vs. Current Inventory'
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          }
        }}
        />
    </div>
  )
}