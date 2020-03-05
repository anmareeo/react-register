import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import {uriBase, api} from '../const'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),

        },
        "background-color": "grey"
    },
}));

export default function SignUp(props) {

    const classes = useStyles();

    let [message, setMessage] = React.useState(props.initialMessage)
    let [fName, setfName] = React.useState("")
    let [lName, setlName] = React.useState("")
    let [userName, setUserName] = React.useState("")
    let [password, setPassword] = React.useState("")

    const onClickHandler = (event) => {
        
        event.preventDefault()

        let formData = new FormData()
        formData.append("fName", fName)
        formData.append("lName", lName)
        formData.append("userName",userName)
        formData.append("password", password)
        console.log(...formData.entries())
        fetch(`${uriBase}${api}/users/signup`,{
            method: "POST",
            body: formData
        })
        .then(HttpRequest => {
            if (!HttpRequest.ok) {
                throw new Error("Couldn't Add User")
            }
            return HttpRequest.json()
        })
        .then(user => {
            // ToDo Handle User
            setMessage("Welcome")
        })
        .catch(error => {
            console.log(error)
        })
    }

    const onChangeHandler = (event) => {

        switch (event.target.name) {
            case 'fName':
                setfName(event.target.value)
                break

            case 'lName':
                setlName(event.target.value)
                break

            case 'userName':
                setUserName(event.target.value)
                break

            case 'password':
                setPassword(event.target.value)
                break

            default:

        }
    }

    return (

        <div className={classes.root}>

            <h1>{message}</h1>
            <form>
                <div>
                    First Name <input onChange={onChangeHandler} name="fName" value={fName}></input><br></br>
                    Last Name <input onChange={onChangeHandler} name="lName" value={lName}></input><br></br>
                    Username <input onChange={onChangeHandler} name="userName" value={userName}></input><br></br>
                    Password <input onChange={onChangeHandler} name="password" value={password}></input><br></br>
                </div>
                <br></br>
                <div>
                    <input type="submit" onClick={onClickHandler}></input>
                </div>
            </form>
                        <div>
            <br></br>
                <Link to="/">Login</Link>
                <br></br>
            </div>

        </div>
    )
}