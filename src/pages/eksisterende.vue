<style lang="scss">

.info {
  font-size: 1.5em;

  &__title {
    text-transform: uppercase;
    font-size: 0.6em;
    font-weight: 600;
    color: #4d2482;
  }
}

.loader {
  width: 60px;
  height: 60px;
  border: 4px solid #eee;
  border-radius: 50%;
  border-top: 4px solid #4d2482;
}

</style>

<template lang="html">

  <main>

      <div class="hero">
      	<div class="hero__background"></div>
      	<div class="hero__wrapper">
          <div class="block --full --pb-large">
      			<div class="hero__title --text-center">
      				<h1>Forny medlemskapet ditt i EmmaSofia</h1>
      			</div>
          </div>
      	</div>
      </div>

      <section class="block --pb-larger --pt-larger">
        <div class="container">

          <div class="spinner-wrapper" v-if="!person.email">
            <div class="spinner"><div class="loader"></div></div>
          </div>

          <div class="grid" v-else>

            <div class="grid__item --s-12 --m-6">

                <div class="block">

                  <h2 class="block --full --pb">Din informasjon</h2>

                  <div class="info">
                    <div class="info__title">Fornavn</div>
                    <p>{{person.firstName}}</p>
                  </div>
                  <div class="info">
                    <div class="info__title">Etternavn</div>
                    <p>{{person.lastName}}</p>
                  </div>
                  <div class="info">
                    <div class="info__title">Epost</div>
                    <p>{{person.email}}</p>
                  </div>
                  <div class="info">
                    <div class="info__title">Status på medlemskap</div>
                    <p>{{person.status}}</p>
                  </div>
                </div>

            </div>

            <div class="grid__item --s-12 --m-4">

              <div class="block --full --mb">
                  <div class="block">

                  <PayPalButton :person="person" v-if="person.email" />

                  <div class="block --full">
                    <button @click="handleSubmit" :disabled="loading" class="button --full --submit" >{{buttonText}}</button>
                  </div>

                  <div class="block --full --mt">
                    <button class="button --full --submit" @click="showSmsBox = !showSmsBox" >Betal via SMS</button>
                  </div>

                  <div class="block --mt --pb --pt --box-shadow" v-if="showSmsBox">
                    <h3>Send EMMASOFIA + {{person.email}} til 2090</h3>
                    <p>PS: Gjelder kun standardmedlemskap (300kr i året)</p>
                  </div>
                  </div>
              </div>

            </div>

          </div>

        </div>
      </section>
  </main>
</template>

<script>

import axios from 'axios'
import countries from './countries';
import PayPalButton from '../components/paypal-button.vue';

// Use heroku in production, localhost in dev mode. You need to run the node server locally to test
const serverURL = process.env.NODE_ENV === 'production' ?
'https://emmasofia.herokuapp.com' : 'http://localhost:5000';

export default {
  components: { PayPalButton },
  data () {
    return {
      countriesList: countries,
      showSmsBox: false,
      loading: false,

      person: {
        id: this.$route.params.id,
        email: '',
        firstName: '',
        lastName: '',
        status: '',
        planID: 'standard'
      }
    }
  },
  computed: {
    buttonText () {
      return this.loading ? 'Vent litt…' : 'Betal med PayPal'
    },
  },
  created(){
    axios.get(`${serverURL}/member/${this.person.id}`)
      .then(({data}) => {
        this.person.firstName = data.firstName;
        this.person.lastName = data.lastName;
        this.person.email = data.email;
        console.log(data);
        this.person.status = data.status === 'Active' ? 'Aktivt' : 'Inaktivt';
      })
      .catch((error) => {
        this.loading = false
      })

  },
  methods: {
    handleSubmit () {
      this.$validator.validateAll().then(result => {
        if(result) {
          const member = this.person;
          this.addMember(member);
        } else {
          alert('Sørg for at alle feltene er fylt ut riktig.')
        }
      });
    },
    addMember(member) {

      this.loading = true;

      const form = document.getElementById('paypalform');
      form.submit();

      this.loading = false
    }
  }
}

</script>
