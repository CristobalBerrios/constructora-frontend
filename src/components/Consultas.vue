<template>
  <section>
    <v-flex xs12 offset-md1 md10 offset-lg1 lg10>
      <v-card class="card teal darken-1 white--text">
      <h4>Habla con nosotros!</h4>
      <div class="chat">
        <v-layout class="message" row v-for="message in messages" :key="message.id">
        <v-flex offset-xs7 xs5 v-if="message.isClient">
          <v-text-field
            label="Tu"
            color="teal darken-1"
            v-model="message.text"
            box
            full-width
            readonly>
          </v-text-field>
        </v-flex>
        <v-flex xs5 v-else>
          <v-text-field
            label="Bot"
            color="teal darken-1"
            v-model="message.text"
            :rows="message.rows"
            box
            multi-line
            readonly>
          </v-text-field>
        </v-flex>
      </v-layout>
      </div>
      <v-layout row>
        <v-flex xs11>
          <v-text-field
            label="Escribe tus dudas"
            color="teal darken-1"
            v-model="message.query"
            box>
          </v-text-field>
        </v-flex>
        <v-flex xs1>
          <v-btn @click="submitMessage(message)" class="btnSubmit" fab dark>
            <v-icon dark>send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
  </v-card>
    </v-flex>
  </section>
</template>
<script>
import {consultaService} from '@/services/Consulta.service'
export default {
  data () {
    return {
      messages: [],
      message: {}
    }
  },
  methods: {
    submitMessage (message) {
      let newMessage = {}
      newMessage.id = this.messages.length + 1
      newMessage.text = message.query
      newMessage.isClient = true
      this.messages.push(newMessage)
      newMessage = {}
      consultaService.save(message).then(data => {
        newMessage.id = this.messages.length + 1
        newMessage.text = data.body.result.fulfillment.speech
        newMessage.isClient = false
        if (newMessage.text.length < 30) {
          newMessage.rows = 1
        } else {
          newMessage.rows = Math.round(newMessage.text.length / 30)
        }
        this.messages.push(newMessage)
      })
      this.message = {}
    }
  }
}
</script>

<style scoped>
  .card {
    padding: 10px;
    margin-top: 10px;
  }

  .chat {
    height: 300px;
    max-height: 300px;
    overflow-y: auto;
    padding: 5px;
  }
  
  .btnSubmit {
    margin-top: 15px;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }
 
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
  }
 
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color:white;
    outline: 1px solid slategrey;
  }
</style>

