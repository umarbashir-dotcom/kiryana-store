import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"
import { toast } from 'sonner'

const OTPPage = () => {

  const [otp, setOtp] = useState({
    dig1: "",
    dig2: "",
    dig3: "",
    dig4: "",
    dig5: "",
    dig6: "",
  })

  const { requestOtp, verifyOtp, loading, user } = useContext(AuthContext)
  const navigate = useNavigate()

  // References for all six OTP inputs
  const inputRefs = useRef([])

  // --------------------------------------------------
  // Your existing OTP verification logic
  // --------------------------------------------------

  const sendOtp = async () => {
    try {
      await verifyOtp(
        user.email,
        otp.dig1 +
        otp.dig2 +
        otp.dig3 +
        otp.dig4 +
        otp.dig5 +
        otp.dig6
      )
    } catch (error) {
      toast.error(error.message)
    }
  }

  // --------------------------------------------------
  // Your existing OTP request logic
  // --------------------------------------------------

  const getOtp = async () => {
    try {
      await requestOtp(user.email)
    } catch (error) {
      toast.error(error.message || "error")
    }
  }

  // --------------------------------------------------
  // Request OTP when page loads
  // --------------------------------------------------

  useEffect(() => {
    console.log("inside useEffect of OTP Page")

    getOtp()
  }, [])

  // --------------------------------------------------
  // OTP input handling
  // --------------------------------------------------

  const otpKeys = [
    "dig1",
    "dig2",
    "dig3",
    "dig4",
    "dig5",
    "dig6"
  ]

  const handleOtpChange = (index, value) => {

    // Only allow numbers
    const digit = value.replace(/\D/g, "").slice(-1)

    const key = otpKeys[index]

    setOtp(prev => ({
      ...prev,
      [key]: digit
    }))

    // Move to next input automatically
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // --------------------------------------------------
  // Handle backspace
  // --------------------------------------------------

  const handleKeyDown = (index, e) => {

    if (e.key === "Backspace") {

      const currentKey = otpKeys[index]

      // If current box already has a digit,
      // let normal backspace clear it.
      if (otp[currentKey]) {
        return
      }

      // If current box is empty, move to previous box
      if (index > 0) {
        const previousKey = otpKeys[index - 1]

        setOtp(prev => ({
          ...prev,
          [previousKey]: ""
        }))

        inputRefs.current[index - 1]?.focus()
      }
    }

    // Optional: allow left/right arrow navigation
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // --------------------------------------------------
  // Handle paste
  // --------------------------------------------------

  const handlePaste = (e) => {

    e.preventDefault()

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)

    if (!pastedValue) return

    const newOtp = {
      dig1: pastedValue[0] || "",
      dig2: pastedValue[1] || "",
      dig3: pastedValue[2] || "",
      dig4: pastedValue[3] || "",
      dig5: pastedValue[4] || "",
      dig6: pastedValue[5] || "",
    }

    setOtp(newOtp)

    // Focus the next empty box,
    // otherwise focus the last box.
    const nextIndex = Math.min(pastedValue.length, 5)

    inputRefs.current[nextIndex]?.focus()
  }

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) return null

  console.log(user)

  return (

    <div className="min-h-screen bg-[#F7F8F5] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* ================================
            OTP CARD
        ================================= */}

        <div className="bg-white rounded-3xl border border-[#E5E7E0] shadow-sm px-6 py-8 sm:px-8 sm:py-9">

          {/* Icon */}

          <div className="flex justify-center mb-5">

            <div className="w-14 h-14 rounded-2xl bg-[#1F6F4A]/10 flex items-center justify-center">

              <svg
                className="w-7 h-7 text-[#1F6F4A]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 12 2 2 4-4"
                />
              </svg>

            </div>

          </div>


          {/* Heading */}

          <h1 className="text-2xl font-semibold text-[#1A1A1A] text-center tracking-tight">
            Verify your email
          </h1>


          {/* Description */}

          <p className="text-sm text-[#6B7280] text-center mt-2 leading-6">
            We've sent a 6-digit verification code to
          </p>


          {/* Email + Change */}

          <div className="flex items-center justify-center gap-2 mt-1.5">

            <span className="text-sm font-medium text-[#1A1A1A] truncate max-w-[220px]">
              {user?.email}
            </span>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1F6F4A] hover:text-[#195C3D] transition-colors shrink-0"
            >

              {/* Edit icon */}

              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20h9"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18l-4 1 1-4Z"
                />

              </svg>

              Change

            </button>

          </div>


          {/* ================================
              OTP INPUTS
          ================================= */}

          <div className="flex justify-center gap-2.5 sm:gap-3 mt-8">

            {otpKeys.map((key, index) => (

              <input
                key={key}
                ref={(element) => {
                  inputRefs.current[index] = element
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={otp[key]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`
                  w-11 h-12
                  sm:w-12 sm:h-14
                  text-center
                  text-lg
                  sm:text-xl
                  font-semibold
                  rounded-xl
                  border
                  border-[#D1D5CB]
                  bg-[#FAFAF8]
                  text-[#1A1A1A]
                  caret-[#1F6F4A]
                  transition-all
                  duration-150
                  focus:outline-none
                  focus:bg-white
                  focus:border-[#1F6F4A]
                  focus:ring-2
                  focus:ring-[#1F6F4A]/15
                `}
              />

            ))}

          </div>


          {/* Small helper text */}

          <p className="text-xs text-[#9CA3AF] text-center mt-3">
            Enter the code sent to your email
          </p>


          {/* ================================
              VERIFY BUTTON
          ================================= */}

          <button
            type="button"
            disabled={
              !otp.dig1 ||
              !otp.dig2 ||
              !otp.dig3 ||
              !otp.dig4 ||
              !otp.dig5 ||
              !otp.dig6
            }
            onClick={sendOtp}
            className="
              w-full
              mt-6
              bg-[#1F6F4A]
              text-white
              font-medium
              py-3.5
              rounded-xl
              transition-all
              duration-200
              hover:bg-[#195C3D]
              disabled:bg-[#A7B8AF]
              disabled:cursor-not-allowed
              disabled:hover:bg-[#A7B8AF]
            "
          >
            Verify & Continue
          </button>


          {/* ================================
              RESEND
          ================================= */}

          <div className="text-center mt-5">

            <p className="text-sm text-[#6B7280]">

              Didn't receive the code?{" "}

              <button
                type="button"
                onClick={getOtp}
                className="font-medium text-[#1F6F4A] hover:text-[#195C3D] hover:underline transition-colors"
              >
                Resend OTP
              </button>

            </p>

          </div>

        </div>


        {/* ================================
            BACK TO LOGIN
        ================================= */}

        <div className="text-center mt-6">

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-[#6B7280]
              hover:text-[#1A1A1A]
              transition-colors
            "
          >

            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12 19-7-7 7-7"
              />

            </svg>

            Back to login

          </button>

        </div>

      </div>

    </div>
  )
}

export default OTPPage
