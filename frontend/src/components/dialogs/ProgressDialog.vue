<template>
    <v-dialog v-model="show" max-width="300" persistent>
        <v-card>
            <v-card-title>
                {{ title }}
            </v-card-title>

            <v-card-text>
                <div class="d-flex align-center mt-3">
                    <div>
                        <v-progress-circular indeterminate color="green"></v-progress-circular>
                    </div>
                    <div class="ml-4">
                        <span style="font-size:larger">Please wait...</span>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["title", "show"],
    methods: {
        closeModal() {
            this.$emit("close", false);
        },
    },
};
</script>

<style>
</style>