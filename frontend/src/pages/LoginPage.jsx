import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from "sonner"

const LoginPage = () => {
  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)

  // Login button loading state
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const submitForm = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      await login(formData)
      navigate("/OTP")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FBF5E9]">

      {/* =========================================================
          BRAND PANEL
          Desktop: Large left panel
          Mobile: Compact header
      ========================================================== */}

      <aside
        className="
          relative overflow-hidden
          bg-[#1F6F4A] text-[#FBF5E9]
          bg-[radial-gradient(circle,rgba(255,255,255,0.10)_1.5px,transparent_1.5px)]
          bg-[length:18px_18px]

          w-full
          px-6 py-6

          lg:w-[42%]
          lg:min-h-screen
          lg:px-14
          lg:py-16
          lg:flex
          lg:flex-col
          lg:justify-between
        "
      >

        {/* Decorative shapes */}

        <svg
          className="
            absolute
            -right-16 -top-16
            w-56 h-56
            opacity-[0.07]
          "
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>

        <svg
          className="
            absolute
            -left-16 -bottom-20
            w-64 h-64
            opacity-[0.06]
          "
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2 L22 12 L12 22 L2 12 Z" />
        </svg>


        {/* Brand content */}

        <div className="relative z-10">

          {/* Small brand label */}

          <div className="flex items-center gap-2">

            <div
              className="
                flex items-center justify-center
                w-8 h-8
                rounded-lg
                bg-white/10
                border border-white/10
              "
            >
              <svg
                className="w-4 h-4 text-[#E0A430]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 8h16l-1.5 11a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7L4 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
            </div>

            <span
              className="
                font-['IBM_Plex_Mono',monospace]
                text-[10px]
                sm:text-xs
                tracking-[0.22em]
                text-[#E0A430]
              "
            >
              APNA KIRYANA
            </span>

          </div>


          {/* Brand heading */}

          <h1
            className="
              font-['Fraunces',serif]
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-semibold
              leading-[1.05]
              mt-4
            "
          >
            Kiryana
          </h1>


          {/* Description */}

          <p
            className="
              mt-3
              lg:mt-4
              max-w-sm
              text-[#D8E8DE]
              text-sm
              lg:text-[15px]
              leading-relaxed
            "
          >
            Rice, masala, tel, aur ghar ka har zaroori saman —
            apne mohalle ki dukaan se, seedha ghar tak.
          </p>

        </div>


        {/* Desktop-only store information */}

        <div className="relative z-10 hidden lg:block">

          <div
            className="
              flex items-center gap-5
              text-[#D8E8DE]
              text-sm
              font-['IBM_Plex_Mono',monospace]
            "
          >
            <span>500+ items</span>

            <span className="w-1 h-1 rounded-full bg-[#D8E8DE]/50"></span>

            <span>Same-day delivery</span>
          </div>

        </div>

      </aside>


      {/* =========================================================
          LOGIN AREA
      ========================================================== */}

      <main
        className="
          flex-1
          flex
          items-center
          justify-center

          px-4
          sm:px-6
          py-8
          sm:py-10

          lg:px-10
          lg:py-12
        "
      >

        <div className="w-full max-w-[430px]">

          {/* =====================================================
              LOGIN CARD
          ====================================================== */}

          <div
            className="
              bg-[#FFFDF8]
              border
              border-[#E8DFCE]
              rounded-2xl
              shadow-[0_12px_40px_rgba(42,38,32,0.07)]
              overflow-hidden
            "
          >

            <div
              className="
                px-6
                py-7

                sm:px-8
                sm:py-8
              "
            >

              {/* Small heading */}

              <p
                className="
                  font-['IBM_Plex_Mono',monospace]
                  text-[10px]
                  sm:text-[11px]
                  tracking-[0.22em]
                  text-[#8C5A3C]
                  text-center
                  mb-4
                "
              >
                KIRYANA STORE&nbsp; • &nbsp;SIGN IN
              </p>


              {/* Main heading */}

              <h2
                className="
                  font-['Fraunces',serif]
                  text-[30px]
                  sm:text-3xl
                  font-semibold
                  text-center
                  text-[#2A2620]
                "
              >
                Welcome back
              </h2>


              <p
                className="
                  text-center
                  text-[#7A7263]
                  text-sm
                  mt-2
                  mb-7
                "
              >
                Sign in to reorder your essentials
              </p>


              {/* =================================================
                  FORM
              ================================================== */}

              <form
                className="space-y-5"
                onSubmit={submitForm}
              >

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="
                      block
                      text-xs
                      font-semibold
                      tracking-wide
                      text-[#4A4638]
                      mb-1.5
                    "
                  >
                    EMAIL
                  </label>


                  <div className="relative">

                    <svg
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        w-4
                        h-4
                        text-[#A99D84]
                      "
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />
                      <path d="m3 7 9 6 9-6" />
                    </svg>


                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      name="email"
                      onChange={handleChange}
                      className="
                        w-full
                        pl-10
                        pr-3
                        py-3

                        bg-[#FBF5E9]
                        border
                        border-[#E4DAC2]
                        rounded-lg

                        text-[15px]
                        text-[#2A2620]

                        placeholder:text-[#B5A88C]

                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#1F6F4A]/20
                        focus:border-[#1F6F4A]

                        transition
                      "
                    />

                  </div>

                </div>


                {/* SEPARATOR */}

                <div className="border-t border-dashed border-[#C9BFA8]"></div>


                {/* PASSWORD */}

                <div>

                  <div className="flex items-center justify-between mb-1.5">

                    <label
                      htmlFor="password"
                      className="
                        block
                        text-xs
                        font-semibold
                        tracking-wide
                        text-[#4A4638]
                      "
                    >
                      PASSWORD
                    </label>


                    {/* Forgot password */}

                    <Link
                      to="#"
                      className="
                        text-xs
                        text-[#1F6F4A]
                        hover:text-[#145034]
                        font-semibold
                        transition-colors
                      "
                    >
                      Forgot password?
                    </Link>

                  </div>


                  <div className="relative">

                    {/* Lock icon */}

                    <svg
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        w-4
                        h-4
                        text-[#A99D84]
                      "
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="5"
                        y="11"
                        width="14"
                        height="9"
                        rx="2"
                      />

                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>


                    {/* Password input */}

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      name="password"
                      onChange={handleChange}
                      className="
                        w-full
                        pl-10
                        pr-10
                        py-3

                        bg-[#FBF5E9]
                        border
                        border-[#E4DAC2]
                        rounded-lg

                        text-[15px]
                        text-[#2A2620]

                        placeholder:text-[#B5A88C]

                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#1F6F4A]/20
                        focus:border-[#1F6F4A]

                        transition
                      "
                    />


                    {/* Show / hide password */}

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(prev => !prev)
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-[#A99D84]
                        hover:text-[#4A4638]
                        transition-colors
                      "
                    >

                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />

                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>

                    </button>

                  </div>

                </div>


                {/* REMEMBER ME */}

                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-[#7A7263]
                    pt-0.5
                    cursor-pointer
                  "
                >

                  <input
                    type="checkbox"
                    className="
                      w-4
                      h-4
                      rounded
                      border-[#E4DAC2]
                      text-[#1F6F4A]
                      focus:ring-[#1F6F4A]/30
                    "
                  />

                  Keep me signed in

                </label>


                {/* =================================================
                    LOGIN BUTTON
                ================================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full

                    flex
                    items-center
                    justify-center
                    gap-2.5

                    bg-[#1F6F4A]
                    hover:bg-[#195D3E]

                    disabled:bg-[#1F6F4A]/80
                    disabled:cursor-not-allowed

                    text-white

                    font-semibold
                    text-[15px]

                    py-3
                    rounded-lg

                    transition-all
                    duration-200

                    shadow-[0_4px_12px_rgba(31,111,74,0.18)]
                    hover:shadow-[0_6px_16px_rgba(31,111,74,0.24)]

                    disabled:shadow-none

                    mt-2
                  "
                >

                  {loading ? (
                    <>
                      {/* Loading spinner */}

                      <span
                        className="
                          w-4
                          h-4
                          rounded-full

                          border-2
                          border-white/30
                          border-t-white

                          animate-spin
                        "
                      />

                      <span>
                        Logging in
                      </span>
                    </>
                  ) : (
                    <span>
                      Sign in
                    </span>
                  )}

                </button>

              </form>


              {/* =================================================
                  REGISTER SECTION
              ================================================== */}

              <div
                className="
                  border-t
                  border-dashed
                  border-[#C9BFA8]

                  mt-7
                  pt-5

                  text-center
                "
              >

                <p className="text-sm text-[#7A7263]">

                  New to Kiryana?{" "}

                  <Link
                    to="/register"
                    className="
                      text-[#1F6F4A]
                      hover:text-[#145034]
                      font-semibold
                      transition-colors
                    "
                  >
                    Create an account
                  </Link>

                </p>

              </div>


              {/* =================================================
                  BARCODE
              ================================================== */}

              <div
                className="
                  flex
                  items-end
                  justify-center
                  gap-[2px]

                  h-5
                  mt-6

                  opacity-50
                "
              >

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "100%", width: "2px" }}
                />

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "60%", width: "1px" }}
                />

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "90%", width: "2px" }}
                />

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "40%", width: "1px" }}
                />

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "100%", width: "1px" }}
                />

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "70%", width: "2px" }}
                />

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "50%", width: "1px" }}
                />

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "90%", width: "1px" }}
                />

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "60%", width: "2px" }}
                />

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "100%", width: "1px" }}
                />

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "40%", width: "1px" }}
                />

                <span
                  className="bg-[#2A2620]"
                  style={{ height: "80%", width: "2px" }}
                />

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default LoginPage

