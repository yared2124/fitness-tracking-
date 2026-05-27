import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const VolumeChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/progress/volume-over-time?days=30");
        const data = res.data;
        const labels = data.map((d) => new Date(d.date).toLocaleDateString());
        const volumes = data.map((d) => parseFloat(d.volume));
        setChartData({
          labels,
          datasets: [
            {
              label: "Total Volume (kg)",
              data: volumes,
              borderColor: "#4f46e5",
              backgroundColor: "rgba(79, 70, 229, 0.1)",
              tension: 0.3,
              fill: true,
              pointBackgroundColor: "#4f46e5",
              pointBorderColor: "#fff",
            },
          ],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="bg-white rounded-xl shadow-soft p-6 animate-pulse h-64"></div>
    );

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 card-hover">
      <h2 className="text-xl font-semibold mb-4">Volume Over Time</h2>
      <Line
        data={chartData}
        options={{ responsive: true, maintainAspectRatio: true }}
      />
    </div>
  );
};

export default VolumeChart;
