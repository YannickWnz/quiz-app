import * as React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Login = () => {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = React.useState({
        username: '',
        password: ''
    })

    const handleDetails = (e) => {
        const { name, value } = e.target

        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }))


    }

    axios.defaults.withCredentials = true


    const checkUserLogIn = async () => {

        try {
            
            const res = await axios.post('http://localhost:1556/signin', userDetails)
            console.log(res.data)

            navigate('/')

        } catch (error) {
            console.log(error)
        }

    }

    // React.useEffect(() => {
    //     checkUserLogIn()
    // }, [])

    const handleLogin = (e) => {
        e.preventDefault()

        console.log(userDetails)

        checkUserLogIn()
    }

    return (
        <div className="login">
            <h1>login right here babyboyyyy</h1>
            <form action="" onSubmit={handleLogin}>
                <input type="text" placeholder='username' value={userDetails.username} name='username' onChange={(e) => handleDetails(e)} /><br />
                <input type="password" placeholder='password' name='password' value={userDetails.password} onChange={(e) => handleDetails(e)} /><br />
                <button type="submit" onClick={handleLogin}>login</button>
            </form>
        </div>
    )
}