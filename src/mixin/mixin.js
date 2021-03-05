export const addScrollHeight = {
  mounted(){
    this.addBottom()
  },
  activated() {
    this.addBottom()
  },
  methods:{
    addBottom(){
      console.log("You must have a addBottom method in basic component")
    }
  }
}
