export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const calculateVolume = (exercises) => {
  return exercises.reduce((sum, ex) => sum + ex.sets * ex.reps * ex.weight, 0);
};

export const calculate1RM = (weight, reps) => {
  return Math.round(weight * (1 + reps / 30));
};
