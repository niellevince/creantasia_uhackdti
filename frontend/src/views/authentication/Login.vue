<template>
    <Guest class="login fill-height">
        <v-container class="px-6 fill-height">
            <v-row justify="center" align-items="center">
                <v-col xl="4" lg="6" md="6" sm="8">
                    <v-card class="pa-6">
                        <v-card-text>
                            <div class="mb-5">
                                <!-- <v-img alt="Vuetify Logo" contain src="@/assets/logo.png" transition="scale-transition" width="200px" class="mx-auto" style="border-radius: 12px" /> -->
                                <h1 class="text-center orange--text">UHackDTI</h1>
                            </div>
                            <h2 class="h2 text-center mb-6">Sign in</h2>
                            <p class="text-center">
                                Sign in as admin using your login credentials.
                            </p>
                            <v-form v-model="valid" v-on:submit="login" ref="form">
                                <v-text-field name="email" label="E-mail" v-model="email" :rules="emailRules" required outlined></v-text-field>
                                <v-text-field name="password" label="Password" v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show ? 'text' : 'password'" @click:append="show = !show" required outlined></v-text-field>

                                <v-btn style="border-radius: 8px" color="black" dark block large elevation="0" type="submit">Login</v-btn>
                                <p class="text-center my-3">or</p>
                                <v-btn style="border-radius: 8px" color="black" dark block large elevation="0" outlined type="submit" to="/register">Register</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <AlertDialog :show="alertDialog.show" :title="alertDialog.title" :subtitle="alertDialog.subtitle" @close="alertDialog.show = false"></AlertDialog>
        <ProgressDialog :show="progressDialog.show" :title="progressDialog.title"></ProgressDialog>
    </Guest>
</template>

<script>
import Guest from "../layouts/GuestLayout.vue";
import AlertDialog from "@/components/dialogs/AlertDialog.vue";
import ProgressDialog from "@/components/dialogs/ProgressDialog.vue";
export default {
    data: () => ({
        alertDialog: {
            show: false,
            title: '',
            subtitle: '',
        },
        progressDialog: {
            show: false,
            title: 'Logging in'
        },
        valid: true,
        email: "",
        password: "",
        show: false,
    }),
    methods: {
        async login(e) {
            e.preventDefault();
            if (this.$refs.form.validate()) {
                this.progressDialog.show = true;
                var response = await this.post('/login', {
                    email: this.email,
                    password: this.password,
                });
                this.progressDialog.show = false;
                if (response.status != 'success') {
                    this.alertDialog.show = true;
                    this.alertDialog.title = 'Oops!';
                    this.alertDialog.subtitle = response.message;
                    return;
                }
                this.$store.state.token = response.data;
                if (process.env.VUE_APP_DEVELOPMENT == 'true') localStorage.token = response.data;
                this.$router.push({ name: 'home' })
            }
        },
    },
    components: {
        Guest,
        AlertDialog,
        ProgressDialog
    },
};
</script>