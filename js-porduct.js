import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import pagination from './pagination.js'

let productModal = ''
let delProductModal = ''

const app = createApp({
    components : {
        pagination
    },
    data() {
        return {
            apiUrl : 'https://vue3-course-api.hexschool.io/api',
            apiPath : 'kevinhes-apistudy',
            tempProduct : {
                imagesUrl :[],
            },
            productsData : [],
            isNew : false,
            pagination : {},
            

        }
    },
    methods: {
        getData(page = 1){
            axios.get(`${this.apiUrl}/${this.apiPath}/admin/products?page=${page}`)
            .then ((res) => {    
                if(res.data.success){
                    console.log(res.data);
                    this.pagination =res.data.pagination
                    this.productsData = res.data.products   
                }else{
                    alert(res.data.message)
                }
            })

        },
        openModal(isNew,item){
            if(isNew === 'new') {
                this.tempProduct = {
                    imagesUrl : []
                };
                this.isNew = true;
                productModal.show();
            }else if(isNew === 'edit'){
                this.tempProduct = { ...item };
                this.isNew = false;
                productModal.show();
            }else if(isNew === 'delete'){
                this.tempProduct = { ...item };
                delProductModal.show()
            }
        },
        updateProduct(){
            let url = `${this.apiUrl}/${this.apiPath}/admin/product`
            let methods = 'post'

            if(this.isNew === false){
                url = `${this.apiUrl}/${this.apiPath}/admin/product/${this.tempProduct.id}`
                methods = 'put'
            }

            axios[methods](url,{data : this.tempProduct})
            .then((res) =>{
                if(res.data.success){
                    alert(res.data.message)
                    productModal.hide()
                    this.getData()
                }else{
                    alert(res.data.message)
                }
            })
        },
        delProduct(){
            let url = `${this.apiUrl}/${this.apiPath}/admin/product/${this.tempProduct.id}`

            axios.delete(url)
            .then((res) =>{
                if(res.data.success){
                    alert(res.data.message)
                    delProductModal.hide();
                    this.getData()
                }else{
                    alert(res.data.message)
                }
            })
        },
        createImage (){
            this.tempProduct.imagesUrl = []
        }
    },
    mounted() {
        const token =  document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        if(token ===''){
            alert('您尚未登陸，請再試一次')
            window.location = 'index.html'
        }
        axios.defaults.headers.common.Authorization = token;
        this.getData()

        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
          })

          delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
          })
    }

    })

    app.mount('#app')