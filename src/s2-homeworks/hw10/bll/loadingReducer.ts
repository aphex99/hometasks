const initState = {
    isLoading: false,
}

export const loadingReducer = (state = initState, action: LoadingActionType): { isLoading: boolean } => { // fix any
    switch (action.type) {
        // пишет студент  // need to fix
        case "CHANGE_LOADING":
            return {isLoading: action.isLoading}
        default:
            return state
    }
}

// action
export const loadingAC = (isLoading: boolean) => ({
    type: 'CHANGE_LOADING',
    isLoading,
} as const)

// types
type LoadingActionType = ReturnType<typeof loadingAC>