<style lang="scss">
</style>

<template lang="html">

  <main>

      <div class="hero">
      	<div class="hero__background"></div>
      	<div class="hero__wrapper">
          <div class="block --full">
      			<div class="hero__title --text-center">
      				<h1>Bli medlem i EmmaSofia</h1>
      			</div>
          </div>
      	</div>
      </div>

      <section class="block --mb-larger --mt-larger">
        <div class="container --narrow">

              <div class="membership__form">

                <div class="row">
                  <div class="col-xs-12 col-sm-6">
                    Fornavn
                    <input
                      v-validate="'required'"
                      :class="{error: errors.has('name')}"
                      type="text"
                      name="name"
                      class="input"
                      v-model="person.firstName"
                      required autofocus
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6">
                    Etternavn
                    <input
                      v-validate="'required'"
                      :class="{error: errors.has('last-name')}"
                      type="text"
                      name="last-name"
                      class="input"
                      v-model="person.lastName"
                      required
                    />
                  </div>
                </div>

                Fødselsdato
                <input
                  v-validate="'required'"
                  :class="{error: errors.has('birthday')}"
                  type="date"
                  name="birthday"
                  class="input"
                  v-model="person.birthday"
                  required
                />

                Epostadresse
                <input
                  v-validate="'required|email'"
                  :class="{error: errors.has('email')}"
                  type="email"
                  name="email"
                  class="input"
                  v-model="person.email"
                  required
                />

                Telefonnummer
                <input
                  v-validate="'required|numeric'"
                  :class="{error: errors.has('phone')}"
                  type="tel"
                  name="phone"
                  class="input"
                  v-model="person.phone"
                />

                Addresse
                <input
                  v-validate="'required'"
                  :class="{error: errors.has('address')}"
                  type="text"
                  name="address"
                  class="input"
                  v-model="person.address"
                />

                <div class="row">
                  <div class="col-xs-12 col-sm-8">
                    Sted
                    <input
                      v-validate="'required'"
                      :class="{error: errors.has('city')}"
                      type="text"
                      name="city"
                      class="input"
                      v-model="person.city"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4">
                    Postnummer
                    <input
                      v-validate="'required'"
                      :class="{error: errors.has('zip')}"
                      type="text"
                      name="zip"
                      class="input"
                      v-model="person.postalCode"
                    />
                  </div>
                </div>

                Land
                <select v-model="person.country">
                  <option v-for="country in countriesList" :value="country">{{country}}</option>
                </select>


                <label class="checkbox">
                  <input
                    type="checkbox"
                    name="active"
                    v-model="person.activeInOrg"
                    />
                    Jeg er aktiv i et studentlag
                    <i class="checkbox__indicator"></i>
                </label>

                <label for="org" v-if="person.activeInOrg">
                  Organisasjon
                  <select v-model="person.organization">
                    <option value="" disabled>Velg organisasjon</option>
                    <option value="EmmaSofia Studentlag">Emmasofia - Studentforening</option>
                    <option value="EmmaSofia Oslo">Emmasofia - Oslo studentlag</option>
                    <option value="EmmaSofia Bergen">Emmasofia - Bergen studentlag</option>
                    <option value="EmmaSofia Lillehammer">Emmasofia - Lillehammer studentlag</option>
                  </select>
                </label>

                <PayPalButton :person="person" />

                <div class="block --full --mt">
                  <button @click="handleSubmit" :disabled="loading" class="button --full --submit" >{{buttonText}}</button>
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
      loading: false,
      buttonText: 'Bli medlem',

      person: {
        email: null,
        firstName: null,
        lastName: null,
        birthday: null,
        phone: null,
        address: null,
        city: null,
        postalCode: null,
        country: 'Norway',
        activeInOrg: false,
        organization: "",
        planID: 'standard'
      }
    }
  },
  watch: {
    "person.activeInOrg": function (newVal, oldVal) {
      if (!newVal) {
        this.person.organization = "";
      }
    }
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
      this.buttonText = 'Oppretter medlemskap...';

      axios.post(`${serverURL}/member`, member)
        .then((res) => {
          console.log(res.data.message);
          this.buttonText = 'Venter på PayPal...';
          const form = document.getElementById('paypalform');
          form.submit();
        })
        .catch((error) => {
          this.loading = false;
          this.buttonText = 'Prøv på nytt';
          console.log(error)
        })
    }
  }
}

</script>
