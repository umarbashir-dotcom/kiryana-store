const AuthLoading = () => {
  return (
    <div className="min-h-screen bg-[#FBF5E9] flex items-center justify-center px-6">

      <div className="flex flex-col items-center text-center">

        {/* Brand Icon */}
        <div
          className="
            w-16 h-16
            rounded-2xl
            bg-[#1F6F4A]
            flex items-center justify-center
            shadow-[0_8px_24px_rgba(31,111,74,0.18)]
            mb-5
          "
        >
          <svg
            className="w-8 h-8 text-[#FBF5E9]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M4 8h16l-1.5 11a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7L4 8Z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
        </div>


        {/* Brand Name */}
        <h1
          className="
            font-['Fraunces',serif]
            text-3xl
            font-semibold
            text-[#2A2620]
            leading-none
          "
        >
            Apna  Kiryana
        </h1>


        {/* Loading Message */}
        <p
          className="
            mt-2
            text-sm
            text-[#7A7263]
          "
        >
          Checking your account
        </p>


        {/* Spinner */}
        <div className="mt-6">

          <div
            className="
              w-5 h-5
              rounded-full
              border-2
              border-[#1F6F4A]/20
              border-t-[#1F6F4A]
              animate-spin
            "
          />

        </div>


        {/* Small status indicator */}
        <div
          className="
            flex
            items-center
            gap-2
            mt-4
            text-[10px]
            font-['IBM_Plex_Mono',monospace]
            tracking-[0.18em]
            uppercase
            text-[#8C5A3C]
          "
        >
          <span
            className="
              w-1.5 h-1.5
              rounded-full
              bg-[#E0A430]
              animate-pulse
            "
          />

          Secure session

        </div>

      </div>

    </div>
  )
}

export default AuthLoading
