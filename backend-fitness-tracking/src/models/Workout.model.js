import { promisePool } from "../config/database.js";

export const Workout = {
  // Create a new workout with exercises (transaction)
  create: async (userId, { date, exercises, notes }) => {
    const connection = await promisePool.getConnection();
    try {
      await connection.beginTransaction();

      const [workoutResult] = await connection.execute(
        "INSERT INTO workouts (user_id, workout_date, notes) VALUES (?, ?, ?)",
        [userId, date || new Date(), notes || null],
      );
      const workoutId = workoutResult.insertId;

      for (const ex of exercises) {
        await connection.execute(
          `INSERT INTO exercises (workout_id, name, sets, reps, weight, duration_seconds)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            workoutId,
            ex.name,
            ex.sets,
            ex.reps,
            ex.weight,
            ex.duration || null,
          ],
        );
      }

      await connection.commit();
      return { id: workoutId };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  // Get all workouts for a user, optionally filtered by date range
  findByUserId: async (userId, { startDate, endDate } = {}) => {
    let query = `
      SELECT w.id, w.workout_date as date, w.notes, w.created_at,
             JSON_ARRAYAGG(
               JSON_OBJECT(
                 'name', e.name,
                 'sets', e.sets,
                 'reps', e.reps,
                 'weight', e.weight,
                 'duration', e.duration_seconds
               )
             ) as exercises
      FROM workouts w
      LEFT JOIN exercises e ON w.id = e.workout_id
      WHERE w.user_id = ?
    `;
    const params = [userId];

    if (startDate) {
      query += " AND w.workout_date >= ?";
      params.push(startDate);
    }
    if (endDate) {
      query += " AND w.workout_date <= ?";
      params.push(endDate);
    }

    query += " GROUP BY w.id ORDER BY w.workout_date DESC";

    const [rows] = await promisePool.execute(query, params);

    return rows.map((row) => {
      let exercises = row.exercises;
      if (exercises) {
        exercises =
          typeof exercises === "string" ? JSON.parse(exercises) : exercises;
        exercises = exercises.filter((e) => e.name !== null);
      } else {
        exercises = [];
      }
      return { ...row, exercises };
    });
  },

  // Get a single workout by ID (must belong to user)
  findById: async (id, userId) => {
    const [rows] = await promisePool.execute(
      `SELECT w.id, w.workout_date as date, w.notes,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  'id', e.id,
                  'name', e.name,
                  'sets', e.sets,
                  'reps', e.reps,
                  'weight', e.weight,
                  'duration', e.duration_seconds
                )
              ) as exercises
       FROM workouts w
       LEFT JOIN exercises e ON w.id = e.workout_id
       WHERE w.id = ? AND w.user_id = ?
       GROUP BY w.id`,
      [id, userId],
    );
    if (rows.length === 0) return null;

    let exercises = rows[0].exercises;
    if (exercises) {
      exercises =
        typeof exercises === "string" ? JSON.parse(exercises) : exercises;
      exercises = exercises.filter((e) => e.name !== null);
    } else {
      exercises = [];
    }
    return { ...rows[0], exercises };
  },

  // Update a workout (replace all exercises)
  update: async (id, userId, { date, exercises, notes }) => {
    const connection = await promisePool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.execute(
        "UPDATE workouts SET workout_date = ?, notes = ? WHERE id = ? AND user_id = ?",
        [date || new Date(), notes || null, id, userId],
      );

      await connection.execute("DELETE FROM exercises WHERE workout_id = ?", [
        id,
      ]);

      for (const ex of exercises) {
        await connection.execute(
          `INSERT INTO exercises (workout_id, name, sets, reps, weight, duration_seconds)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [id, ex.name, ex.sets, ex.reps, ex.weight, ex.duration || null],
        );
      }

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  // Delete a workout (exercises cascade)
  delete: async (id, userId) => {
    const [result] = await promisePool.execute(
      "DELETE FROM workouts WHERE id = ? AND user_id = ?",
      [id, userId],
    );
    return result.affectedRows > 0;
  },

  // Progress: total volume (sets*reps*weight) per day
  getVolumeOverTime: async (userId, days = 30) => {
    const [rows] = await promisePool.execute(
      `SELECT w.workout_date as date, SUM(e.sets * e.reps * e.weight) as volume
       FROM workouts w
       JOIN exercises e ON w.id = e.workout_id
       WHERE w.user_id = ? AND w.workout_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
       GROUP BY w.workout_date
       ORDER BY w.workout_date ASC`,
      [userId, days],
    );
    return rows;
  },

  // Progress: max weight for a specific exercise over time
  getExerciseProgress: async (userId, exerciseName) => {
    const [rows] = await promisePool.execute(
      `SELECT w.workout_date as date, MAX(e.weight) as maxWeight,
              MAX(e.sets) as sets, MAX(e.reps) as reps
       FROM workouts w
       JOIN exercises e ON w.id = e.workout_id
       WHERE w.user_id = ? AND LOWER(e.name) = LOWER(?)
       GROUP BY w.workout_date
       ORDER BY w.workout_date ASC`,
      [userId, exerciseName],
    );
    return rows;
  },
};
