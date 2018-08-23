<template lang="html">

  <form id="paypalform" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
  <input type="hidden" name="cmd" value="_s-xclick">
  <input type="hidden" name="hosted_button_id" value="KE36DSTUWT47E">

  <input type="hidden" name="first_name" :value="person.firstName">
  <input type="hidden" name="last_name" :value="person.lastName">
  <input type="hidden" name="address1" :value="person.address">
  <input type="hidden" name="city" :value="person.city">
  <input type="hidden" name="zip" :value="person.postalCode">
  <input type="hidden" name="night_phone_a" :value="person.phone">
  <input type="hidden" name="email" :value="person.email">
  <input type="hidden" name="custom" :value="person.email">

  <input type="hidden" name="on0" value="Membership">
  Membership
  <select name="os0">
  	<option value="Reduced">Reduced : 150,00 NOK - annualy</option>
  	<option value="Standard" selected="selected">Standard : 300,00 NOK - annualy</option>
  	<option value="Premium">Premium : 500,00 NOK - annualy</option>
  </select>
  <input type="hidden" name="currency_code" value="NOK">
  <input name="notify_url" value="https://emmasofia.herokuapp.com/subscription" type="hidden">
  </form>


</template>

<script>

export default {
  props: {
    person: Object,
  }
}

</script>
