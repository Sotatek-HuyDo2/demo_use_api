import React from 'react'
import { Alert } from 'react-bootstrap'

const NotFound = () => {
  return (
    <Alert variant="danger" className='mt-3'>
      <Alert.Heading>Lại Nghịch gì nữa zậy</Alert.Heading>
      <p>
        Nhập Linh Tinh Ít Thôi
      </p>
    </Alert>
  )
}

export default NotFound
