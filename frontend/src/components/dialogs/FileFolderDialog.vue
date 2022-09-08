<template>
    <v-dialog v-model="show" max-width="900" persistent>
        <v-card>
            <v-card-title>
                <span style="font-size: 16px; width: 100%" class="text-center">{{ title }}</span>
            </v-card-title>

            <v-card-text class="mt-3">

                <div v-if="currentFiles.length ==0" style="height: 100px; width: 100%;" class="d-flex align-center justify-center">
                    No files attached. Click the upload button to upload files.
                </div>

                <v-row>
                    <v-col cols="3" v-for="file in currentFiles" :key="file">
                        <v-card outlined v-if="getExtension(file) == 'jpg' || getExtension(file) == 'png' || getExtension(file) == 'jpeg'" ripple :href="file" target="_blank">
                            <v-img :src="file" aspect-ratio="1"></v-img>
                            <div class="d-flex pa-2" style="position: absolute; bottom: 0px; left: 0px; background-color: white; width: 100%;">
                                <div class="col-auto pa-0">
                                    <v-icon small color="red" class="mr-2">mdi-image</v-icon>
                                </div>
                                <div class="col pa-0 font-weight-medium" style="text-overflow: ellipsis; white-space: nowrap;  overflow: hidden;">{{getFileName(file)}}</div>
                            </div>
                        </v-card>
                        <v-card outlined v-else ripple :href="file" target="_blank">
                            <div class="d-flex square">
                                <div style="position: absolute; top: 0; left: 0; height: 80%; width: 100%" class="d-flex align-center justify-center">
                                    <div class="col-auto">
                                        <v-img src="@/assets/attach-file.png" height="56" width="56"></v-img>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex pa-2" style="position: absolute; bottom: 0px; left: 0px; background-color: white; width: 100%;">
                                <div class="col-auto pa-0">
                                    <v-icon small color="blue" class="mr-2">mdi-file</v-icon>
                                </div>
                                <div class="col pa-0 font-weight-medium" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{getFileName(file)}}</div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
                <input @change="uploadFiles" type="file" multiple ref="fileinput" hidden>
            </v-card-text>

            <v-card-actions class="pa-5">
                <v-spacer></v-spacer>
                <v-btn color="darken-1" text @click="$emit('close')"> Done </v-btn>
                <v-btn color="success" @click="$refs.fileinput.click()" v-if="currentUser.role == 'user'">
                    <label for="fileinput">
                        <span class="mr-2">Upload Files</span>
                        <v-icon small>mdi-upload</v-icon>
                    </label>
                </v-btn>
            </v-card-actions>
        </v-card>

        <ProgressDialog :show="progressDialog.show" :title="progressDialog.title"></ProgressDialog>
        <AlertDialog :show="alertDialog.show" :title="alertDialog.title" :subtitle="alertDialog.subtitle" @close="alertDialog.show = false"></AlertDialog>
    </v-dialog>
</template>

<style>
.square:before {
    content: "";
    display: block;
    padding-top: 100%;
    /* initial ratio of 1:1*/
}
</style>

<script>
import ProgressDialog from './ProgressDialog.vue';
import AlertDialog from './AlertDialog.vue';
export default {
    props: ["show", "title", "field", "files", "confirmText", "confirmColor", "businessId"],
    data: () => ({
        progressDialog: {
            show: false,
            title: 'Uploading files'
        },
        alertDialog: {
            show: false,
            title: 'Oops!',
            subtitle: 'A single file should only be less than 5MB.',
        },
        currentFiles: [],
    }),
    methods: {
        async uploadFiles(event) {
            var files = event.target.files;

            for (var f of files) {
                if (f.size > 5000000) {
                    this.alertDialog.show = true;
                    return;
                }
            }

            this.progressDialog.show = true;
            xlog("Uploading files");
            xlog(files);

            if (files.length == 0) return;

            var formData = new FormData();
            for (var f of files) {
                formData.append("files", f);
            }
            formData.append("folder", `/${this.currentUser.id}/businesses`);
            var response = await this.post("/file/upload-files", formData);
            if (response.status != "success") {
                xlog("error");
                return;
            }
            var newFiles = response.data.files;
            this.currentFiles = newFiles;
            var fileObjs = {};
            fileObjs[this.field] = newFiles;
            var response = await this.post("/lgu/business/save", {
                id: this.businessId,
                ...fileObjs,
            });
            this.progressDialog.show = false;
            this.$emit("reload");
        },
        closeModal() {
            this.$emit("close");
        },
    },
    watch: {
        show(v) {
            this.currentFiles = this.files;
        }
    },
    mounted() {
        this.currentFiles = this.files;
    },
    components: { ProgressDialog, AlertDialog }
};
</script>

style>

</style>