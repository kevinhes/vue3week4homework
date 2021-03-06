export default {
    props :['page'],
    template : `
    <nav aria-label="Page navigation example" class="d-flex justify-content-center">
    <ul class="pagination" >
      <li class="page-item" :class="{'disabled' : !page.has_pre}">
        <a class="page-link" href="#" aria-label="Previous" @click="$emit('get-data' , page.current_page -1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li  :class="{'active' : item === page.current_page}" class="page-item" v-for="item in page.total_pages" :key="item"><a class="page-link" href="#" @click="$emit('get-data' , item)"> {{item}} </a></li>
      <li class="page-item" :class="{'disabled' : !page.has_next}">
        <a class="page-link" href="#" aria-label="Next" @click="$emit('get-data' , page.current_page +1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
    `
}
