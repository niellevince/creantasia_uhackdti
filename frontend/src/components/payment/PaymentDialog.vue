<template>
    <v-dialog v-model="show" max-width="600" persistent>
        <v-card>
            <v-card-title class="mb-6">
                <h4 class="text-center" style="width: 100%">Payment</h4>
            </v-card-title>

            <v-card-text>
                <h3 class="mb-3">Choose Payment Method</h3>
                <v-card outlined class="mb-3">
                    <v-card-text>
                        <div class="d-flex align-center" style="max-height: 50px">
                            <div class="mr-3">
                                <v-img src="https://www.unionbankph.com/sites/default/files/inline-images/UBonline-logo.png" width="40" height="40"></v-img>
                            </div>
                            <div>
                                <h3 class="black--text">UnionBank</h3>
                                <span>Pay using your UnionBank account.</span>
                            </div>
                            <v-spacer></v-spacer>
                            <div>
                                <v-radio-group v-model="radioGroup" mandatory>
                                    <v-radio value="UnionBank" readonly></v-radio>
                                </v-radio-group>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
                <v-card outlined>
                    <v-card-text>
                        <div class="d-flex align-center" style="max-height: 50px">
                            <div class="mr-3">
                                <v-img src="https://www.pngitem.com/pimgs/m/13-130625_credit-card-rewards-star-ratings-payment-icon-credit.png" width="40" height="40" style="filter: grayscale(100%)"></v-img>
                            </div>
                            <div>
                                <h3 class="grey--text">Debit/Credit Card</h3>
                                <span>Coming soon</span>
                            </div>
                            <v-spacer></v-spacer>
                            <div>
                                <v-radio-group v-model="radioGroup" mandatory>
                                    <v-radio value="Card" disabled></v-radio>
                                </v-radio-group>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
                <br>
                <h3 class="mb-3">Details</h3>
                <div v-for="item in items">
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
                        <h3 class="black--text">{{currency.format(total)}}</h3>
                    </div>
                    <v-divider></v-divider>
                </div>
                <br>
                <p>By clicking the <span class="warning--text">PAY NOW</span> button below, you agree to the <span class="warning--text" style="cursor: pointer;">Terms and Conditions</span> and <span class="warning--text" style="cursor: pointer;">Privacy Policy</span>.</p>

            </v-card-text>

            <v-card-actions class="pa-6">
                <v-spacer></v-spacer>
                <v-btn @click="$emit('close')" text> CANCEL </v-btn>
                <v-btn color="warning" @click="$emit('pay')">PAY NOW </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['show', 'items', 'businessId', 'total'],
    data: () => ({
        radioGroup: 1,
    }),
    methods: {

    },
};
</script>

<style>

</style>