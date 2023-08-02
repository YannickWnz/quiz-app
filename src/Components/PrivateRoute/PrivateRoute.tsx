import * as React from 'react'
import axios from 'axios'

export const PrivateRoute = ({children}) => {

    const [auth, setAuth] = React.useState(false)

    axios.defaults.withCredentials = true

    const checkToken = async () => {

        try {

            const res = await axios.get('http://localhost:1556/checkToken')

            if(res.data.Status === 'success') {
                setAuth(true)
                console.log(res.data)
            }

        } catch (error) {
            console.log(error)
        }

    }

    React.useEffect(() => {
        checkToken()
    }, [])

    // React.useEffect(() => {
    //     let isMounted = true;
    //     checkToken().then(() => {
    //         if (isMounted) {
    //             // Only update the state if the component is still mounted
    //             setAuth(true);
    //         }
    //     });

    //     return () => {
    //         isMounted = false;
    //     };
    // }, [])

        return (
            auth ? 
            children 
            : 
            <div className="route">please login</div>
            )
}