import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

const initialState = {
	note: [],
	isError: false,
	isLoading: false,
	message: '',
};

// Get ticket notes
export const getNotes = createAsyncThunk(
	'notes/getAll',
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await noteService.getNotes(ticketId, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);
// Create ticket note
export const CreateNote = createAsyncThunk(
	'notes/create',
	async ({noteText,ticketId}, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await noteService.createNote(noteText,ticketId, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getNotes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.notes = action.payload;
			})
			.addCase(getNotes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(CreateNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(CreateNote.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.notes.push(action.payload);
			})
			.addCase(CreateNote.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
	},
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
