'use client'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import React from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'


const LogoutButton = ({ session }: { session : Session}) => {

    const logout = async () => {
        try {
            await signOut({
                redirect: true,
                callbackUrl: "/signin",
            })
            toast.success("Logged out successfully")
        } catch (e) {
            console.log(e);
            toast.error("Error logging out")
        }
      }
    
  return (
    <div>
      {session ? <Button onClick={logout} className="p-1">
        Logout
      </Button> :
      <Button>
        Signin
        </Button>}
    </div>
  )
}

export default LogoutButton
