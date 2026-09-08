const authService = {
    login: async (loginData) => {
        let res;
        let data;

        try{
            res = await fetch(`${import.meta.env.VITE_USER_API}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginData)
                })
            data = await res.json()
            if (!res.ok){
                const error = new Error(data.error)
                error.status = res.status
                throw error
            }
        }catch(error){
            console.error("ERROR: ", error)
            if(!error.status){
                error.message = "Network Error"
            }
            throw error
        }

        localStorage.setItem("refresh_token", data.token)
        return data
    },

    logout: () => {
        localStorage.removeItem("token")
        localStorage.removeItem("refresh_token")
        return {
            isAuthenticated: false,
            token: null,
            user: null,
            loading: false,
            // loading:true
        }
    },

    register: async (registerData) => {
        const res = await fetch(`${import.meta.env.VITE_USER_API}/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerData)
            })
        const data = await res.json()

        if (!res.ok) throw new Error(data.error)

        localStorage.setItem("token", data.user.token)
        return data
    },

    getMe: async () => {
        const token = localStorage.getItem("token") || localStorage.getItem("refresh_token")
        const res = await fetch(`${import.meta.env.VITE_USER_API}/me`, {
            headers: {
                authorization: "Bearer " + token 
            }
        })

        const data = await res.json()
        if (!res.ok) {
            const error = new Error(data.error)
            error.status = res.status
            throw error
        }
        console.log("data: ", data)
        return data
    },
    update: async (updatedData) => {
        const token = localStorage.getItem("token") 
        const res = await fetch(`${import.meta.env.VITE_USER_API}`, {
            method: "PUT",
            headers: {
                authorization: "Bearer " + token,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(updatedData)
        })

        const data = await res.json()
        if (!res.ok) {
            const error = new Error(data.error)
            error.status = res.status
            throw error
        }
        return data
    },
    changeEmail: async (oldEmail, newEmail) => {
        const token = localStorage.getItem("token") 
        const res = await fetch(`${import.meta.env.VITE_USER_API}/update/email`, {
            method: "PUT",
            headers: {
                authorization: "Bearer " + token,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({oldEmail, newEmail})
        })

        const data = await res.json()
        if (!res.ok) {
            const error = new Error(data.error)
            error.status = res.status
            throw error
        }
        return data
    },
    requestOtp: async (email) => {
        console.log("request Otp called")

        const res = await fetch(`${import.meta.env.VITE_HOST}/auth/request-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        
        return data
    },
    // ----------
    verifyOtp: async (email, otp) => {
        const token = localStorage.getItem("refresh_token")
        
        const res = await fetch(`${import.meta.env.VITE_HOST}/auth/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + token
            },
            body: JSON.stringify({ email, otp })
        })

        const data = await res.json()
        
        if (!res.ok) throw new Error(data.error)
            
        localStorage.removeItem("refresh_token")
        localStorage.setItem("token", data.token)
        
        return data
    }
}

export default authService;