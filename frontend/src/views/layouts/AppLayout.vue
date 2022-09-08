<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app dark color="#142B40">
            <div class="d-flex  align-center">
                <!-- <div class="col-auto px-0">
                    <v-img src="@/assets/logo.png" style="height: 35px; width: 70px; border-radius: 16px;" />
                </div> -->
                <div class="col">
                    <h1 class="orange--text text-center">UHackDTI</h1>
                </div>
            </div>

            <v-divider></v-divider>
            <UserSidebar></UserSidebar>
            <v-divider></v-divider>
            <div class="px-4" style="position: absolute; bottom: 0px;">
                <p class="white--text text-center" style="font-size: 12px">UHackDTI © 2022</p>
            </div>
        </v-navigation-drawer>

        <v-app-bar app elevation="0" color="transparent">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <!-- <v-toolbar-title>{{ title }}</v-toolbar-title> -->
            <div class="d-flex align-center">
                <div class="mr-3">
                    <v-btn icon color="#142B40">
                        <v-icon>mdi-bell</v-icon>
                    </v-btn>
                </div>
                <div>
                    <v-menu offset-y min-width="300">
                        <template v-slot:activator="{ on, attrs }">
                            <v-avatar color="primary" size="32" style="cursor: pointer" v-on="on">
                                <v-img :src="currentUser.avatar ?? '/avatar.png'" @error="errorHandler"></v-img>
                            </v-avatar>
                        </template>
                        <v-card>
                            <div class="pa-5">
                                <center>
                                    <v-avatar color="primary" size="75" style="cursor: pointer">
                                        <v-img :src="currentUser.avatar ?? '/avatar.png'" @error="errorHandler"></v-img>
                                    </v-avatar>
                                </center>
                                <h4 class="text-center mt-3">{{ currentUser.fullname }}</h4>
                                <p class="text-center mb-0">{{ currentUser.email ?? currentUser.fullMobile }}</p>
                                <p class="text-center mb-0 grey--text mt-1">{{ capitalize(currentUser.role ?? '') }}</p>
                            </div>
                            <v-divider></v-divider>
                            <div class="pa-4">
                                <div class="text-center">
                                    <v-btn outlined style="border-color: rgb(221, 221, 221)" @click="logout">Sign out</v-btn>
                                </div>
                            </div>
                        </v-card>
                    </v-menu>
                </div>
            </div>

        </v-app-bar>

        <v-main>
            <div class="px-4">
                <p style="font-size: 32px; font-weight: 600; color: #1b3a57;">{{ title }}</p>
                <v-divider></v-divider>
            </div>
            <slot></slot>
        </v-main>
    </v-app>
</template>

<script>
import UserSidebar from './UserSidebar.vue';
export default {
    props: ["title"],
    data: () => ({
        drawer: null,
        dropdowns: {
            doctors: false,
            management: false,
        },
    }),
    methods: {
        errorHandler(url) {
            this.currentUser.avatar = "/avatar.png";
        }
    },
    components: { UserSidebar },
};
</script>

<style>
.v-main {
    background: #F6F7F9;
    /* background: linear-gradient(62deg, rgba(39, 70, 160, 1) 0%, rgba(116, 221, 221, 1) 100%) !important; */
}

.v-sheet.v-card {
    border-radius: 8px !important;
    overflow: hidden;
}

.v-window.v-item-group {
    border-radius: 8px !important;
    overflow: hidden;
}

.v-dialog {
    border-radius: 8px;
}

.v-data-table-header th {
    white-space: nowrap;
}
</style>