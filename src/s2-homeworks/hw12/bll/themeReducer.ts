const initState: StateType = {
    themeId: 1,
}

export const themeReducer = (state: StateType = initState, action: ThemeActionType): StateType => { // fix any
    switch (action.type) {
        // дописать
        case "SET_THEME_ID":
            return {...state, themeId: action.id}
        default:
            return state
    }
}

export const changeThemeId = (id: number): { type: 'SET_THEME_ID', id: number } => ({type: 'SET_THEME_ID', id} as const) // fix any

export type ThemeActionType = ReturnType<typeof changeThemeId>
type StateType = { themeId: number }