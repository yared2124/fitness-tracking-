import { useState, useEffect } from "react";
import api from "../../services/api";
import ExerciseProgressChart from "./ExerciseProgressChart";
import { Search } from "lucide-react";

const ProgressPage = () => {
  const [exerciseNames, setExerciseNames] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const fetchNames = async () => {
      const res = await api.get("/workouts");
      const workouts = res.data;
      const names = new Set();
      workouts.forEach((w) => w.exercises.forEach((e) => names.add(e.name)));
      setExerciseNames(Array.from(names));
    };
    fetchNames();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Progress Tracking</h1>
      <p className="text-gray-500 mb-8">
        Monitor your strength gains over time
      </p>
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select an exercise
          </label>
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Choose exercise --</option>
              {exerciseNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selected && <ExerciseProgressChart exerciseName={selected} />}
        {!selected && (
          <div className="text-center text-gray-400 py-12">
            Select an exercise to see your progress chart
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
