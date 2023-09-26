<template>
  <div class="container mt-10 mb-10">
    <div class="columns is-multiline pt-3 mt-10">
      <div class="column is-half">
        <o-field class="pb-3" :label-position="'on-border'" label="Your Name">
          <o-input v-model="details.submittedBy" maxlength="50" icon="signature" icon-pack="fad"></o-input>
        </o-field>
      </div>
      <div class="column is-half">
        <o-field class="pb-3" :label-position="'on-border'" label="Your Email">
          <o-input v-model="details.submittedByEmail" maxlength="50" type="email" icon="at" icon-pack="fad"></o-input>
        </o-field>
      </div>
      <div class="column is-12">
        <h2 class="is-size-5">Car Details:</h2>
      </div>
      <div class="column is-half">
        <o-field class="pb-3" :label-position="'on-border'" label="Model Year">
          <o-input v-model="details.year" icon="calendar" icon-pack="fad" :placeholder="'1960'"></o-input>
        </o-field>
        <o-field class="pb-3" :label-position="'on-border'" label="Model">
          <o-input v-model="details.model" icon="car" icon-pack="fad" :placeholder="'Morris Mini'"></o-input>
        </o-field>
        <o-field class="pb-3" :label-position="'on-border'" label="Trim">
          <o-input v-model="details.trim" icon="scissors" icon-pack="fad" :placeholder="'ex. Minor'"></o-input>
        </o-field>
        <o-field label="Select a date">
          <o-datepicker
            v-model="details.buildDate"
            placeholder="Click to select..."
            icon-pack="fad"
            icon="calendar-lines-pen"
            trap-focus
          />
        </o-field>
        <o-field class="pb-3" :label-position="'on-border'" label="Body Type">
          <o-select
            icon="cars"
            icon-pack="fad"
            placeholder="Select your style"
            v-model="details.bodyType"
            :expanded="true"
          >
            <option value="Saloon">Saloon</option>
            <option value="Pickup">Pickup</option>
            <option value="Estate">Estate</option>
            <option value="Clubman">Clubman</option>
            <option value="Contryman">Contryman</option>
            <option value="Van">Van</option>
            <option value="Hornet">Hornet</option>
          </o-select>
        </o-field>
      </div>
      <div class="column is-half">
        <o-field class="pb-3" :label-position="'on-border'" label="Engine Size">
          <o-input v-model="details.engineSize" icon="engine" icon-pack="fad" :placeholder="'ex. 1293'"></o-input>
        </o-field>
        <o-field class="pb-3" :label-position="'on-border'" label="Factory Color">
          <o-input v-model="details.color" icon="palette" icon-pack="fad" :placeholder="'ex. Clipper Blue'"></o-input>
        </o-field>
        <o-field class="pb-3" :label-position="'on-border'" label="Body Number">
          <o-input v-model="details.bodyNum" icon="hashtag" icon-pack="fad" :placeholder="'ex. GB190fW'"></o-input>
        </o-field>
        <o-field label="Engine Number">
          <o-input v-model="details.engineNum" icon="hashtag" icon-pack="fad" :placeholder="'ex. 12H4102'"></o-input>
        </o-field>
        <o-field label="Unique ID">
          <o-input v-model="details.uniqueId" icon="hashtag" icon-pack="fad" :placeholder="'ex. 12H4102'"></o-input>
        </o-field>
      </div>
      <div class="column is-12">
        <o-field :label-position="'on-border'" label="Special Notes">
          <o-input
            v-model="details.notes"
            maxlength="200"
            type="textarea"
            :placeholder="'ex. This car was only produced from 1959 to 1960'"
          ></o-input>
        </o-field>
      </div>
      <div class="column is-12">
        <o-field :label-position="'on-border'" label="Password">
          <o-input v-model="password" type="password" password-reveal></o-input>
        </o-field>
      </div>
    </div>
    <div>
      <o-button class="card-footer-item" label="Submit" variant="primary" size="medium" @click="submit()" />
    </div>
  </div>
</template>
<script lang="ts">
  import axios from 'axios';

  export default defineComponent({
    data() {
      return {
        details: {
          uniqueId: '',
          year: '',
          model: '',
          trim: '',
          bodyType: '',
          engineSize: '',
          color: '',
          bodyNum: '',
          engineNum: '',
          buildDate: [],
          notes: '',
          submittedBy: '',
          submittedByEmail: '',
        },
        password: '',
      };
    },
    methods: {
      async submit() {
        await axios
          .post('/api/registry/save', {
            details: {
              uniqueId: this.details.uniqueId,
              year: Number(this.details.year),
              model: this.details.model,
              trim: this.details.trim,
              bodyType: this.details.bodyType,
              engineSize: this.details.engineSize,
              color: this.details.color,
              bodyNum: this.details.bodyNum,
              engineNum: this.details.engineNum,
              buildDate: this.details.buildDate,
              notes: this.details.notes,
              submittedBy: this.details.submittedBy,
              submittedByEmail: this.details.submittedByEmail,
            },
            password: this.password,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.error(err);
          });
      },
    },
  });
</script>
