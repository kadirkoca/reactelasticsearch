import React, { useState, createRef } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Button, Form } from "react-bootstrap"
import validator from "validator"
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import Toast from "../elements/Toast"
import moment from "moment"
import { connect } from "react-redux"
import { PassUserAction } from "../actions/data-actions"
import DataService from "../services/data-service"

const NewUser = (props: any) => {
    const bd = props.user ? moment(props.user?.birthday, "DD.MM.YYYY").format("DD.MM.YYYY") : ""
    
    const [userstatus, setUserStatus] = useState<any>({
        pickerbirthday: bd,
        isnew: props.user === null
    })
    const inputProps = {
        name: 'birthday',
        placeholder: 'Please pick birthday',
        value: userstatus.pickerbirthday,
    }
    let phoneFormatLength = 16

    console.log(userstatus.isnew)
    const onSubmit = (e: any) => {
        e.preventDefault()
        const name = e.target.elements.name.value
        const surname = e.target.elements.surname.value
        const birthday = e.target.elements.birthday.value
        const phone = e.target.elements.phone.value
        const email = e.target.elements.email.value

        const datevalidator = validator.isDate(birthday, { format: "DD.MM.YYYY", delimiters: ["."] })
        const phonevalidator = phone.length === phoneFormatLength ? true : false
        const emailvalidator = validator.isEmail(email)

        if (!datevalidator) {
            Toast("error", "Birthday date is not valid, please type again")
            e.target.elements.birthday.value = ""
            return
        }
        if (!phonevalidator) {
            Toast("error", "Phone number is not valid, please type again")
            e.target.elements.phone.value = ""
            return
        }
        if (!emailvalidator) {
            Toast("error", "Email address is not valid, please type again")
            e.target.elements.email.value = ""
            return
        }
        const user: {[k: string]: any} = {}
        user.id = props.user?.id
        user.method = userstatus.isnew ? "new" : "update"
        user.name = name
        user.surname = surname
        user.birthday = birthday
        user.phone = phone
        user.email = email

        DataService.UserManagement(user)
            .then((context) => {
                props.PassUserAction(null)
                setUserStatus({
                    pickerbirthday: "",
                    isnew:true
                })
                e.target.reset()
                Toast("success", "Record has been saved successfuly")
            })
            .catch((e) => {
                const error = e.error
                Toast("error", error)
            })
    }

    const validatePhone = (phone: any, data: any) => {
        phoneFormatLength = data["format"].length
    }
    
    return (
        <div className='container my-5 py-5'>
            <div className='row d-flex justify-content-center'>
                <Card className='col-md-4 p-0'>
                    <Card.Header>{userstatus.isnew ? <span>User Registry Form</span> : <span>User Edit Form</span>}</Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit} autoComplete='off'>
                            <Form.Group className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Who are you ?'
                                    name='name'
                                    required
                                    defaultValue={props.user?.name || ""}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Who is your ancestors ?'
                                    name='surname'
                                    required
                                    defaultValue={props.user?.surname || ""}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Birthday</Form.Label>
                                <Datetime
                                    onChange={(e: any) => setUserStatus({pickerbirthday: moment(e).format("DD.MM.YYYY"), isnew: userstatus.isnew})}
                                    dateFormat='DD.MM.YYYY'
                                    timeFormat={false}
                                    inputProps={ inputProps }
                                    renderInput={(props) => {
                                        return <input {...props} name='birthday' placeholder='Please pick birthday' required />
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Phone</Form.Label>
                                <PhoneInput
                                    country={"us"}
                                    onFocus={validatePhone}
                                    value={props.user?.phone || ""}
                                    inputProps={{
                                        name: "phone",
                                        required: true,
                                        autoFocus: true,
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    required
                                    defaultValue={props.user?.email || ""}
                                />
                            </Form.Group>
                            <Button type='submit' variant='outline-success' className='w-100'>
                                Save
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewUser)
