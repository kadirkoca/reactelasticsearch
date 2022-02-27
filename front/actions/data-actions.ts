import { PASS_USER } from "./action-types"

export const PassUserAction = (content: any) => ({
    type: PASS_USER,
    content,
})