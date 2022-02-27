import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DataService from "../services/data-service"
import Toast from "../elements/Toast"

import { MDBDataTable } from "mdbreact"
import { Button } from "react-bootstrap"
import { connect } from "react-redux"
import { PassUserAction } from "../actions/data-actions"

const tabledatastructure = {
    columns: [
        {
            label: "Name",
            field: "name",
            sort: "asc",
        },
        {
            label: "Surname",
            field: "surname",
            sort: "asc",
        },
        {
            label: "Phone",
            field: "phone",
        },
        {
            label: "Email",
            field: "email",
            sort: "asc",
        },
        {
            label: "Birthday",
            field: "birthday",
            sort: "asc",
        },
        {
            label: "Created",
            field: "created_at",
            sort: "asc",
        },
        {
            label: "Updated",
            field: "updated_at",
            sort: "asc",
        },
        {
            label: "Actions",
            field: "action",
            width: 50,
        },
    ],

    rows: [],
}

const UsersTable = (props: any) => {
    const [users, setUsers] = useState<any>({})
    const navigate = useNavigate()

    useEffect(() => {
        DataService.GetAllUsers()
            .then((rawusers: any) => {
                const allusers = rawusers.map((user: any, index: any) => {
                    const dataset = user._source
                    dataset.id = user._id
                    return dataset
                })
                tabledatastructure.rows = allusers
                setUsers(tabledatastructure)
            })
            .catch((ex: any) => {
                Toast("error", ex.error.toString())
            })
    }, [users])

    if (users.rows?.length > 0) {
        users.rows.map((user: any, index: any) => {
            user.action = (
                <div>
                    <Button variant='success' onClick={() => updateUser(user.id)}>
                        Update
                    </Button>
                    <span> | </span>
                    <Button variant='danger' onClick={() => deleteUser(user.id)}>
                        Delete
                    </Button>
                </div>
            )
        })

        const deleteUser = (id: string) => {
            //const {action, ...user} = users.rows?.find((u: any) => id === u.id)
            if (confirm("Are you sure you want to delete this user ?")) {
                DataService.UserManagement({ method: "delete", id }).then(()=>{
                    setUsers(null)
                }).catch((ex: any) => {
                    Toast("error", ex.error.toString())
                })
            }
        }
        const updateUser = (id: string) => {
            const { action, ...user } = users.rows?.find((u: any) => id === u.id)
            props.PassUserAction(user)
            navigate("/newuser")
        }
    }

    return (
        <div className='container py-4'>
            {users?.rows?.length > 0 ? (
                <MDBDataTable striped bordered responsive hover entries={10} data={users} />
            ) : (
                <h4>No data has been received yet!</h4>
            )}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { user } = state.data || {}
    return {
        user,
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    PassUserAction: (user: any) => dispatch(PassUserAction(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)

// todo

// 4 docker
// finitto
