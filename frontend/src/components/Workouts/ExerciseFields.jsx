import { X } from "lucide-react";

const ExerciseFields = ({ exercises, onUpdate, onRemove }) => {
  return (
    <div className="space-y-3">
      {exercises.map((ex, idx) => (
        <div
          key={idx}
          className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 relative"
        >
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-gray-500">Exercise</label>
              <input
                type="text"
                value={ex.name}
                onChange={(e) => onUpdate(idx, "name", e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-1.5"
                placeholder="Bench Press"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Sets</label>
              <input
                type="number"
                value={ex.sets}
                onChange={(e) => onUpdate(idx, "sets", e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-1.5"
                placeholder="3"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Reps</label>
              <input
                type="number"
                value={ex.reps}
                onChange={(e) => onUpdate(idx, "reps", e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-1.5"
                placeholder="10"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Weight (kg)</label>
              <input
                type="number"
                step="0.5"
                value={ex.weight}
                onChange={(e) => onUpdate(idx, "weight", e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-1.5"
                placeholder="70.5"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseFields;
