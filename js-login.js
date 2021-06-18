Vue.createApp({
    data(){
        return{
            apiUrl : 'https://vue3-course-api.hexschool.io',
            user : {
                username:'',
                password:'',
            }
        }
    },
    methods: {
        login(){
            axios.post(`${this.apiUrl}/admin/signin`,this.user)
            .then((res) =>{
                if(res.data.success){
                    const token = res.data.token;
                    const expired = res.data.expired;
                    document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                    window.location = 'product.html';
                }else{
                    alert(res.data.message);
                }
            }).catch((error) =>{
                console.log(error);
            })
        }
    },
}).mount('#app')

// Vue.createApp({
//     data(){
//         return{
//             url:'https://vue3-course-api.hexschool.io',
//             user:{
//                 username:'',
//                 password:'',
//             }
//         }
//     },
//     methods: {
//         login(){
//             const api = `${this.url}/admin/signin`
//             axios.post(api, this.user)
//             .then((res) => {
//                 if(res.data.success){
//                     const token = res.data.token;
//                     const expired = res.data.token; 
//                     document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
//                     window.location = 'product.html'
//                 }
//             }).catch((error) =>{
//                 console.log(error);
//             })
//         }
//     },
// }).mount('#app');