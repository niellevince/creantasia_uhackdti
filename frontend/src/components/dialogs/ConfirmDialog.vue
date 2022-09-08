<template>
    <v-dialog v-model="show" max-width="290" persistent>
        <v-card>
            <v-card-title class="text-h5">
                {{ title }}
            </v-card-title>

            <v-card-text>
                <div v-html="subtitle"></div>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="darken-1" text @click="closeModal"> Cancel </v-btn>
                <v-btn :color="confirmColor ?? 'green'" text v-on:click="confirm"> {{ confirmText ?? 'Ok' }} </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["title", "subtitle", "show", "confirmText", "confirmColor"],
    methods: {
        closeModal() {
            this.$emit("close");
        },
        confirm() {
            this.$emit('confirm');
        }
    },
};
</script>

<style>

</style>