<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>
          <v-icon color="green">photo</v-icon>
        </span>
        <span class="font-weight-light"></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        to="/"
      >
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn
        flat
        to="/contact"
      >
        <span class="mr-2">Contact US</span>
      </v-btn>
      <v-btn
        flat
        to="/about"
      >
        <span class="mr-2">About US</span>
      </v-btn>
    </v-toolbar>

    <v-content>
        <carousel :perPage=countOfImg>
          <slide v-for="(item,i) in items" :key="i">
            <v-img :src="item.src" alt="" @click=onClick(item.name)></v-img>
          </slide>
        </carousel>
      <v-container fluid>
        <h4>Image name: {{imgSelected}}</h4>
        <router-view></router-view>
        <EmptyContent v-for="index in 10" :key="index"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import EmptyContent from './components/EmptyContent'
import { Carousel, Slide } from 'vue-carousel'

const COUNT_OF_IMG_FOR_MOBILE = 1
const COUNT_OF_IMG_FOR_PC = 3
const MOBILE_WIDTH = 700

export default {
  name: 'App',
  components: {
    EmptyContent,
    Carousel, Slide
  },
  data () {
    return {
      countOfImg: 0,
      imgSelected: '',
      countOfImagesForMobileDev: COUNT_OF_IMG_FOR_MOBILE,
      window: {
        width: 0
      },
      
      items: [
        {
          name: 'siema--pink 1',
          src: 'https://pawelgrzybek.com/siema/assets/siema--pink.svg'
        },
        {
          name: 'siema--yellow 2',
          src: 'https://pawelgrzybek.com/siema/assets/siema--yellow.svg'
        },
        {
          name: 'siema--pink 3',
          src: 'https://pawelgrzybek.com/siema/assets/siema--pink.svg'
        },
        {
          name: 'siema--yellow 4',
          src: 'https://pawelgrzybek.com/siema/assets/siema--yellow.svg'
        },
        {
          name: 'siema--pink 5',
          src: 'https://pawelgrzybek.com/siema/assets/siema--pink.svg'
        },
        {
          name: 'siema--yellow 6',
          src: 'https://pawelgrzybek.com/siema/assets/siema--yellow.svg'
        }
      ]
    }
  },
  
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    console.log(`width: ${this.window.width}`)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.setImgCount()
    },
    setImgCount(){
      if(this.window.width < MOBILE_WIDTH){
        this.countOfImg = COUNT_OF_IMG_FOR_MOBILE
      }
      else{
        this.countOfImg = COUNT_OF_IMG_FOR_PC
      }
    },
    onClick(imgName){
      this.imgSelected = imgName
    }
  }
}
</script>
