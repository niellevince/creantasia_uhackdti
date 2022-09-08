<template>
    <AppLayout :title="pageTitle">
        <v-container>
            <v-row class="justify-center justify-center mt-12">
                <v-col lg="10" class="text-center">
                    <v-card>
                        <v-card-title primary-title>
                            <div class="row">
                                <div class="col pr-0">
                                    <v-text-field v-model="search" placeholder="Search business name or business owner" outlined dense single-line hide-details style="border-radius: 8px" prepend-inner-icon="mdi-magnify"></v-text-field>
                                </div>
                                <div class=" col-auto">
                                    <v-btn color="blue darken-1" dark elevation="0" height="40" style="border-radius: 8px" class="mr-3">
                                        Search
                                    </v-btn>
                                    <v-btn color="success" dark elevation="0" height="40" style="border-radius: 8px" @click="addBusiness" v-if="currentUser.role == 'user'">
                                        Add Business
                                    </v-btn>
                                </div>
                            </div>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="datas" :items-per-page="10" :search="search">
                            <template v-slot:item.owner="{ item }">
                                {{`${item.ownerFirstName} ${item.ownerLastName}`}}
                            </template>

                            <template v-slot:item.status="{ item }">
                                <v-chip color="cyan" dark v-if="item.status == '1'">Draft</v-chip>
                                <v-chip color="cyan" dark v-if="item.status == '2'">Steps 4 of 8</v-chip>
                                <v-chip color="cyan" dark v-if="item.status == '3'">Steps 5 of 8</v-chip>
                                <v-chip color="cyan" dark v-if="item.status == '4'">Steps 5 of 8</v-chip>
                                <v-chip color="cyan" dark v-if="item.status == '5'">Steps 6 of 8</v-chip>
                                <v-chip color="cyan" dark v-if="item.status == '6'">Steps 6 of 8</v-chip>
                                <v-chip color="cyan" dark v-if="item.status == '7'">Steps 7 of 8</v-chip>
                                <v-chip color="cyan" dark v-if="item.status == '8'">Steps 7 of 8</v-chip>
                                <v-chip color="success" dark v-if="item.status == '9'" small>Business Verified ✔</v-chip>
                            </template>

                            <template v-slot:item.updatedAt="{ item }">
                                {{ moment(item.updatedAt).format('MMM DD, YYYY - h:mm A') }}
                            </template>

                            <template v-slot:item.actions="{ item }">
                                <v-menu left rounded="lg" min-width="100">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" icon>
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list dense>
                                        <v-list-item @click="viewItem(item)">
                                            <v-list-item-title>View Form</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item @click="deleteItem(item)" v-if="item.status == '1'">
                                            <v-list-item-title>Delete Draft</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-dialog v-model="businessFormDialog" persistent max-width="1200">
            <BusinessForm :id="currentBusinessId" @close="businessFormDialog=false; loadBusinesses()" :showing="businessFormDialog" visibility="private"></BusinessForm>
        </v-dialog>

        <ConfirmDialog :show="confirmDialog.show" :title="confirmDialog.title" :subtitle="confirmDialog.subtitle" :confirmText="confirmDialog.confirmText" @close="confirmDialog.show=false" @confirm="confirmDialog.onConfirm"></ConfirmDialog>
    </AppLayout>
</template>

<script>
import AppLayout from "@/views/layouts/AppLayout.vue";
import BusinessForm from "./BusinessForm.vue";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";
export default {
    components: { AppLayout, BusinessForm, ConfirmDialog },
    data: () => ({
        pageTitle: 'My Businessess',
        search: null,
        headers: [
            // { text: 'ID', value: 'id' },
            { text: 'Business Name', value: 'name' },
            { text: 'Nature of Business', value: 'nature' },
            { text: 'Owner', value: 'ownerFullName' },
            { text: 'Status', value: 'status' },
            { text: 'Updated at', value: 'updatedAt' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'right' },
        ],
        datas: [],
        businessFormDialog: false,
        currentBusinessId: null,
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
            this.currentBusinessId = e.id;
            this.businessFormDialog = true;
        },
        editItem(e) {
            xlog('Edit item')
            this.currentClassroom = e;
            this.viewItemDialog = true;
        },
        async deleteItem(e) {
            xlog('Deleting item')
            this.confirmDialog = {
                show: true,
                title: 'Delete Draft',
                subtitle: 'Are you sure you want to delete this draft?',
                confirmText: 'Delete',
                confirmColor: 'error',
                onConfirm: async () => {
                    var response = await this.post('/lgu/business/save', {
                        id: e.id,
                        status: null,
                    });
                    this.loadBusinesses();
                    this.confirmDialog.show = false;
                },
            }
        },
        async loadBusinesses() {
            var data = {
                status: { $ne: null },
            };

            if (this.currentUser.role == 'user') {
                data.uid = this.currentUser.id;
            } else {
                if (this.currentUser.email.includes('dti')) {
                    data.status = '2';
                } else if (this.currentUser.email.includes('barangay')) {
                    data.status = '4';
                } else if (this.currentUser.email.includes('cityhall')) {
                    data.status = '6';
                } else if (this.currentUser.email.includes('bir')) {
                    data.status = '8';
                } else {
                    data.status = '0'
                }
            }

            xlog(data)
            var response = await this.post('/lgu/business/list', data);
            this.datas = response.data.businesses;
        },
        async addBusiness() {
            var response = await this.post('/lgu/business/add', {});
            if (response.status != 'success') {
                return alert('Oops! Something went wrong on our side.');
            }
            this.currentBusinessId = response.data.id;
            this.businessFormDialog = true;
        }
    },
    async mounted() {
        this.loadBusinesses();
        if (this.currentUser.role != 'user') this.pageTitle = 'Business Applications'
    }
};
</script>

yle scoped>
.theme--light.v-tabs-items {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
}
</style>