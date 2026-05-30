import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import { User, Mail, Settings, CheckCircle } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const [unit, setUnit] = useState("kg");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.preferences_unit) setUnit(user.preferences_unit);
  }, [user]);

  const handleSave = async () => {
    try {
      await api.put("/users/preferences", { unit });
      setMessage("Preferences updated");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-full">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium">{user?.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Mail className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Preferences</h2>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Weight unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 w-48"
            >
              <option value="kg">Kilograms (kg)</option>
              <option value="lbs">Pounds (lbs)</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            Save changes
          </button>
          {message && (
            <div className="mt-4 text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> {message}
            </div>
          )}
        </div>
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <button onClick={logout} className="text-red-500 hover:text-red-700">
            Sign out of account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
