<template>
    <div>
        <Guest v-if="noLayout == undefined">
            <v-container class="fill-height">
                <v-row>
                    <v-col style="text-align: center">
                        <h1 style="font-size: 80px" class="orange--text">404</h1>
                        <h1>Page not found 😔</h1>
                        <p class="mt-6">
                            The link you clicked may be broken or the link<br />may have been
                            removed or renamed.
                        </p>
                        <v-btn color="info" to="/">Go Home</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </Guest>

        <v-container class="fill-height" v-if="noLayout != undefined">
            <v-row>
                <v-col style="text-align: center">
                    <h1 style="font-size: 80px" class="orange--text">404</h1>
                    <h1>Page not found 😔</h1>
                    <p class="mt-6">
                        The link you clicked may be broken or the link<br />may have been
                        removed or renamed.
                    </p>
                    <v-btn color="info" to="/">Go Home</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Guest from "../layouts/GuestLayout.vue";
export default {
    props: ['noLayout'],
    components: {
        Guest,
    },
};
</script>
