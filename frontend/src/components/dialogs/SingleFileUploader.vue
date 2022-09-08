<template>
    <v-dialog v-model="show" max-width="600" persistent>
        <v-form v-model="valid" v-on:submit="saveForm" ref="form">
            <v-card>
                <v-card-title>
                    <span style="font-size: 16px; width: 100%" class="text-center">{{ title }}</span>
                </v-card-title>

                <v-card-text class="mt-3">
                    <v-file-input v-model="file" show-size :label="subtitle" required :rules="rules" outlined></v-file-input>
                </v-card-text>

                <v-card-actions class="pa-5">
                    <v-spacer></v-spacer>
                    <v-btn color="darken-1" text @click="closeModal"> Cancel </v-btn>
                    <v-btn :color="confirmColor ?? 'success'" type="submit"> {{ confirmText ?? 'Ok' }} </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>

        <ProgressDialog :show="progressDialog.show" :title="progressDialog.title"></ProgressDialog>
    </v-dialog>
</template>

<script>
import ProgressDialog from './ProgressDialog.vue';
export default {
    props: ["title", "subtitle", "show", "confirmText", "confirmColor"],
    data: () => ({
        progressDialog: {
            show: false,
            title: 'Uploading file'
        },
        valid: false,
        file: null,
        rules: [
            (value) => {
                if (value == null) {
                    return "Please select a file";
                }
                return true;
            },
            value => !value || value.size < 5000000 || 'File size should be less than 5 MB!',
        ],
    }),
    methods: {
        async saveForm(e) {
            e.preventDefault();
            if (this.$refs.form.validate()) {
                var formData = new FormData();
                formData.append("file", this.file);
                formData.append("folder", `/${this.currentUser.id}/businesses`);
                var response = await this.post("/file/upload", formData);
                this.progressDialog.show = true;
                if (response.status != "success") {
                    this.alertDialog.show = true;
                    this.alertDialog.title = "Oops!";
                    this.alertDialog.subtitle = response.message;
                    return;
                }
                this.file = null;
                await this.sleep(1000);
                this.progressDialog.show = false;
                this.$emit("confirm", response.data.url);
            }
        },
        closeModal() {
            this.$emit("close");
        },
    },
    components: { ProgressDialog }
};
</script>

<style>

</style>