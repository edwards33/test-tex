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
      <CarouselImg :window-width=window.width />
      
      <v-container fluid>
        <router-view></router-view>
        <EmptyContent v-for="index in 10" :key="index"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import EmptyContent from './components/EmptyContent'
import CarouselImg from './components/CarouselImg'

const COUNT_OF_IMG_FOR_MOBILE = 3
const MAX_IMG_WIDTH = 1000
const MAX_CAROUSEL_HEIGHT = 600
const MOBILE_WIDTH = 700
const ALERT_MSG_TEXT = 'position of Image:'

export default {
  name: 'App',
  components: {
    EmptyContent,
    CarouselImg
  },
  data () {
    return {
      carouselHeight: 500,
      countOfImagesForMobileDev: COUNT_OF_IMG_FOR_MOBILE,
      window: {
        width: 0
      },
      
      items: [
        {
          src: 'https://pawelgrzybek.com/siema/assets/siema--pink.svg'
        },
        {
          src: 'https://pawelgrzybek.com/siema/assets/siema--yellow.svg'
        },
        {
          src: 'https://pawelgrzybek.com/siema/assets/siema--pink.svg'
        },
        {
          src: 'https://pawelgrzybek.com/siema/assets/siema--yellow.svg'
        },
        {
          src: 'https://pawelgrzybek.com/siema/assets/siema--pink.svg'
        },
        {
          src: 'https://pawelgrzybek.com/siema/assets/siema--yellow.svg'
        }
      ]
    }
  },
  
  created() {
    //this.getCarouselHeight()
    
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
      //this.setCarouselHeight(this.window.width)
    },
    onItemClick(index){
      alert(`${ALERT_MSG_TEXT} ${index + 1}`)
    },
    onImgClick(col, index){
      alert(`${ALERT_MSG_TEXT} ${(col - 1) * COUNT_OF_IMG_FOR_MOBILE + index + 1}`)
    },
    getImgMaxCountInCarousel(){
      var countOfImg = this.items.length / COUNT_OF_IMG_FOR_MOBILE
      return countOfImg
    },
    getSliceOfImgs(index) {
      var sliceOfImgs = this.items.slice(index, index + this.countOfImagesForMobileDev)
      
      console.log(sliceOfImgs)
      
      return sliceOfImgs;
    },
    setCarouselHeight (widthOfWindow) {
      if(widthOfWindow >= MAX_IMG_WIDTH){
        this.carouselHeight = MAX_CAROUSEL_HEIGHT * (widthOfWindow / MAX_IMG_WIDTH) / COUNT_OF_IMG_FOR_MOBILE
      }
      else{
        if(widthOfWindow < MAX_IMG_WIDTH){
          this.carouselHeight = MAX_CAROUSEL_HEIGHT / ((MAX_IMG_WIDTH / widthOfWindow) * COUNT_OF_IMG_FOR_MOBILE)
        }
        if(widthOfWindow < MOBILE_WIDTH){
          this.carouselHeight = MAX_CAROUSEL_HEIGHT / (MAX_IMG_WIDTH / widthOfWindow)
        }
      }
    }
  }
}
</script>
