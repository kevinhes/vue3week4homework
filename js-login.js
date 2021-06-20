import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            apiUrl : 'https://vue3-course-api.hexschool.io/',
            user : {
                username : '',
                password : '',
            }
        }
    },
    methods: {
        login (){
            axios.post(`${this.apiUrl}admin/signin`,this.user)
            .then((res) => {
                if(res.data.success){
                    const token  = res.data.token;
                    const expired = res.data.expired
                    document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                    window.location = 'product.html'
                }else{
                    alert(res.data.message)
                }
            }).catch((error) =>{
                console.log(error);
                
            })
        }
    },
    mounted() {
        
    },
})

app.mount('#app')