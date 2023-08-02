import * as React from 'react';
import axios from 'axios'


export const Register = () => {

    const [values, setValues] = React.useState({
        name: '',
        password: ''
    })

    const handleValueChange = (e) => {
        const { name, value } = e.target

        setValues(prev => ({
            ...prev,
            [name]: value
        }))

    }

    const registerUser = async () => {

        try {

            const res = await axios.post('http://localhost:1556/signup', values)
            console.log(res.data)
            // alert(res.data)

        } catch (error) {
            console.log(error)
        }

    }

    axios.defaults.withCredentials = true

    const handleFormSubmit = (e) => {
        e.preventDefault()

        console.log(values)

        // axios.post("http://localhost:1556/signup", values).then((res) => {
        //     console.log(res.data);
        // }).catch((error) => {
        //     console.log(error);
        // });

        registerUser()


    }




    
    return (
        <div className="register">
            <h1>register here babyboyyyy</h1>

            <div className="form-wrapper">
                <form action="" onSubmit={handleFormSubmit} >
                    <input type="text" name='name' value={values.name} placeholder='username' onChange={e => handleValueChange(e)} /> <br />
                    <input type="password" name='password' value={values.password} placeholder='password' onChange={e => handleValueChange(e)} /> <br />
                    {/* <button>register</button> */}
                    <button type="submit" onClick={handleFormSubmit} >register</button>
                </form>
            </div>

        </div>
    )
}