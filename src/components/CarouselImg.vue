<template>
    <div>
        <v-carousel v-if="windowWidth < 700" :cycle=false :height=carouselHeight>
            <v-carousel-item v-for="(item,i) in items" :key="i">
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-img :src="item.src" alt="" @click=onItemClick(i)></v-img>
                    </v-flex>
                </v-layout>
            </v-carousel-item>
        </v-carousel>
        <v-carousel v-if="windowWidth >= 700" :cycle=false :height=carouselHeight>
            <v-carousel-item v-for="index in getImgMaxCountInCarousel()" :key="index">
                <v-layout row wrap>
                    <v-flex xs4 v-for="(item,j) in getSliceOfImgs(index)" :key="j">
                        <v-img :src="item.src" alt="" @click=onImgClick(index,j)></v-img>
                    </v-flex>
                </v-layout>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>

const COUNT_OF_IMG_FOR_MOBILE = 3
const MAX_IMG_WIDTH = 1000
const MAX_CAROUSEL_HEIGHT = 600
const MOBILE_WIDTH = 700
const ALERT_MSG_TEXT = 'position of Image:'

export default {
  name: 'Carousel',
  props: ['windowWidth'],
  data () {
    return {
      carouselHeight: 500,
      countOfImagesForMobileDev: COUNT_OF_IMG_FOR_MOBILE,
      
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
    this.setCarouselHeight(this.windowWidth)
  },
  methods: {
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
  },
  watch: {
    windowWidth(val) {
      this.setCarouselHeight(val)
    }
  }
}
</script>
