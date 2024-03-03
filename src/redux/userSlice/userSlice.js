import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        addUser: ((state, action) => {
            const { id, email } = action.payload;
            const existingUserById = state.find(user => user.id === id);
            const existingUserByEmail = state.find(user => user.email === email);

            if (!existingUserById && !existingUserByEmail) {
                state.push(action.payload);
            }
        }),

        deleteUser: ((state, action) => {
            return state.filter(user => user.id !== action.payload)
        }),

        updateUser: ((state, action) => {
            const { id, firstname, lastname, image, email } = action.payload
            const index = state.findIndex(user => user.id === id);

            if (index !== -1) {
                state[index] = {
                    ...state[index],
                    firstname: firstname,
                    lastname: lastname,
                    image: image,
                    email: email
                };
            }

        })
    }
})

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer