module.exports = {
  vueTempleta: (componentName) => {
    return `
    <template>
      <div class="${componentName}">
        <img alt="Vue logo" src="../assets/logo.png">
      </div>
    </template>

    <script>
    export default {
      name: '${componentName}',
      data () {
        return {

        }
      },

      methods: {}
    }
    </script>

    <style lang='less' scoped>
    </style>
    `
  }
}