import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const { register } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    if(confirmPassword !== formData.password){
      setPasswordError("Passwords do not match")
      return
    }

    try {
      await register(formData)
      console.log("Form submitted")
      navigate("/")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (

    // <!-- RegisterPage (top-level route component) -->
    <div className="min-h-screen w-full bg-[#FBF7EF] flex flex-col lg:flex-row">

      {/* <!-- BrandPanel (left side, hidden on mobile) --> */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#1F6F4A] relative overflow-hidden flex-col justify-between p-12">

        {/* <!-- decorative texture --> */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FFFFFF 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        ></div>

        <div className="relative z-10">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#E8A33D] flex items-center justify-center">
              <span className="text-[#145034] font-bold text-lg">K</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">Kriamasho</span>
          </a>
        </div>

        <div className="relative z-10 max-w-sm">
          <h1 className="text-white text-3xl font-semibold leading-tight mb-4">
            Your daily essentials,<br />sorted and saved.
          </h1>
          <p className="text-[#D7ECDF] text-sm leading-relaxed">
            Create an account to save your wishlist, track orders, and check out faster next time you stock up.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/20"></div>
          <span className="text-[#D7ECDF] text-xs uppercase tracking-wider">Rice · Oil · Spices · Daily Needs</span>
          <div className="h-px flex-1 bg-white/20"></div>
        </div>
      </div>

      {/* <!-- FormPanel --> */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
        <div className="w-full max-w-md">

          {/* <!-- mobile-only brand mark --> */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#1F6F4A] flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-[#23231F] font-semibold text-base tracking-tight">Kriamasho</span>
          </div>

          <div className="mb-8">
            <h2 className="text-[#23231F] text-2xl font-semibold tracking-tight mb-1.5">Create your account</h2>
            <p className="text-[#6B6B63] text-sm">Fill in your details to get started.</p>
          </div>

          {/* <!-- RegisterForm --> */}
          <form className="space-y-5" onSubmit={submitForm}>

            {/* <!-- FormField: Username --> */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#23231F] mb-1.5">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder=""
                className="w-full px-4 py-2.5 rounded-lg border border-[#E7E1D3] bg-white text-[#23231F] text-sm placeholder:text-[#A8A297] focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]/30 focus:border-[#1F6F4A] transition-colors"
              />
            </div>

            {/* <!-- FormField: Email --> */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#23231F] mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E7E1D3] bg-white text-[#23231F] text-sm placeholder:text-[#A8A297] focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]/30 focus:border-[#1F6F4A] transition-colors"
              />
            </div>

            {/* <!-- FormField: Phone --> */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#23231F] mb-1.5">
                Phone number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[#E7E1D3] bg-[#F5F1E7] text-[#6B6B63] text-sm">
                  +92
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder=""
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-r-lg border border-[#E7E1D3] bg-white text-[#23231F] text-sm placeholder:text-[#A8A297] focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]/30 focus:border-[#1F6F4A] transition-colors"
                />
              </div>
            </div>

            {/* <!-- FormField: Password --> */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#23231F] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "Text" : "password"}
                  placeholder=""
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 pr-11 rounded-lg border border-[#E7E1D3] bg-white text-[#23231F] text-sm placeholder:text-[#A8A297] focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]/30 focus:border-[#1F6F4A] transition-colors"
                />
                {/* <!-- PasswordVisibilityToggle --> */}
                <button type="button" aria-label="Show password" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A297] hover:text-[#6B6B63]" onClick={() => { setShowPassword(prev => !prev) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* <!-- FormField: ConfirmPassword --> */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#23231F] mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "Text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (passwordError) setPasswordError("")
                  }}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-2.5 pr-11 rounded-lg border border-[#E7E1D3] bg-white text-[#23231F] text-sm placeholder:text-[#A8A297] focus:outline-none focus:ring-2 focus:ring-[#1F6F4A]/30 focus:border-[#1F6F4A] transition-colors"
                />
                {passwordError && (
                  <p className="text-red-600 text-xs mt-1.5">{passwordError}</p>
                )}
                <button type="button" aria-label="Show password" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A297] hover:text-[#6B6B63]" onClick={() => { setShowPassword(prev => !prev) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* <!-- SubmitButton --> */}
            <button
              type="submit"
              className="w-full bg-[#1F6F4A] hover:bg-[#145034] text-white text-sm font-medium py-3 rounded-lg transition-colors mt-2"
            >
              Create account
            </button>

          </form>

          {/* <!-- FooterLink: to login --> */}
          <p className="text-center text-sm text-[#6B6B63] mt-6">
            Already have an account?
            <a href="/login" className="text-[#1F6F4A] font-medium underline decoration-[#E8A33D] decoration-2 underline-offset-2 hover:text-[#145034]">
              Log in
            </a>
          </p>

        </div>
      </div>

    </div>
  )
}

export default RegisterPage