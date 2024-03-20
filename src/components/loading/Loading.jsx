import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div style={{ width: "100%",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#34353f"}}>
        <TailSpin visible={true}
                  height="32"
                  width="32"
                  color="#7b8b8b"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""/>
    </div>
  )
}

export default Loading