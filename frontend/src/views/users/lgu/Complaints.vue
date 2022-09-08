<template>
    <AppLayout :title="pageTitle">
        <v-container>
            <v-row class="justify-center justify-center mt-12">
                <v-col lg="10" class="text-center">
                    <v-card>
                        <v-card-title primary-title>
                            <div class="row">
                                <div class="col pr-0">
                                    <v-text-field v-model="search" placeholder="Search by complaint id, complainant, email, mobile, or category" outlined dense single-line hide-details style="border-radius: 8px" prepend-inner-icon="mdi-magnify"></v-text-field>
                                </div>
                                <div class=" col-auto">
                                    <v-btn color="blue darken-1" dark elevation="0" height="40" style="border-radius: 8px" class="mr-3" @click="complaintDialog = true">
                                        Add Complaint
                                    </v-btn>
                                    <!-- <v-btn color="success" dark elevation="0" height="40" style="border-radius: 8px">
                                        <v-icon>mdi-table</v-icon>
                                        <span class="mr-3">Export CSV</span>
                                    </v-btn> -->
                                </div>
                            </div>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="datas" :items-per-page="10" :search="search">
                            <template v-slot:item.updatedAt="{ item }">
                                {{ moment(item.updatedAt).format('MMM DD, YYYY - h:mm A') }}
                            </template>

                            <template v-slot:item.status="{ item }">
                                <v-chip color="pending" small>Pending</v-chip>
                            </template>

                            <template v-slot:item.items="{ item }">
                                <v-btn small icon @click="viewItem(item)">
                                    <v-icon>mdi-eye</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-dialog v-model="complaintDialog" max-width="600" persistent>
            <v-form v-model="valid" v-on:submit="saveForm" ref="form">
                <v-card>
                    <v-card-title class="mb-6">
                        <h4 class="text-center" style="width: 100%">Complaint</h4>
                    </v-card-title>

                    <v-card-text>
                        <v-text-field name="email" label="Email" v-model="formData.email" :rules="emailRules" required outlined :readonly="currentUser.role != 'user'"></v-text-field>
                        <v-text-field name="mobile" label="Mobile Number" v-model="formData.mobile" :rules="requiredRules" required outlined :readonly="currentUser.role != 'user'"></v-text-field>
                        <v-text-field name="category" label="Category" v-model="formData.category" :rules="requiredRules" required outlined :readonly="currentUser.role != 'user'"></v-text-field>
                        <v-text-field name="subject" label="Subject" v-model="formData.subject" :rules="requiredRules" required outlined :readonly="currentUser.role != 'user'"></v-text-field>
                        <v-text-field name="message" label="Message" v-model="formData.message" :rules="requiredRules" required outlined :readonly="currentUser.role != 'user'"></v-text-field>
                        <v-text-field name="files" label="Files" v-model="formData.files" :rules="requiredRules" required outlined :readonly="currentUser.role != 'user'"></v-text-field>
                    </v-card-text>

                    <v-card-actions class="pa-6">
                        <v-spacer></v-spacer>
                        <v-btn @click="complaintDialog=false" color="warning"> DONE </v-btn>
                        <v-btn @click="complaintDialog=false" color="success"> PRINT </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </AppLayout>
</template>

<script>
import AppLayout from "@/views/layouts/AppLayout.vue";
export default {
    components: { AppLayout },
    data: () => ({
        pageTitle: 'Complaints',
        search: null,
        complaintDialog: false,
        currentTransactionItem: {
            uid: {},
            merchant: {},
            paymentMethod: null,
            amount: null,
            items: [],
            ref: null,
            status: null,
        },
        headers: [
            { text: 'ID', value: 'Complaint ID' },
            { text: 'Complainant', value: 'uid' },
            { text: 'Email', value: 'email' },
            { text: 'Mobile', value: 'mobile' },
            { text: 'Category', value: 'category' },
            { text: 'Subject', value: 'subject' },
            { text: 'Message', value: 'message' },
            { text: 'Files', value: 'files' },
            { text: 'Date', value: 'updatedAt' },
        ],
        datas: [],
        confirmDialog: {
            show: false,
            title: 'Delete Draft',
            subtitle: 'Are you sure you want to delete this draft?',
            confirmText: 'Delete',
            confirmColor: 'error',
            onConfirm: () => { },
        },
        valid: false,

        //

        formData: {
            uid: null,
            email: null,
            mobile: null,
            category: null,
            subject: null,
            message: null,
            files: [],
        }
    }),
    methods: {
        viewItem(e) {
            xlog('View item')
            xlog(e);
            this.currentTransactionItem = e;
            this.complaintDialog = true;
        },
        async loadTransactions() {
            var data = {

            };

            if (this.currentUser.role == 'user') {
                data = {
                    uid: this.currentUser.id,
                }
            }

            xlog(data)
            var response = await this.post('/lgu/complaint/list', data);
            this.datas = response.data.transactions;
        },
        async saveForm(e) {
            e.preventDefault();
            if (this.$refs.form.validate()) {
                this.progressDialog.show = true;
                // var response = await this.post('/lgu/business/save', this.formData);
                // this.progressDialog.show = false;
                // if (response.status != 'success') {
                //     this.alertDialog.show = true;
                //     this.alertDialog.title = 'Oops!';
                //     this.alertDialog.subtitle = response.message;
                //     return;
                // }
                this.alertDialog = {
                    show: true,
                    title: 'Success',
                    subtitle: response.message,
                }
                this.loadBusiness()
            } else {
                this.alertDialog = {
                    show: true,
                    title: 'Wait!',
                    subtitle: 'Some field on the form are empty. Please fill up the required fields.',
                }
            }
        },
    },
    async mounted() {
        this.loadTransactions();
    }
};
</script>

<style scoped>
.theme--light.v-tabs-items {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
}
</style>