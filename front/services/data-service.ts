import axios from "axios"
import { GetUsers, PostUser } from "./urlSet"
import axiosClient from "./axiosClient"

class DataService {
    GetAllUsers() {
        return new Promise((res, rej) => {
            axiosClient.get(GetUsers)
                .then((response) => {
                    if (response.data.error) {
                        rej({ error: response.data.error })
                    }
                    res(response.data)
                })
                .catch((e) => {
                    rej({ error: e })
                })
        })
    }

    UserManagement(user: any) {
        return new Promise((res, rej) => {
            axios
                .post(PostUser, user)
                .then((response) => {
                    if (response.data.error) {
                        rej({ error: response.data.error })
                    }
                    res(response.data)
                })
                .catch((e) => {
                    rej({ error: e })
                })
        })
    }
}

export default new DataService()
