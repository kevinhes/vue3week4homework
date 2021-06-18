export default{
    props : ['page'],
    template : `
    <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" @click="$emit('get-data',page.current_page -1)" :class="{'disabled' : !page.has_pre}" ><a class="page-link" href="#">Previous</a></li>
      <li class="page-item" :class=" { 'active' : item === page.current_page } "
      v-for="item in page.total_pages" :key="item">
      <a class="page-link" href="#" @click="$emit('get-data',item)"> {{item}} </a>
      </li>
      <li class="page-item" @click="$emit('get-data',page.current_page+1)" :class="{'disabled' : !page.has_next}"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>`,
  created() {
      console.log(this.page);
      
  },
}