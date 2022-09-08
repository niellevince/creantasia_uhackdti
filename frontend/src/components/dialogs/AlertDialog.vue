<template>
    <v-dialog v-model="show" max-width="300" persistent>
        <v-card>
            <v-card-title class="text-h5">
                {{ title }}
            </v-card-title>

            <v-card-text>
                <!-- {{  }} -->
                <span v-html="subtitle"></span>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="closeModal"> OK </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["title", "subtitle", "show"],
    methods: {
        closeModal() {
            this.$emit("close", false);
        },
    },
};
</script>

<style>
</style>