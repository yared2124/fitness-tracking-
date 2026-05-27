import { motion } from "framer-motion";
import VolumeChart from "./VolumeChart";
import RecentWorkouts from "./RecentWorkouts";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Your fitness summary</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VolumeChart />
        <RecentWorkouts />
      </div>
    </motion.div>
  );
};

export default Dashboard;
