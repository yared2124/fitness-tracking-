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

const ExerciseProgressChart = ({ exerciseName }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get(
          `/progress/exercise-progress?exerciseName=${encodeURIComponent(exerciseName)}`,
        );
        const data = res.data;
        const labels = data.map((d) => new Date(d.date).toLocaleDateString());
        const maxWeights = data.map((d) => parseFloat(d.maxWeight));
        const oneRMs = data.map((d) => d.estimated1RM);
        setChartData({
          labels,
          datasets: [
            {
              label: "Max Weight (kg)",
              data: maxWeights,
              borderColor: "#4f46e5",
              backgroundColor: "rgba(79,70,229,0.05)",
              tension: 0.3,
              fill: true,
            },
            {
              label: "Estimated 1RM",
              data: oneRMs,
              borderColor: "#ef4444",
              backgroundColor: "rgba(239,68,68,0.05)",
              tension: 0.3,
              fill: true,
              borderDash: [5, 5],
            },
          ],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [exerciseName]);

  if (loading)
    return <div className="h-64 animate-pulse bg-gray-100 rounded"></div>;
  if (!chartData.labels.length)
    return (
      <div className="text-center py-12 text-gray-400">
        No data for this exercise yet.
      </div>
    );

  return (
    <Line
      data={chartData}
      options={{ responsive: true, maintainAspectRatio: true }}
    />
  );
};

export default ExerciseProgressChart;
