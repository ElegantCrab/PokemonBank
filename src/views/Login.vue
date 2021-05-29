<template>
  <v-row>
      <v-container fluid>
          <v-row dense justify="center" class="mt-16 mb-10">
              <v-col cols="4" sm="5" md="4" lg="3">
                <v-img width="400" class="logo"
                 transition="scale-transition"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png">
                </v-img>
              </v-col>
          </v-row>
          <v-row dense align="center" justify="center">
        <v-col cols="12" sm="8" md="5" lg="5">
          <v-card class="mt-12">
            <v-toolbar color="primary">
                <v-img
                    alt="Pokeball"
                  class="shrink mr-2"
                  contain
                  src="https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png"
                  transition="scale-transition"
                  width="40"
                />
                <v-img
                    width="80"
                    transition="scale-transition"
                    class="shrink"
                    src="https://fontmeme.com/permalink/210529/75f169fad9ad216683d41c283f62bcfb.png"
                >    
                </v-img>
              <!-- <v-toolbar-title class="ml-3" style="font-weight: 600">Login</v-toolbar-title> -->
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
              <v-text-field
                v-model="nombreUsuario"
                autofocus
                color="accent"
                label="Nombre de Usuario"
                prepend-icon="person"
                required
                v-on:keyup.enter="ingresar"
              ></v-text-field>
              <v-text-field
                v-model="password"
                prepend-icon="lock"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                color="accent"
                :type="show1 ? 'text' : 'password'"
                label="Contraseña"
                required
                v-on:keyup.enter="ingresar"
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-flex class="red--text" v-if="error">{{error}}</v-flex>
            </v-card-text>
            <v-card-actions class="px-3 pb-3">
              <v-flex text-xs-right>
                <v-btn @click="ingresar" color="primary" style="color: black; font-weight: 500">
                    Ingresar
                </v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      </v-container>
  </v-row>
</template>

<script>
export default {
 name: "Login",
 computed: {
     logged(){
         return false;
     }
 }
}
</script>

<style>
    .logo {
        margin-top: 60px !important;
    }
</style>