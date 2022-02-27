import { PASS_USER } from "../actions/action-types"

const initialState = {
    user:null,
}

export default (state = initialState, action: any) => {
    const { type, content } = action

    switch (type) {
        case PASS_USER:
            return {
                ...state,
                user: content,
            }
        default:
            return state
    }
}
