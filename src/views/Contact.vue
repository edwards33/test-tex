<template>
    <div>
        <v-alert
          v-if="!loading && message.length > 0"
          v-model="alert"
          dismissible
          type="success"
        >
          {{message}}
        </v-alert>
        <v-progress-linear v-show="loading" :indeterminate="true"></v-progress-linear>
        <v-form v-show="!loading" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="3"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              :mask="mask"
              v-model="phone"
              :rules="phoneRules"
              label="Phone"
              required
            ></v-text-field>
            <v-textarea
              :rules="messageRules"
              label="Message"
              v-model="messageModel"
            ></v-textarea>
            <v-btn
              :disabled="!valid"
              @click="submit"
            >
              submit
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
        </v-form>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data: () => ({
      alert: false,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 3) || 'Name must be longer than 2 characters'
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'Phone is required',
        v => /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(v) || 'Phone must be valid'
      ],
      mask: 'phone',
      messageModel: '',
      messageRules: [
        v => !!v || 'Message is required',
        v => (v && v.length <= 250) || 'Name must be less than 250 characters'
      ],
    }),
    computed: {
        ...mapState('ContactModule', ['loading', 'message']),
    },

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          
          this.alert = true
          
          this.$store.dispatch('ContactModule/contactUs', {
                name: this.name,
                phone: this.phone,
                message: this.message
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
