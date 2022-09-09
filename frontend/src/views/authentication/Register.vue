<template>
    <Guest class="register fill-height">
        <v-container class="px-6 fill-height">
            <v-row justify="center" align-items="center">
                <v-col xl="4" lg="6" md="6" sm="8">
                    <v-card class="pa-6">
                        <v-card-text>
                            <h1 class="h1 text-center mb-6">Create Account</h1>
                            <p class="text-center">
                                Create an account in {{appName}} by filling up the form below.
                            </p>
                            <v-form v-model="valid" v-on:submit="register" ref="form">
                                <v-text-field name="email" label="E-mail" v-model="email" :rules="emailRules" required outlined></v-text-field>
                                <v-text-field name="password" label="Password" v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" required outlined></v-text-field>
                                <v-text-field name="password_confirmation" label="Confirmation Password" v-model="passwordConfirmation" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordConfirmationRules" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" required outlined></v-text-field>

                                <v-btn style="border-radius: 8px" color="black" dark block large elevation="0" type="submit">Register</v-btn>
                                <p class="text-center my-3">or</p>
                                <v-btn style="border-radius: 8px" color="black" dark block large elevation="0" outlined type="submit" to="/">Login</v-btn>
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
        appName: null,
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
        showPassword: false,
        passwordConfirmation: "",
        passwordConfirmationRules: [],
    }),
    methods: {
        async register(e) {
            e.preventDefault();
            if (this.$refs.form.validate()) {
                this.progressDialog.show = true;

                var response = await this.post('/register/email', {
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
                if (process.env.VUE_APP_DEVELOPMENT == 'true') localStorage.token = response.data.token;
                this.$router.push({ name: 'home' })
            }
        },
    },
    watch: {
        password(pass) {
            this.passwordConfirmationRules = [
                (v) => !!v || "Password is required",
                (v) => v.length >= 8 || "Min 8 characters",
                (v) => {
                    if (v != pass) {
                        return 'Password confirmation is incorrect.';
                    }
                    return true;
                },
            ];
        }
    },
    mounted() {
        this.appName = process.env.VUE_APP_NAME;
        this.passwordConfirmationRules = [
            (v) => !!v || "Password is required",
            (v) => v.length >= 8 || "Min 8 characters",
            (v) => {
                if (v != this.passwordConfirmation) {
                    return 'Password confirmation is incorrect.';
                }
                return true;
            },
        ];
    },
    components: {
        Guest,
        AlertDialog,
        ProgressDialog
    },
};
</script>