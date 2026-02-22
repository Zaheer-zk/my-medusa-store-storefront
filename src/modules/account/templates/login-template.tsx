"use client"

import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="w-full flex flex-col justify-start px-8 py-8 gap-6">
      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
      <div className="max-w-sm text-sm text-ui-fg-subtle">
        Want to sell on the marketplace?{" "}
        <LocalizedClientLink href="/seller/register" className="underline">
          Register as a seller
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default LoginTemplate
