<template lang="pug">
  section.landing
    img.torch(src="../assets/shaker.svg")
    h1 Werewolf Village
    hr
    div(v-if="vNew")
      .form-group.row
        input.col-12.form-control(
          @keyup.enter="newGame"
          v-model="playerName"
          placeholder="Enter Your Name"
        )
      button.btn.b1.btn-light(@click="newGame" key="create") Create
      button.btn(@click="vNew = false") Back
    wolf-join(:code="code" :back="back" front v-else-if="vJoin")
    div(v-else)
      button.btn.b1.btn-light(@click="vNew = !vNew") New Village
      button.btn(@click="vJoin = !vJoin") Join Village
</template>

<script>
  import api from "../core/api"
  import Join from "../components/Join"

  export default {
    name: "landing",
    data: () => ({
      code: "",
      playerName: "",
      vNew: false,
      vJoin: false
    }),
    methods: {
      back() {
        this.vJoin = false
      },
      newGame() {
        this.$store.commit("reset")

        api.service("room").create({name: this.playerName}).then(room => {
          api.io.emit("room", room.id)
          this.$store.commit("setName", this.playerName)
          this.$store.commit("toggleHost", true)
          this.$store.commit("updateRoom", room)
          this.$router.push(`/${room.id}`)
        })
      }
    },
    components: {
      "wolf-join": Join
    }
  }
</script>

<style lang="scss" scoped>
  @import "../variables.scss";

  section.landing {
    margin: 4em auto 0 auto;
    text-align: center;
    max-width: 500px;

    padding: 3em 1em;
    // background: white;
    // box-shadow: 0 1px 1.5px 1px rgba(0, 0, 0, 0.12);
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.6em;
  }

  .torch {
    width: 6.5em;
    height: 6.5em;
    padding: 1em;
    background: white;
    border: 2px solid $primary;
    border-radius: 50%;
    margin-bottom: 2em;
    box-shadow: $zFlow;
  }
</style>
