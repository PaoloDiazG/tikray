import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: "Usuario Ejemplo",
    email: "usuario@ejemplo.com",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;