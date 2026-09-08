import React, { useState, useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { toast } from "sonner"

const OTPPage = () => {

  const [otp, setOtp] = useState({
    dig1: "",
    dig2: "",
    dig3: "",
    dig4: "",
    dig5: "",
    dig6: "",
  })

  const [showEmailModal, setShowEmailModal] = useState(false)
  const [newEmail, setNewEmail] = useState("")

  const { requestOtp, verifyOtp, loading, user, changeEmail } = useContext(AuthContext)
  const navigate = useNavigate()

  const inputRefs = useRef([])

  // --------------------------------------------------
  // OTP verification
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
  // Request OTP
  // --------------------------------------------------

  const getOtp = async () => {
    try {
      await requestOtp(user.email)
    } catch (error) {
      toast.error(error.message || "Error requesting OTP")
    }
  }

  // --------------------------------------------------
  // Request OTP when page loads
  // --------------------------------------------------

  useEffect(() => {
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

    const digit = value.replace(/\D/g, "").slice(-1)

    const key = otpKeys[index]

    setOtp(prev => ({
      ...prev,
      [key]: digit
    }))

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // --------------------------------------------------
  // Backspace + arrow navigation
  // --------------------------------------------------

  const handleKeyDown = (index, e) => {

    if (e.key === "Backspace") {

      const currentKey = otpKeys[index]

      if (otp[currentKey]) {
        return
      }

      if (index > 0) {

        const previousKey = otpKeys[index - 1]

        setOtp(prev => ({
          ...prev,
          [previousKey]: ""
        }))

        inputRefs.current[index - 1]?.focus()
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // --------------------------------------------------
  // Paste OTP
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

    const nextIndex = Math.min(pastedValue.length, 5)

    inputRefs.current[nextIndex]?.focus()
  }

  // --------------------------------------------------
  // Open Change Email Modal
  // --------------------------------------------------

  const openEmailModal = () => {
    setNewEmail("")
    setShowEmailModal(true)
  }

  // --------------------------------------------------
  // Close Change Email Modal
  // --------------------------------------------------

  const closeEmailModal = () => {
    setShowEmailModal(false)
    setNewEmail("")
  }

  // --------------------------------------------------
  // Handle Change Email
  // --------------------------------------------------

  const handleChangeEmail = async (e) => {

    e.preventDefault()

    const trimmedEmail = newEmail.trim()

    if (!trimmedEmail) {
      toast.error("Please enter your new email address")
      return
    }

    // Basic UI validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast.error("Please enter a valid email address")
      return
    }

    if (trimmedEmail.toLowerCase() === user?.email?.toLowerCase()) {
      toast.error("Please enter a different email address")
      return
    }

    try{
      await changeEmail(user.email, trimmedEmail)
      await requestOtp(trimmedEmail)
      toast.success("Email change request submitted")
    }catch(error){
      toast.error(error.message)
    }finally{
      closeEmailModal()
    }
    /*
      --------------------------------------------------
      BACKEND PLACEHOLDER

      You will call your backend AP

      Example:

      await changeEmail(trimmedEmail)

      After successful backend response, you can:

      1. Close this modal
      2. Update the user email
      3. Send OTP to the new email
      4. Continue OTP verification

      For now we only demonstrate the UI.
      --------------------------------------------------
    */

    console.log("New email:", trimmedEmail)


  }

  // --------------------------------------------------
  // Close modal using Escape key
  // --------------------------------------------------

  useEffect(() => {

    const handleEscape = (e) => {

      if (e.key === "Escape" && showEmailModal) {
        closeEmailModal()
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }

  }, [showEmailModal])

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) return null

  return (

    <>
      {/* ==================================================
          OTP PAGE
      ================================================== */}

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
                onClick={openEmailModal}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-sm
                  font-medium
                  text-[#1F6F4A]
                  hover:text-[#195C3D]
                  transition-colors
                  shrink-0
                "
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
                  className="
                    w-11
                    h-12
                    sm:w-12
                    sm:h-14
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
                  "
                />

              ))}

            </div>


            {/* Helper text */}

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
                  className="
                    font-medium
                    text-[#1F6F4A]
                    hover:text-[#195C3D]
                    hover:underline
                    transition-colors
                  "
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


      {/* ==================================================
          CHANGE EMAIL MODAL
      ================================================== */}

      {showEmailModal && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-[2px]
            px-4
            py-6
          "
          onMouseDown={(e) => {

            // Close only when clicking the backdrop
            if (e.target === e.currentTarget) {
              closeEmailModal()
            }

          }}
        >

          {/* Modal */}

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-email-title"
            className="
              w-full
              max-w-md
              bg-white
              rounded-3xl
              border
              border-[#E5E7E0]
              shadow-2xl
              overflow-hidden
            "
          >

            {/* ================================
                MODAL HEADER
            ================================= */}

            <div className="flex items-start justify-between px-6 pt-6">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-[#1F6F4A]/10
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >

                  <svg
                    className="w-5 h-5 text-[#1F6F4A]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.5 12 14l9-5.5"
                    />

                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                  </svg>

                </div>


                <div>

                  <h2
                    id="change-email-title"
                    className="
                      text-lg
                      font-semibold
                      text-[#1A1A1A]
                    "
                  >
                    Change email address
                  </h2>

                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Update the email linked to your account
                  </p>

                </div>

              </div>


              {/* Close button */}

              <button
                type="button"
                onClick={closeEmailModal}
                aria-label="Close"
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-[#6B7280]
                  hover:text-[#1A1A1A]
                  hover:bg-[#F3F4F0]
                  transition-colors
                "
              >

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 6 6 18"
                  />
                </svg>

              </button>

            </div>


            {/* ================================
                MODAL BODY
            ================================= */}

            <form
              onSubmit={handleChangeEmail}
              className="px-6 pt-6 pb-6"
            >

              {/* Information */}

              <div
                className="
                  flex
                  gap-3
                  rounded-xl
                  bg-[#F7F8F5]
                  border
                  border-[#E5E7E0]
                  p-3.5
                  mb-5
                "
              >

                <svg
                  className="
                    w-5
                    h-5
                    text-[#1F6F4A]
                    shrink-0
                    mt-0.5
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />

                  <path
                    strokeLinecap="round"
                    d="M12 10v6"
                  />

                  <path
                    strokeLinecap="round"
                    d="M12 7h.01"
                  />
                </svg>


                <p className="text-xs text-[#6B7280] leading-5">
                  We'll send a verification code to your new email
                  address to make sure you have access to it.
                </p>

              </div>


              {/* Current Email */}

              <div className="mb-4">

                <label
                  htmlFor="current-email"
                  className="
                    block
                    text-sm
                    font-medium
                    text-[#1A1A1A]
                    mb-2
                  "
                >
                  Current email
                </label>

                <div
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-[#E5E7E0]
                    bg-[#F7F8F5]
                    text-sm
                    text-[#6B7280]
                    truncate
                  "
                >
                  {user?.email}
                </div>

              </div>


              {/* New Email */}

              <div>

                <label
                  htmlFor="new-email"
                  className="
                    block
                    text-sm
                    font-medium
                    text-[#1A1A1A]
                    mb-2
                  "
                >
                  New email address
                </label>

                <input
                  id="new-email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter your new email"
                  autoComplete="email"
                  autoFocus
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-[#D1D5CB]
                    bg-white
                    text-sm
                    text-[#1A1A1A]
                    placeholder:text-[#9CA3AF]
                    caret-[#1F6F4A]
                    transition-all
                    duration-150
                    focus:outline-none
                    focus:border-[#1F6F4A]
                    focus:ring-2
                    focus:ring-[#1F6F4A]/15
                  "
                />

              </div>


              {/* ================================
                  MODAL ACTIONS
              ================================= */}

              <div className="flex gap-3 mt-7">

                {/* Cancel */}

                <button
                  type="button"
                  onClick={closeEmailModal}
                  className="
                    flex-1
                    py-3
                    rounded-xl
                    border
                    border-[#D1D5CB]
                    text-[#374151]
                    text-sm
                    font-medium
                    hover:bg-[#F7F8F5]
                    transition-colors
                  "
                >
                  Cancel
                </button>


                {/* Continue */}

                <button
                  type="submit"
                  disabled={!newEmail.trim()}
                  className="
                    flex-1
                    py-3
                    rounded-xl
                    bg-[#1F6F4A]
                    text-white
                    text-sm
                    font-medium
                    hover:bg-[#195C3D]
                    disabled:bg-[#A7B8AF]
                    disabled:cursor-not-allowed
                    transition-colors
                  "
                >
                  Continue
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </>
  )
}

export default OTPPage
