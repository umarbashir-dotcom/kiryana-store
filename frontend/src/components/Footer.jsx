import React from 'react'
import { MessageCircle, Phone, MapPin, Truck, ShieldCheck, BadgePercent } from 'lucide-react'

// lucide-react dropped brand/social icons — using small inline SVGs for these instead
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.04V10.5H7.7v3H10.2V21h3.3z" />
  </svg>
)

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const Footer = () => {
  return (
    <footer className="bg-[#154A32] text-white">

      {/* Trust strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#E8A33D] shrink-0" strokeWidth={2} />
            <div>
              <p className="text-sm font-medium">Same-day delivery</p>
              <p className="text-xs text-white/60">Order before 6 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#E8A33D] shrink-0" strokeWidth={2} />
            <div>
              <p className="text-sm font-medium">Quality checked</p>
              <p className="text-xs text-white/60">Fresh stock, every order</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BadgePercent className="w-5 h-5 text-[#E8A33D] shrink-0" strokeWidth={2} />
            <div>
              <p className="text-sm font-medium">Best local prices</p>
              <p className="text-xs text-white/60">Daily deals on staples</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="col-span-2 lg:col-span-1">
          <span className="font-['Fraunces'] font-semibold text-xl text-white">Kiryana</span>
          <p className="mt-2 text-sm text-white/60 leading-relaxed">
            Rice, atta, masale aur roz-marra ka saaman — ghar baithe order karein.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="#" aria-label="WhatsApp" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-white/40 mb-3">Shop</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white">Rice &amp; Grains</a></li>
            <li><a href="#" className="hover:text-white">Oil &amp; Ghee</a></li>
            <li><a href="#" className="hover:text-white">Spices &amp; Masala</a></li>
            <li><a href="#" className="hover:text-white">Pulses &amp; Daal</a></li>
            <li><a href="#" className="hover:text-white">All Categories</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-white/40 mb-3">Account</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white">My Orders</a></li>
            <li><a href="#" className="hover:text-white">Wishlist</a></li>
            <li><a href="#" className="hover:text-white">Account Settings</a></li>
            <li><a href="#" className="hover:text-white">Help &amp; Support</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-white/40 mb-3">Contact</p>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#E8A33D]" strokeWidth={2} />
              <span>Faisalabad, Punjab, Pakistan</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#E8A33D]" strokeWidth={2} />
              <span>+92 300 0000000</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} Kiryana. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer