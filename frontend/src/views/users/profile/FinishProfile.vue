<template>
    <Guest class="saveProfile fill-height">
        <v-container class="px-6 fill-height">
            <v-row justify="center" align-items="center">
                <v-col xl="4" lg="6" md="6" sm="8">
                    <v-card class="pa-6">
                        <v-card-text>
                            <h1 class="h1 mb-6">Finish Profile</h1>
                            <p>
                                Finish registering by completing your personal info below.
                            </p>
                            <v-form v-model="valid" v-on:submit="saveProfile" ref="form">
                                <v-text-field name="firstname" label="First Name" v-model="firstname" :rules="requiredRules" required outlined></v-text-field>
                                <v-text-field name="middlename" label="Middle Name (optional)" v-model="middlename" outlined></v-text-field>
                                <v-text-field name="lastname" label="Last Name" v-model="lastname" :rules="requiredRules" required outlined></v-text-field>
                                <v-btn style="border-radius: 8px" color="black" dark block large elevation="0" type="submit">Done</v-btn>
                                <div class="text-center mt-6">
                                    <v-btn color="error" text @click="logout">Log out</v-btn>
                                </div>
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
import Guest from "../../layouts/GuestLayout.vue";
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

        firstname: '',
        middlename: '',
        lastname: '',
    }),
    methods: {
        async saveProfile(e) {
            e.preventDefault();
            if (this.$refs.form.validate()) {
                this.progressDialog.show = true;
                var response = await this.post('/user/update', {
                    firstname: this.firstname,
                    middlename: this.middlename,
                    lastname: this.lastname,
                });
                this.progressDialog.show = false;
                if (response.status != 'success') {
                    this.alertDialog.show = true;
                    this.alertDialog.title = 'Oops!';
                    this.alertDialog.subtitle = response.message;
                    return;
                }
                this.$store.state.currentUser = response.data;
                this.$router.push('/businesses');
            }
        },
    },
    mounted() {

    },
    components: {
        Guest,
        AlertDialog,
        ProgressDialog
    },
};
</script>