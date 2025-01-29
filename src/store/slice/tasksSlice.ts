// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios"; // Assuming you're using Axios for HTTP requests

// export interface Task {
//   id: string;
//   title: string;
//   color: string;
//   completed: boolean;
// }

// interface TasksState {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TasksState = {
//   tasks: [],
//   loading: false,
//   error: null,
// };

// // API Base URL
// const API_BASE_URL = "http://localhost:9001/tasks";

// // Thunks for CRUD Operations

// // Fetch all tasks
// export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
//   const response = await axios.get(API_BASE_URL);
//   return response.data as Task[];
// });

// // Create a new task
// export const createTaskAsync = createAsyncThunk(
//   "tasks/createTask",
//   async (task: Omit<Task, "id">) => {
//     const response = await axios.post(API_BASE_URL, task);
//     return response.data as Task;
//   }
// );

// // Update an existing task
// export const updateTaskAsync = createAsyncThunk(
//   "tasks/updateTask",
//   async (task: Task) => {
//     const response = await axios.put(`${API_BASE_URL}/${task.id}`, task);
//     return response.data as Task;
//   }
// );

// // Delete a task
// export const deleteTaskAsync = createAsyncThunk(
//   "tasks/deleteTask",
//   async (taskId: string) => {
//     await axios.delete(`${API_BASE_URL}/${taskId}`);
//     return taskId;
//   }
// );

// // Slice
// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     toggleTaskCompletion: (state, action: PayloadAction<string>) => {
//       const task = state.tasks.find((task) => task.id === action.payload);
//       if (task) {
//         task.completed = !task.completed;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Tasks
//       .addCase(fetchTasks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
//         state.loading = false;
//         state.tasks = action.payload;
//       })
//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch tasks";
//       })

//       // Create Task
//       .addCase(createTaskAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
//         state.loading = false;
//         state.tasks.push(action.payload);
//       })
//       .addCase(createTaskAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to create task";
//       })

//       // Update Task
//       .addCase(updateTaskAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
//         state.loading = false;
//         const index = state.tasks.findIndex((task) => task.id === action.payload.id);
//         if (index !== -1) {
//           state.tasks[index] = action.payload;
//         }
//       })
//       .addCase(updateTaskAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to update task";
//       })

//       // Delete Task
//       .addCase(deleteTaskAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteTaskAsync.fulfilled, (state, action: PayloadAction<string>) => {
//         state.loading = false;
//         state.tasks = state.tasks.filter((task) => task.id !== action.payload);
//       })
//       .addCase(deleteTaskAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to delete task";
//       });
//   },
// });

// export const { toggleTaskCompletion } = tasksSlice.actions;

// export default tasksSlice.reducer;


import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// API Base URL
const API_BASE_URL = "http://localhost:9001/tasks";

// Thunks for CRUD Operations

// Fetch all tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data as Task[];
});

// Create a new task
export const createTaskAsync = createAsyncThunk(
  "tasks/createTask",
  async (task: Omit<Task, "id">) => {
    const response = await axios.post(API_BASE_URL, task);
    return response.data as Task;
  }
);

// Update an existing task
export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async (task: Task) => {
    const response = await axios.put(`${API_BASE_URL}/${task.id}`, task);
    return response.data as Task;
  }
);

// Delete a task
export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string) => {
    await axios.delete(`${API_BASE_URL}/${taskId}`);
    return taskId;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(createTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { toggleTaskCompletion } = tasksSlice.actions;

export default tasksSlice.reducer;
