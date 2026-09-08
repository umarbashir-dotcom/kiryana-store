import React, { useContext, useState } from 'react'
import {
    User,
    Mail,
    Phone,
    Lock,
    Pencil,
    Check,
    X,
    ShieldCheck
} from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'sonner'

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const { user, update } = useContext(AuthContext)
    
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
    })

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSave = async (e) => {
        e.preventDefault()

        try{
            await update(formData)
        }catch(err){
            toast.error(err.message)
        }finally{
            setIsEditing(false)
        }
    }

    
    return (
        <main className="w-full min-h-screen bg-[#F6F8F4]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="font-['Fraunces'] text-3xl sm:text-4xl font-semibold text-[#154A32]">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm sm:text-base text-[#22281F]/60">
                        Manage your personal information and account details.
                    </p>
                </div>

                {/* Profile Overview */}
                <section className="bg-white rounded-2xl border border-[#22281F]/10 overflow-hidden">

                    {/* Profile Top */}
                    <div className="px-5 sm:px-8 py-6 sm:py-7 border-b border-[#22281F]/10">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                            <div className="flex items-center gap-4">

                                {/* Avatar */}
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1F6F4A]/10 flex items-center justify-center shrink-0">
                                    <User
                                        className="w-8 h-8 sm:w-10 sm:h-10 text-[#1F6F4A]"
                                        strokeWidth={1.8}
                                    />
                                </div>

                                {/* User Name */}
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-semibold text-[#22281F]">
                                        {user.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-[#22281F]/55">
                                        {user.email}
                                    </p>
                                </div>

                            </div>

                            {!isEditing && (
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="
                                        inline-flex items-center justify-center gap-2
                                        w-full sm:w-auto
                                        px-5 py-2.5
                                        rounded-xl
                                        bg-[#1F6F4A]
                                        text-white
                                        text-sm font-medium
                                        hover:bg-[#154A32]
                                        transition-colors
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-[#1F6F4A]/30
                                    "
                                >
                                    <Pencil className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            )}

                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="px-5 sm:px-8 py-7">

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-[#22281F]">
                                Personal Information
                            </h3>

                            <p className="mt-1 text-sm text-[#22281F]/55">
                                Your basic account information.
                            </p>
                        </div>

                        {!isEditing ? (

                            /* ================= VIEW MODE ================= */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                                {/* Name */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <User className="w-4 h-4 text-[#1F6F4A]" />
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#22281F]/50">
                                            Full Name
                                        </p>
                                    </div>

                                    <p className="text-base font-medium text-[#22281F]">
                                        {user.name}
                                    </p>
                                </div>

                                {/* Email */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Mail className="w-4 h-4 text-[#1F6F4A]" />
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#22281F]/50">
                                            Email Address
                                        </p>
                                    </div>

                                    <p className="text-base font-medium text-[#22281F] break-all">
                                        {user.email}
                                    </p>
                                </div>

                                {/* Phone */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone className="w-4 h-4 text-[#1F6F4A]" />
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#22281F]/50">
                                            Phone Number
                                        </p>
                                    </div>

                                    <p className="text-base font-medium text-[#22281F]">
                                        {user.phone}
                                    </p>
                                </div>

                            </div>

                        ) : (

                            /* ================= EDIT MODE ================= */
                            <form onSubmit={handleSave}>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Full Name */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-[#22281F]"
                                        >
                                            Full Name
                                        </label>

                                        <div className="relative">
                                            <User
                                                className="
                                                    absolute left-3 top-1/2
                                                    -translate-y-1/2
                                                    w-5 h-5
                                                    text-[#22281F]/35
                                                "
                                            />

                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="
                                                    w-full
                                                    pl-11 pr-4
                                                    py-3
                                                    rounded-xl
                                                    bg-[#F6F8F4]
                                                    border border-[#22281F]/10
                                                    text-[#22281F]
                                                    text-sm
                                                    placeholder:text-[#22281F]/40
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#1F6F4A]/20
                                                    focus:border-[#1F6F4A]
                                                    transition
                                                "
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-[#22281F]"
                                        >
                                            Email Address
                                        </label>

                                        <div className="relative">
                                            <Mail
                                                className="
                                                    absolute left-3 top-1/2
                                                    -translate-y-1/2
                                                    w-5 h-5
                                                    text-[#22281F]/35
                                                "
                                            />

                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="
                                                    w-full
                                                    pl-11 pr-4
                                                    py-3
                                                    rounded-xl
                                                    bg-[#F6F8F4]
                                                    border border-[#22281F]/10
                                                    text-[#22281F]
                                                    text-sm
                                                    placeholder:text-[#22281F]/40
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#1F6F4A]/20
                                                    focus:border-[#1F6F4A]
                                                    transition
                                                "
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="phone"
                                            className="block mb-2 text-sm font-medium text-[#22281F]"
                                        >
                                            Phone Number
                                        </label>

                                        <div className="relative max-w-xl">
                                            <Phone
                                                className="
                                                    absolute left-3 top-1/2
                                                    -translate-y-1/2
                                                    w-5 h-5
                                                    text-[#22281F]/35
                                                "
                                            />

                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="
                                                    w-full
                                                    pl-11 pr-4
                                                    py-3
                                                    rounded-xl
                                                    bg-[#F6F8F4]
                                                    border border-[#22281F]/10
                                                    text-[#22281F]
                                                    text-sm
                                                    placeholder:text-[#22281F]/40
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#1F6F4A]/20
                                                    focus:border-[#1F6F4A]
                                                    transition
                                                "
                                            />
                                        </div>
                                    </div>

                                </div>

                                {/* Edit Actions */}
                                <div className="
                                    mt-8 pt-6
                                    border-t border-[#22281F]/10
                                    flex flex-col-reverse sm:flex-row
                                    sm:justify-end
                                    gap-3
                                ">

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="
                                            inline-flex items-center justify-center gap-2
                                            px-5 py-2.5
                                            rounded-xl
                                            border border-[#22281F]/15
                                            text-[#22281F]/70
                                            text-sm font-medium
                                            hover:bg-[#F6F8F4]
                                            transition-colors
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-[#22281F]/10
                                        "
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="
                                            inline-flex items-center justify-center gap-2
                                            px-5 py-2.5
                                            rounded-xl
                                            bg-[#1F6F4A]
                                            text-white
                                            text-sm font-medium
                                            hover:bg-[#154A32]
                                            transition-colors
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-[#1F6F4A]/30
                                        "
                                    >
                                        <Check className="w-4 h-4" />
                                        Save Changes
                                    </button>

                                </div>

                            </form>
                        )}

                    </div>

                </section>

                {/* Security Section */}
                <section className="mt-6 bg-white rounded-2xl border border-[#22281F]/10 overflow-hidden">

                    <div className="px-5 sm:px-8 py-6">

                        <div className="flex items-start gap-4">

                            <div className="
                                w-11 h-11
                                rounded-xl
                                bg-[#1F6F4A]/10
                                flex items-center justify-center
                                shrink-0
                            ">
                                <ShieldCheck
                                    className="w-5 h-5 text-[#1F6F4A]"
                                />
                            </div>

                            <div className="flex-1">

                                <h3 className="text-lg font-semibold text-[#22281F]">
                                    Password & Security
                                </h3>

                                <p className="mt-1 text-sm text-[#22281F]/55">
                                    Keep your account secure by managing your password.
                                </p>

                                <div className="
                                    mt-5
                                    flex flex-col sm:flex-row
                                    sm:items-center sm:justify-between
                                    gap-4
                                    p-4
                                    rounded-xl
                                    bg-[#F6F8F4]
                                    border border-[#22281F]/10
                                ">

                                    <div className="flex items-center gap-3">

                                        <div className="
                                            w-9 h-9
                                            rounded-lg
                                            bg-white
                                            flex items-center justify-center
                                            border border-[#22281F]/10
                                        ">
                                            <Lock
                                                className="w-4 h-4 text-[#1F6F4A]"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#22281F]">
                                                Password
                                            </p>

                                            <p className="text-xs text-[#22281F]/50 mt-0.5">
                                                ••••••••••••
                                            </p>
                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        className="
                                            text-sm
                                            font-medium
                                            text-[#1F6F4A]
                                            hover:text-[#154A32]
                                            transition-colors
                                        "
                                    >
                                        Change Password
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </div>
        </main>
    )
}

export default ProfilePage