import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: false,
  }),
  actions: {
    async authenticatedUser(username, password) {
      try {
        const { data } = await useFetch("http://114.134.71.136:8080/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            username: username,
            password: password
          }
        });

       if(data.value){
        this.auth = true;
        const token = useCookie('token', { sameSite: 'lax', maxAge: 60 * 60 })
        token.value = data.value.token
        
       }else{
        this.auth = false
        this.error = "Username or password is incorrect"
       }
      } catch (error) {
        // Handle the error
        this.auth = false;
        this.error = error.message;
      }
    },
    logUserOut() {
        const token = useCookie('token')
        token.value = null
        this.auth = false;
    }
  },
});