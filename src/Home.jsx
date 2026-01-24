import React, { Fragment } from 'react'

function Home({username, email}) {
    console.log("username = ", username)
    console.log("email = ", email)
  return  (
    <Fragment>
        <h1>Hello {username} username</h1>
  <p> your email is <span className="text-yellow-500">{email}</span></p>
    </Fragment>
  )
}

export default Home