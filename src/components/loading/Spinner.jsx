import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Spinner = ({size}) => {
  return (
    <TailSpin visible={true}
              height={size}
              width={size}
              color="#7b8b8b"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""/>
  )
}

export default Spinner
