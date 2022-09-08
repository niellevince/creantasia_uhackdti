<template>
    <AppLayout :title="pageTitle">
        <v-container>
            <v-row class="justify-center justify-center mt-12">
                <v-col lg="10" class="text-center">
                    <v-card>
                        <v-card-title primary-title>
                            <div class="row">
                                <div class="col pr-0">
                                    <v-text-field v-model="search" placeholder="Reference ID, payer, payment method, or merchant" outlined dense single-line hide-details style="border-radius: 8px" prepend-inner-icon="mdi-magnify"></v-text-field>
                                </div>
                                <div class=" col-auto">
                                    <v-btn color="blue darken-1" dark elevation="0" height="40" style="border-radius: 8px" class="mr-3">
                                        Search
                                    </v-btn>
                                    <v-btn color="success" dark elevation="0" height="40" style="border-radius: 8px">
                                        <v-icon>mdi-table</v-icon>
                                        <span class="mr-3">Export CSV</span>
                                    </v-btn>
                                </div>
                            </div>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="datas" :items-per-page="10" :search="search">
                            <template v-slot:item.paymentMethod="{ item }">
                                UnionBank
                            </template>
                            <template v-slot:item.amount="{ item }">
                                {{currency.format(item.amount)}}
                            </template>

                            <template v-slot:item.createdAt="{ item }">
                                {{ moment(item.createdAt).format('MMM DD, YYYY') }}
                            </template>

                            <template v-slot:item.status="{ item }">
                                <v-chip color="success" small>Complete</v-chip>
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

        <v-dialog v-model="invoiceDialog" max-width="600" persistent>
            <v-card>
                <v-card-title class="mb-6">
                    <h4 class="text-center" style="width: 100%">Invoice</h4>
                </v-card-title>

                <v-card-text>
                    <h4 class="mb-3">Payment Method</h4>
                    <v-card outlined class="mb-3">
                        <v-card-text>
                            <div class="d-flex align-center" style="max-height: 50px">
                                <div class="mr-3">
                                    <v-img src="https://www.unionbankph.com/sites/default/files/inline-images/UBonline-logo.png" width="40" height="40"></v-img>
                                </div>
                                <div>
                                    <h3 class="black--text">UnionBank</h3>
                                    <span>Paid using UnionBank account.</span>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                    <br>
                    <h3 class="mb-3">Office</h3>
                    <div class="font-weight-bold">{{currentTransactionItem.merchant.fullname}}</div>
                    <br>
                    <h3 class=" mb-3">Details</h3>
                    <div v-for="item in currentTransactionItem.items">
                        <div class="d-flex py-3">
                            <div class="font-weight-medium">{{item.name}}</div>
                            <v-spacer></v-spacer>
                            <div class="font-weight-medium">{{currency.format(item.price)}}</div>
                        </div>
                        <v-divider></v-divider>
                    </div>
                    <div>
                        <div class="d-flex py-3">
                            <div class="font-weight-bold black--text">Total Amount</div>
                            <v-spacer></v-spacer>
                            <h3 class="black--text">{{currency.format(currentTransactionItem.amount)}}</h3>
                        </div>
                        <v-divider></v-divider>
                    </div>
                    <br>


                </v-card-text>

                <v-card-actions class="pa-6">
                    <v-spacer></v-spacer>
                    <v-btn @click="invoiceDialog=false" color="warning"> DONE </v-btn>
                    <v-btn @click="invoiceDialog=false" color="success"> PRINT </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </AppLayout>
</template>

<script>
import AppLayout from "@/views/layouts/AppLayout.vue";
export default {
    components: { AppLayout },
    data: () => ({
        pageTitle: 'Transactions',
        search: null,
        invoiceDialog: false,
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
            { text: 'Reference ID', value: 'ref' },
            { text: 'Paid by', value: 'uid.fullname' },
            { text: 'Payment Method', value: 'paymentMethod' },
            { text: 'Office', value: 'merchant.fullname' },
            { text: 'Amount', value: 'amount' },
            { text: 'Status', value: 'status', sortable: false, },
            { text: 'Date', value: 'createdAt' },
            { text: 'Invoice', value: 'items', sortable: false, align: 'right', filterable: false },
            // { text: 'id', value: 'ref'},
        ],
        datas: [],
        confirmDialog: {
            show: false,
            title: 'Delete Draft',
            subtitle: 'Are you sure you want to delete this draft?',
            confirmText: 'Delete',
            confirmColor: 'error',
            onConfirm: () => { },
        }
    }),
    methods: {
        viewItem(e) {
            xlog('View item')
            xlog(e);
            this.currentTransactionItem = e;
            this.invoiceDialog = true;
        },
        async loadTransactions() {
            var data = {
                uid: this.currentUser.id,
            };

            if (this.currentUser.role != 'user') {
                data = {
                    merchant: this.currentUser.id,
                }
            }

            xlog(data)
            var response = await this.post('/transactions/list', data);
            this.datas = response.data.transactions;
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