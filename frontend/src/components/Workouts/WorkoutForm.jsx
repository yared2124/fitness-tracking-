import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import ExerciseFields from "./ExerciseFields";
import { Save, ArrowLeft } from "lucide-react";

const WorkoutForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "", weight: "" },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchWorkout = async () => {
        const res = await api.get(`/workouts/${id}`);
        const w = res.data;
        setDate(w.date.slice(0, 10));
        setNotes(w.notes || "");
        setExercises(
          w.exercises.map((e) => ({
            name: e.name,
            sets: e.sets,
            reps: e.reps,
            weight: e.weight,
          })),
        );
      };
      fetchWorkout();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = exercises.filter(
      (ex) => ex.name && ex.sets && ex.reps && ex.weight,
    );
    if (!valid.length) return alert("Add at least one complete exercise");
    setLoading(true);
    try {
      const payload = { date, notes, exercises: valid };
      if (id) await api.put(`/workouts/${id}`, payload);
      else await api.post("/workouts", payload);
      navigate("/workouts");
    } catch (err) {
      alert("Failed to save workout");
    } finally {
      setLoading(false);
    }
  };

  const addExercise = () =>
    setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
  const updateExercise = (idx, field, value) => {
    const updated = [...exercises];
    updated[idx][field] = value;
    setExercises(updated);
  };
  const removeExercise = (idx) =>
    setExercises(exercises.filter((_, i) => i !== idx));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate("/workouts")}
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">
          {id ? "Edit Workout" : "Log New Workout"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-soft p-6 space-y-6"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="2"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Exercises
          </label>
          <ExerciseFields
            exercises={exercises}
            onUpdate={updateExercise}
            onRemove={removeExercise}
          />
          <button
            type="button"
            onClick={addExercise}
            className="mt-3 text-indigo-600 text-sm font-medium"
          >
            + Add exercise
          </button>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/workouts")}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />{" "}
            {loading ? "Saving..." : "Save Workout"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
