import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../Context'
import { Alert } from 'react-bootstrap'

const PrivateRoutes = (props) => {

    const { user } = useContext(UserContext)
    if (user && !user.auth) {
        return <>
            <Alert variant="danger" className='mt-3'>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    You don't have a quyền to go to this page :))
                </p>
            </Alert>
        </>
    } else {
        return (
            <>
                {props.children}
            </>
        )
    }

}

export default PrivateRoutes
