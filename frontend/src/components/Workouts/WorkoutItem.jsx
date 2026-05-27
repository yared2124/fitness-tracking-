import { Link } from "react-router-dom";
import { formatDate, calculateVolume } from "../../utils/helpers";
import { Edit, Trash2, Calendar, Activity } from "lucide-react";

const WorkoutItem = ({ workout, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-5 card-hover">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(workout.date)}
          </div>
          <div className="space-y-2">
            {workout.exercises.map((e, idx) => (
              <div key={idx} className="flex items-baseline gap-3 text-sm">
                <span className="font-medium w-28">{e.name}</span>
                <span className="text-gray-600">
                  {e.sets} × {e.reps}
                </span>
                <span className="text-gray-600">{e.weight} kg</span>
              </div>
            ))}
          </div>
          {workout.notes && (
            <p className="text-xs text-gray-400 mt-2">{workout.notes}</p>
          )}
          <div className="flex items-center text-xs text-gray-400 mt-3">
            <Activity className="w-3 h-3 mr-1" />
            Total volume: {calculateVolume(workout.exercises)} kg
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/workouts/edit/${workout.id}`}
            className="text-indigo-500 hover:text-indigo-700"
          >
            <Edit className="w-5 h-5" />
          </Link>
          <button
            onClick={() => onDelete(workout.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutItem;
