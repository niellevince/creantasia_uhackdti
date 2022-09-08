<template>
    <v-card>
        <div v-if="visibility=='public' && currentUser.role=='user'" class="pa-3">
            <v-card-title primary-title>
                <v-row>
                    <v-col>
                        <h3>{{this.formData.name}}</h3>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn icon @click="$emit('close')">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <h4>Business Location</h4>
                <div class="mb-3">{{formData.region}}, {{formData.province}}, {{formData.city}}, {{formData.barangay}}</div>
                <h3>Valid Documents</h3>
                <br>
                <v-row>
                    <v-col cols="3">
                        <v-card width="200" ripple outlined class="fill-height" :href="formData.dtiCertificateOfRegistration" target="_blank">
                            <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                <span class="mb-4">
                                    <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                </span>
                                <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">DTI - Ceritifcate of Registration</span>
                                <span class="text-center success--text" style="font-size: 12px;">
                                    Attached by DTI
                                    <v-icon color="success" small>mdi-check-circle</v-icon>
                                </span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="3">
                        <v-card width="200" ripple outlined class="fill-height" :href="formData.barangayBusinessClearance" target="_blank">
                            <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                <span class="mb-4">
                                    <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                </span>
                                <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Barangay Business Clearance</span>
                                <span class="text-center success--text" style="font-size: 12px;">
                                    Attached by Barangay
                                    <v-icon color="success" small>mdi-check-circle</v-icon>
                                </span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="3">
                        <v-card width="200" ripple outlined class="fill-height" :href="formData.mayorsPermit" target="_blank">
                            <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                <span class="mb-4">
                                    <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                </span>
                                <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Mayor's Permit</span>
                                <span class="text-center success--text" style="font-size: 12px;">
                                    Attached by City Hall
                                    <v-icon color="success" small>mdi-check-circle</v-icon>
                                </span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="3">
                        <v-card width="200" ripple outlined class="fill-height" :href="formData.rdoCertificateOfRegistration" target="_blank">
                            <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                <span class="mb-4">
                                    <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                </span>
                                <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">BIR - Certificate of Registration</span>
                                <span class="text-center success--text" style="font-size: 12px;">
                                    Attached by BIR
                                    <v-icon color="success" small>mdi-check-circle</v-icon>
                                </span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </div>


        <v-form v-model="valid" v-on:submit="saveForm" ref="form" class="pa-3" v-if="visibility=='private' || currentUser.role != 'user'" min-height="50vh">
            <v-card-title primary-title>
                <v-row>
                    <v-col>
                        <h3>Business Form</h3>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn icon @click="closeForm">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <p class="font-weight-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus iusto, facere alias officiis ex distinctio exercitationem porro architecto repellat tempore iste, aut numquam, id maiores eius commodi quis? Explicabo, expedita?</p>
                <br>
                <v-expansion-panels hover v-model="expansion">
                    <!-- Contact Form -->
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <v-row>
                                <v-col>
                                    <span class="mr-3 font-weight-bold">Contact Details</span>
                                    <v-chip :color="step0.color" small>{{step0.text}}</v-chip>
                                </v-col>
                                <v-col cols="auto" class="mr-6">
                                    <div v-if="currentUser.role == 'user'">
                                        <v-btn color="info" @click.native.stop type="submit" small v-if="expansion == 0">Save</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p>Fill up this contact form below so the admins can contact you anytime for the status of your application.</p>
                            <div class="d-flex">
                                <v-text-field name="ownerNumber" label="Mobile Number" v-model="formData.ownerNumber" :rules="requiredRules" required outlined class="mr-3" autocomplete="off" :readonly="currentUser.role != 'user'"></v-text-field>
                                <v-text-field name="ownerEmail" label="Email" v-model="formData.ownerEmail" :rules="emailRules" required outlined autocomplete="off" :readonly="currentUser.role != 'user'"></v-text-field>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <!-- Owner Details -->
                    <v-expansion-panel :disabled="disableOwnerDetails">
                        <v-expansion-panel-header>
                            <v-row>
                                <v-col>
                                    <span class="mr-3 font-weight-bold">Owner Details</span>
                                    <v-chip :color="step1.color" small>{{step1.text}}</v-chip>
                                </v-col>
                                <v-col cols="auto" class="mr-6" v-if="expansion == 1">
                                    <div v-if="currentUser.role == 'user'">
                                        <v-btn color="info" @click.native.stop type="submit" small v-if="expansion == 1 && !disableOwnerDetailsInput">Save</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div id="ownerDetails">
                                <p>Fill up business owner details.</p>
                                <div class="d-flex">
                                    <v-text-field name="ownerFirstName" label="First Name" v-model="formData.ownerFirstName" :rules="requiredRules" required outlined :disabled="disableOwnerDetailsInput" class="mr-3" :readonly="currentUser.role != 'user'"></v-text-field>
                                    <v-text-field name="ownerMiddleName" label="Middle Name" v-model="formData.ownerMiddleName" :rules="requiredRules" required outlined :disabled="disableOwnerDetailsInput" class="mr-3" :readonly="currentUser.role != 'user'"></v-text-field>
                                    <v-text-field name="ownerLastName" label="Last Name" v-model="formData.ownerLastName" :rules="requiredRules" required outlined :disabled="disableOwnerDetailsInput" :readonly="currentUser.role != 'user'"></v-text-field>
                                </div>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <!-- Business Details -->
                    <v-expansion-panel :disabled="disableBusinessDetails">
                        <v-expansion-panel-header>
                            <v-row>
                                <v-col>
                                    <span class="mr-3 font-weight-bold">Business Details</span>
                                    <v-chip :color="step2.color" small>{{step2.text}}</v-chip>
                                </v-col>
                                <v-col cols="auto" class="mr-6" v-if="expansion == 2">
                                    <div v-if="currentUser.role == 'user'">
                                        <v-btn color="info" @click.native.stop type="submit" small v-if="expansion == 2 && !disableOwnerDetailsInput">Save</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p>Fill up your business' details.</p>
                            <div class="d-flex">
                                <v-text-field name="name" label="Proposed Business Name" v-model="formData.name" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" :readonly="currentUser.role != 'user'"></v-text-field>
                                <v-btn :color="availability.color" height="56" class="ml-3" @click="checkAvailability" :depressed="availability.disabled" :class="{'disable-events':availability.disabled}" v-if="!disableBusinessDetailsInput">{{availability.text}}</v-btn>
                            </div>
                            <v-text-field name="nature" label="Nature of Business" v-model="formData.nature" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" :readonly="currentUser.role != 'user'"></v-text-field>
                            <!-- <v-text-field name="scope" label="Scope" v-model="formData.scope" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" :readonly="currentUser.role != 'user'"></v-text-field> -->
                            <v-select :items="['National', 'Regional', 'City', 'Barangay']" v-model="formData.scope" label="Scope" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" :readonly="currentUser.role != 'user'"></v-select>
                            <h4 class="mb-3">Business Location</h4>
                            <!-- <div class="d-flex">
                                <v-text-field name="region" label="Region" v-model="formData.region" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" class="mr-3" :readonly="currentUser.role != 'user'"></v-text-field>
                                <v-text-field name="province" label="Province/State" v-model="formData.province" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" class="mr-3" :readonly="currentUser.role != 'user'"></v-text-field>
                                <v-text-field name="city" label="City" v-model="formData.city" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" class="mr-3" :readonly="currentUser.role != 'user'"></v-text-field>
                                <v-text-field name="barangay" label="Barangay" v-model="formData.barangay" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" :readonly="currentUser.role != 'user'"></v-text-field>
                            </div> -->
                            <v-row>
                                <v-col cols="6">
                                    <v-select :items="regions" v-model="formData.region" label="Region" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" :readonly="currentUser.role != 'user'"></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-select :items="provinces" v-model="formData.province" label="Province" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" :readonly="currentUser.role != 'user'"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-select :items="cities" v-model="formData.city" label="City" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" :readonly="currentUser.role != 'user'"></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-select :items="barangays" v-model="formData.barangay" label="Barangay" :rules="requiredRules" required outlined :disabled="disableBusinessDetailsInput" :readonly="currentUser.role != 'user'"></v-select>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <!-- Payment Details -->
                    <v-expansion-panel :disabled="disablePaymentDetails">
                        <v-expansion-panel-header>
                            <v-row>
                                <v-col>
                                    <span class="mr-3 font-weight-bold">Business Name Registration Fee</span>
                                    <v-chip :color="step3.color" small>{{step3.text}}</v-chip>
                                </v-col>
                                <v-col cols="auto" class="mr-6" v-if="expansion == 3 && currentUser.role == 'office' && formData.status == '2'">
                                    <v-btn color="success" @click.native.stop="showFileUploader" small v-if="expansion == 3">Approve</v-btn>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="d-flex align-center">
                                <div>
                                    <p>Pay for the DTI registration fee of your business name.</p>
                                    <p>After your payment, please wait for DTI to verify your application so you can process to the next step.</p>
                                    <p>After approval, you will not be able to change any details from steps 2 and 3.</p>
                                </div>
                                <v-spacer :readonly="currentUser.role != 'user'"></v-spacer>
                                <div>
                                    <v-btn color="warning" @click="showPaymentDialog('dtiFee')" x-large v-if="formData.dtiFee == null">Pay Now</v-btn>
                                    <v-btn color="green lighten-5" x-large v-if="formData.dtiFee != null" depressed class="disable-events">PAID ✔</v-btn>
                                </div>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <!-- Barangay Application  -->
                    <v-expansion-panel :disabled="disableBarangayDetails">
                        <v-expansion-panel-header>
                            <v-row>
                                <v-col>
                                    <span class="mr-3 font-weight-bold">Barangay Business Clearance</span>
                                    <v-chip :color="step4.color" small>{{step4.text}}</v-chip>
                                </v-col>
                                <v-col cols="auto" class="mr-6" v-if="expansion == 4 && currentUser.role == 'office' && formData.status == '4'">
                                    <v-btn color="success" @click.native.stop="showFileUploader" small v-if="expansion == 4">Approve</v-btn>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p>Apply for Barangay Business Clearance by fullfilling the requirements below.</p>
                            <h4>Business Location</h4>
                            <div class="mb-3">{{formData.region}}, {{formData.province}}, {{formData.city}}, {{formData.barangay}}</div>
                            <h4 class="mb-3">Requirements</h4>
                            <div class="row align-stretch">
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined class="fill-height" :href="formData.dtiCertificateOfRegistration" target="_blank">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">DTI Certificate of Registration</span>
                                            <span class="text-center success--text" style="font-size: 12px;">
                                                Attached by DTI
                                                <v-icon color="success" small>mdi-check-circle</v-icon>
                                            </span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showFileFolder('firstId', '2 Valid IDs')" class="fill-height">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/id-card.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">2 Valid IDs</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.firstId.length == 0">(0 Files Attached)</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.firstId.length != 0">({{formData.firstId.length}} Files Attached) <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showFileFolder('proofOfAddress', 'Proof of Address')" class="fill-height">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Proof of Address</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.proofOfAddress.length == 0">(0 Files Attached)</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.proofOfAddress.length != 0">({{formData.proofOfAddress.length}} Files Attached) <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showFileFolder('barangayBusinessApplicationForm', 'Barangay Business Application Form')" class="fill-height">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Barangay Business Application Form</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.barangayBusinessApplicationForm.length == 0">(0 Files Attached)</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.barangayBusinessApplicationForm.length != 0">({{formData.barangayBusinessApplicationForm.length}} Files Attached) <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showPaymentDialog('barangayBusinessApplicationFee')" class="fill-height" :disabled="formData.barangayBusinessApplicationFee != null || disableBarangayDetailsInput">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/cashless-payment.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Pay Application Fee</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.barangayBusinessApplicationFee == null">Unpaid</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.barangayBusinessApplicationFee != null">Payment Successful <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <!-- Mayor's Permit Application  -->
                    <v-expansion-panel :disabled="disableMayorsDetails">
                        <v-expansion-panel-header>
                            <v-row>
                                <v-col>
                                    <span class="mr-3 font-weight-bold">Mayor's Permit</span>
                                    <v-chip :color="step5.color" small>{{step5.text}}</v-chip>
                                </v-col>
                                <v-col cols="auto" class="mr-6" v-if="expansion == 5 && currentUser.role == 'office' && formData.status == '6'">
                                    <v-btn color="success" @click.native.stop="showFileUploader" small v-if="expansion == 5">Approve</v-btn>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p>Apply for Mayor's Permit by fullfilling the requirements below.</p>
                            <h4>Business Location</h4>
                            <div class="mb-3">{{formData.region}}, {{formData.province}}, {{formData.city}}, {{formData.barangay}}</div>
                            <h4 class="mb-3">Requirements</h4>
                            <div class="row align-stretch">
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined class="fill-height" :href="formData.dtiCertificateOfRegistration" target="_blank">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">DTI Certificate of Registration</span>
                                            <span class="text-center success--text" style="font-size: 12px;">
                                                Attached by DTI
                                                <v-icon color="success" small>mdi-check-circle</v-icon>
                                            </span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined class="fill-height" :href="formData.barangayBusinessClearance" target="_blank">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Barangay Business Clearance</span>
                                            <span class="text-center success--text" style="font-size: 12px;">
                                                Attached by Barangay
                                                <v-icon color="success" small>mdi-check-circle</v-icon>
                                            </span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showFileFolder('firstId', '2 Valid IDs')" class="fill-height">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/id-card.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">2 Valid IDs</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.firstId.length == 0">(0 Files Attached)</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.firstId.length != 0">({{formData.firstId.length}} Files Attached) <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showFileFolder('proofOfAddress', 'Proof of Address')" class="fill-height">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Proof of Address</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.proofOfAddress.length == 0">(0 Files Attached)</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.proofOfAddress.length != 0">({{formData.proofOfAddress.length}} Files Attached) <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showFileFolder('mayorsPermitApplicationForm', 'Mayor\'s Permit Application Form')" class="fill-height">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Mayor's Permit Application Form</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.mayorsPermitApplicationForm.length == 0">(0 Files Attached)</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.mayorsPermitApplicationForm.length != 0">({{formData.mayorsPermitApplicationForm.length}} Files Attached) <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showPaymentDialog('mayorsPermitFee')" class="fill-height" :disabled="formData.mayorsPermitFee != null || disableMayorsDetailsInput">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/cashless-payment.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Pay Application Fee</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.mayorsPermitFee == null">Unpaid</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.mayorsPermitFee != null">Payment Successful <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <!-- Business Certificate of Registration  -->
                    <v-expansion-panel :disabled="disableRdoDetails">
                        <v-expansion-panel-header>
                            <v-row>
                                <v-col>
                                    <span class="mr-3 font-weight-bold">Business Certificate of Registration</span>
                                    <v-chip :color="step6.color" small>{{step6.text}}</v-chip>
                                </v-col>
                                <v-col cols="auto" class="mr-6" v-if="expansion == 6 && currentUser.role == 'office' && formData.status == '8'">
                                    <v-btn color="success" @click.native.stop="showFileUploader" small v-if="expansion == 6">Approve</v-btn>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p>Register your business in the Bureau of Internal Revenue (BIR).</p>
                            <h4>Business Location</h4>
                            <div class="mb-3">{{formData.region}}, {{formData.province}}, {{formData.city}}, {{formData.barangay}}</div>
                            <h4 class="mb-3">Requirements</h4>
                            <div class="row align-stretch">
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined class="fill-height" :href="formData.dtiCertificateOfRegistration" target="_blank">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">DTI Certificate of Registration</span>
                                            <span class="text-center success--text" style="font-size: 12px;">
                                                Attached by DTI
                                                <v-icon color="success" small>mdi-check-circle</v-icon>
                                            </span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined class="fill-height" :href="formData.barangayBusinessClearance" target="_blank">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Barangay Business Clearance</span>
                                            <span class="text-center success--text" style="font-size: 12px;">
                                                Attached by Barangay
                                                <v-icon color="success" small>mdi-check-circle</v-icon>
                                            </span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined class="fill-height" :href="formData.mayorsPermit" target="_blank">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Mayors Permit</span>
                                            <span class="text-center success--text" style="font-size: 12px;">
                                                Attached by City Hall
                                                <v-icon color="success" small>mdi-check-circle</v-icon>
                                            </span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showFileFolder('firstId', '2 Valid IDs')" class="fill-height">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/id-card.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">2 Valid IDs</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.firstId.length == 0">(0 Files Attached)</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.firstId.length != 0">({{formData.firstId.length}} Files Attached) <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showFileFolder('proofOfAddress', 'Proof of Address')" class="fill-height">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Proof of Address</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.proofOfAddress.length == 0">(0 Files Attached)</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.proofOfAddress.length != 0">({{formData.proofOfAddress.length}} Files Attached) <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showFileFolder('birForm101', 'BIR Form 190')" class="fill-height">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">BIR Form 1901</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.birForm101.length == 0">(0 Files Attached)</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.birForm101.length != 0">({{formData.birForm101.length}} Files Attached) <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showFileFolder('rdoOtherRequirements', 'Other Requirements')" class="fill-height">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Other Requirements</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.rdoOtherRequirements.length == 0">(0 Files Attached)</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.rdoOtherRequirements.length != 0">({{formData.rdoOtherRequirements.length}} Files Attached) <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto">
                                    <v-card width="200" ripple outlined @click="showPaymentDialog('rdoRegistrationFee')" class="fill-height" :disabled="formData.rdoRegistrationFee != null || disableRdoDetailsInput">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/cashless-payment.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">Pay Application Fee</span>
                                            <span class="text-center" style="font-size: 12px;" v-if="formData.rdoRegistrationFee == null">Unpaid</span>
                                            <span class="text-center success--text" style="font-size: 12px;" v-if="formData.rdoRegistrationFee != null">Payment Successful <v-icon color="success" small>mdi-check-circle</v-icon></span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div class="col-auto" v-if="formData.rdoCertificateOfRegistration != null">
                                    <v-card width="200" ripple outlined class="fill-height" :href="formData.rdoCertificateOfRegistration" target="_blank">
                                        <v-card-text style="height: 100%; width: 100%;" class="d-flex flex-column align-center justify-center">
                                            <span class="mb-4">
                                                <v-img src="@/assets/file.png" height="56" width="56"></v-img>
                                            </span>
                                            <span class="text-center" style="font-size: 12px; font-weight: bold; line-height: 1.3;">BIR - Certificate of Registration</span>
                                            <span class="text-center success--text" style="font-size: 12px;">
                                                Attached by City Hall
                                                <v-icon color="success" small>mdi-check-circle</v-icon>
                                            </span>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-form>

        <AlertDialog :show="alertDialog.show" :title="alertDialog.title" :subtitle="alertDialog.subtitle" @close="alertDialog.show = false"></AlertDialog>
        <ProgressDialog :show="progressDialog.show" :title="progressDialog.title"></ProgressDialog>
        <PaymentDialog :show="paymentDialog.show" :items="paymentDialog.items" :businessId="id" :field="paymentDialog.field" @close="paymentDialog.show = false" :total="paymentDialog.total" @pay="paymentDialog.pay"></PaymentDialog>
        <SingleFileUploader :show="singleFileUploader.show" :title="singleFileUploader.title" :subtitle="singleFileUploader.subtitle" :confirmText="singleFileUploader.confirmText" @close="singleFileUploader.show=false" @confirm="singleFileUploader.onConfirm"></SingleFileUploader>
        <FileFolderDialog :show="fileFolderDialog.show" :businessId="formData.id" :title="fileFolderDialog.title" :field="fileFolderDialog.field" :files="fileFolderDialog.files" @close="fileFolderDialog.show = false" @reload="loadBusiness"></FileFolderDialog>
    </v-card>
</template>
<script>
import AppLayout from "@/views/layouts/AppLayout.vue";
import AlertDialog from "@/components/dialogs/AlertDialog.vue";
import ProgressDialog from "@/components/dialogs/ProgressDialog.vue";
import PaymentDialog from "../../../components/payment/PaymentDialog.vue";
import SingleFileUploader from "../../../components/dialogs/SingleFileUploader.vue";
import FileFolderDialog from "../../../components/dialogs/FileFolderDialog.vue";
export default {
    components: { AppLayout, AlertDialog, ProgressDialog, PaymentDialog, SingleFileUploader, FileFolderDialog },
    props: ['id', 'showing', 'visibility'],
    data: () => ({
        alertDialog: {
            show: false,
            title: '',
            subtitle: '',
        },
        progressDialog: {
            show: false,
            title: 'Saving business form'
        },
        paymentDialog: {
            show: false,
            field: '',
            items: [],
            total: 0,
            pay: () => { }
        },
        singleFileUploader: {
            show: false,
            title: 'Approve DTI Business Name Registration',
            subtitle: 'Upload DTI Certificate of Registration',
            confirmText: 'Approve',
            onConfirm: (e) => approveStep(e)
        },
        fileFolderDialog: {
            show: false,
            title: '2 Valid IDs',
            field: '',
            files: [],
        },
        expansion: 0,
        valid: false,
        saved: true,

        availability: { text: 'Check availability', color: 'info', disabled: false },

        //status
        step0: { text: 'Unfinished', color: 'grey lighten-3' },
        step1: { text: 'Unfinished', color: 'grey lighten-3' },
        step2: { text: 'Unfinished', color: 'grey lighten-3' },
        step3: { text: 'Unpaid', color: 'grey lighten-3' },
        step4: { text: 'Incomplete Requirements', color: 'grey lighten-3' },
        step5: { text: 'Incomplete Requirements', color: 'grey lighten-3' },
        step6: { text: 'Incomplete Requirements', color: 'grey lighten-3' },

        // expansion disabled
        disableOwnerDetails: true,
        disableBusinessDetails: true,
        disablePaymentDetails: true,
        disableBarangayDetails: true,
        disableMayorsDetails: true,
        disableRdoDetails: true,

        // input disabled
        disableOwnerDetailsInput: true,
        disableBusinessDetailsInput: true,
        disablePaymentDetailsInput: true,
        disableBarangayDetailsInput: true,
        disableMayorsDetailsInput: true,
        disableRdoDetailsInput: true,

        resetter: {
            id: null,
            uid: null,
            ownerNumber: null,
            ownerEmail: null,
            ownerFirstName: null,
            ownerMiddleName: null,
            ownerLastName: null,
            ownerSuffix: null,
            ownerFullName: null,
            ownerCitizenShip: null,
            ownerStateless: false,
            ownerRefugee: false,
            ownerDateOfBirth: null,
            ownerCivilStatus: null,
            ownerGender: null,
            name: null,
            nature: null,
            scope: null,
            region: null,
            province: null,
            city: null,
            barangay: null,
            dtiFee: null,
            dtiCertificateOfRegistration: null,
            dtiApprovedDate: null,
            firstId: [],
            secondId: [],
            proofOfAddress: [],
            dtiNotes: null,
            // Barangay
            barangayBusinessApplicationForm: [],
            barangayBusinessApplicationFee: null,
            barangayBusinessClearance: null,
            barangayApprovedDate: null,
            barangayNotes: null,
            // Mayors
            mayorsPermitApplicationForm: [],
            mayorsPermitFee: null,
            mayorsPermit: null,
            mayorsApprovedDate: null,
            mayorsNotes: null,
            // RDO
            birForm101: [],
            rdoOtherRequirements: [],
            rdoRegistrationFee: null,
            rdoCertificateOfRegistration: null,
            rdoApprovedDate: null,
            rdoNotes: null,

            status: '1',
        },

        // DTI Form
        formData: {
            id: null,
            uid: null,
            ownerNumber: null,
            ownerEmail: null,
            ownerFirstName: null,
            ownerMiddleName: null,
            ownerLastName: null,
            ownerSuffix: null,
            ownerFullName: null,
            ownerCitizenShip: null,
            ownerStateless: false,
            ownerRefugee: false,
            ownerDateOfBirth: null,
            ownerCivilStatus: null,
            ownerGender: null,
            name: null,
            nature: null,
            scope: null,
            region: null,
            province: null,
            city: null,
            barangay: null,
            dtiFee: null,
            dtiCertificateOfRegistration: null,
            dtiApprovedDate: null,
            firstId: [],
            secondId: [],
            proofOfAddress: [],
            dtiNotes: null,
            // Barangay
            barangayBusinessApplicationForm: [],
            barangayBusinessApplicationFee: null,
            barangayBusinessClearance: null,
            barangayApprovedDate: null,
            barangayNotes: null,
            // Mayors
            mayorsPermitApplicationForm: [],
            mayorsPermitFee: null,
            mayorsPermit: null,
            mayorsApprovedDate: null,
            mayorsNotes: null,
            // RDO
            birForm101: [],
            rdoApprovedDate: null,
            rdoRegistrationFee: null,
            rdoCertificateOfRegistration: null,
            rdoOtherRequirements: [],
            rdoNotes: null,

            status: '1',
        },

        regions: [],
        provinces: [],
        cities: [],
        barangays: [],
    }),
    methods: {
        async checkAvailability() {
            this.availability = { text: 'Checking...', color: 'blue lighten-3', disabled: true };
            await this.sleep(2000);
            this.availability = { text: 'Name is available ✔', color: 'success', disabled: true };
            await this.sleep(3000);
            this.availability = { text: 'Check availability', color: 'info', disabled: false };
        },
        async closeForm() {
            //status
            this.step0 = { text: 'Unfinished', color: 'grey lighten-3' },
                this.step1 = { text: 'Unfinished', color: 'grey lighten-3' },
                this.step2 = { text: 'Unfinished', color: 'grey lighten-3' },
                this.step3 = { text: 'Unpaid', color: 'grey lighten-3' },
                this.step4 = { text: 'Incomplete Requirements', color: 'grey lighten-3' },
                this.step5 = { text: 'Unfinished', color: 'grey lighten-3' },
                this.step6 = { text: 'Unfinished', color: 'grey lighten-3' },

                // expansion disabled
                this.disableOwnerDetails = true,
                this.disableBusinessDetails = true,
                this.disablePaymentDetails = true,
                this.disableBarangayDetails = true,
                this.disableMayorsDetails = true,
                this.disableRdoDetails = true,

                this.disableOwnerDetailsInput = true,
                this.disableBusinessDetailsInput = true,
                this.disablePaymentDetailsInput = true,
                this.disableBarangayDetailsInput = true,
                this.disableMayorsDetailsInput = true,
                this.disableRdoDetailsInput = true,

                this.expansion = 0;
            this.$refs.form.reset();
            this.formData = this.resetter;
            this.$emit('close');
        },
        async saveForm(e) {
            e.preventDefault();
            if (this.$refs.form.validate()) {
                this.progressDialog.show = true;
                var response = await this.post('/lgu/business/save', this.formData);
                this.progressDialog.show = false;
                if (response.status != 'success') {
                    this.alertDialog.show = true;
                    this.alertDialog.title = 'Oops!';
                    this.alertDialog.subtitle = response.message;
                    return;
                }
                this.alertDialog = {
                    show: true,
                    title: 'Success',
                    subtitle: response.message,
                }
                this.loadBusiness()
            } else {
                this.alertDialog = {
                    show: true,
                    title: 'Wait!',
                    subtitle: 'Some field on the form are empty. Please fill up the required fields.',
                }
            }
        },
        async loadBusiness() {
            var response = await this.post('/lgu/business/get', { id: this.$props.id });
            this.formData = {
                ...this.formData,
                ...response.data,
            };
            var f = this.formData;

            if (this.checkNotNull([f.ownerNumber, f.ownerEmail])) {
                this.disableOwnerDetails = false;
                this.disableOwnerDetailsInput = false;
                this.step0 = { text: 'Done', color: 'success' };
                this.expansion = 1;
            } else { return }

            if (this.checkNotNull([f.ownerFirstName, f.ownerMiddleName, f.ownerLastName])) {
                this.disableBusinessDetails = false;
                this.disableBusinessDetailsInput = false;
                this.step1 = { text: 'Done', color: 'success' };
                this.expansion = 2;
            } else { return }

            if (this.checkNotNull([f.name, f.nature, f.scope, f.region, f.province, f.city, f.barangay,])) {
                this.disablePaymentDetails = false;
                this.step2 = { text: 'Done', color: 'success' };
                this.expansion = 3;
            } else { return }

            if (this.formData.dtiFee != null) {
                this.step3 = { text: 'Payment Successful - Pending for DTI approval', color: 'info' };
            } else { return }

            if (this.formData.dtiApprovedDate != null) {
                this.step3 = { text: 'Business Name Approved by DTI ✔', color: 'success' };
                this.disableOwnerDetailsInput = true;
                this.disableBusinessDetailsInput = true;
                this.disableBarangayDetails = false;
                this.expansion = 4;
            } else { return }

            // ============================================= Barangay =================================================

            if (this.checkNotNull([f.firstId, f.proofOfAddress, f.barangayBusinessApplicationForm])) {
                this.disableBarangayDetailsInput = false;
            } else { return }

            if (this.formData.barangayBusinessApplicationFee != null) {
                this.step4 = { text: 'Payment Successful - Pending for Barangay approval', color: 'info' };
            } else { return }


            if (this.formData.barangayApprovedDate != null) {
                this.step4 = { text: 'Approved by Barangay ✔', color: 'success' };
                this.disableMayorsDetails = false;
                this.expansion = 5;
            } else { return }

            // ============================================ Mayors ==============================================

            if (this.checkNotNull([f.mayorsPermitApplicationForm])) {
                this.disableMayorsDetailsInput = false;
            } else { return }

            if (this.formData.mayorsPermitFee != null) {
                this.step5 = { text: 'Payment Successful - Pending for Mayor\'s approval', color: 'info' };
            } else { return }

            if (this.formData.mayorsApprovedDate != null) {
                this.step5 = { text: 'Approved by Mayor ✔', color: 'success' };
                this.disableRdoDetails = false;
                this.expansion = 6;
            } else { return }

            // ============================================ RDO ==============================================

            if (this.checkNotNull([f.birForm101])) {
                this.disableRdoDetailsInput = false;
            } else { return }

            if (this.formData.rdoRegistrationFee != null) {
                this.step6 = { text: 'Payment Successful - Pending for BIR\'s approval', color: 'info' };
            } else { return }

            if (this.formData.rdoApprovedDate != null) {
                this.step6 = { text: 'Approved by BIR ✔', color: 'success' };
                this.disableRdoDetails = false;
                this.expansion = 7;
            } else { return }




            if (this.currentUser.role != 'user') {
                this.disableOwnerDetails = false;
                this.disableBusinessDetails = false;
                this.disablePaymentDetails = false;
                this.disableBarangayDetails = false;
                this.disableMayorsDetails = false;
                this.disableRdoDetails = false;

                this.disableOwnerDetailsInput = false;
                this.disableBusinessDetailsInput = false;
                this.disablePaymentDetailsInput = false;
                this.disableBarangayDetailsInput = false;
                this.disableMayorsDetailsInput = false;
                this.disableRdoDetailsInput = false;

                if (this.visibility == 'public') {
                    this.expansion = 0;
                }
            } else { return }
        },
        async showPaymentDialog(field) {
            var merchant = '';
            switch (field) {
                case 'dtiFee':
                    this.paymentDialog.items = [
                        { productId: '001', name: 'Documentary Stamp', price: 30.00 },
                        { productId: '002', name: 'Registration Fee', price: 2000.00 },
                    ];
                    this.paymentDialog.total = 2030;
                    merchant = '63168091e3d8b356cf887da0';
                    this.paymentDialog.pay = () => this.confirmPayment(field, merchant, this.paymentDialog.items, this.paymentDialog.total, '2')
                    break;
                case 'barangayBusinessApplicationFee':
                    this.paymentDialog.items = [
                        { productId: '003', name: 'Barangay Business Application Fee', price: 200.00 },
                    ];
                    this.paymentDialog.total = 200;
                    merchant = '6318c849e6573d6a0aeaa9cd';
                    this.paymentDialog.pay = () => this.confirmPayment(field, merchant, this.paymentDialog.items, this.paymentDialog.total, '4')
                    break;
                case 'mayorsPermitFee':
                    this.paymentDialog.items = [
                        { productId: '005', name: 'Mayor\'s Permit Fee', price: 1500 },
                        { productId: '006', name: 'Service Fee', price: 30 },
                    ];
                    this.paymentDialog.total = 1530;
                    merchant = '63168092e3d8b356cf887da7';
                    this.paymentDialog.pay = () => this.confirmPayment(field, merchant, this.paymentDialog.items, this.paymentDialog.total, '6')
                    break;
                case 'rdoRegistrationFee':
                    this.paymentDialog.items = [
                        { productId: '007', name: 'Registration Fee', price: 500 },
                        { productId: '008', name: 'Loose DST', price: 30 },
                    ];
                    this.paymentDialog.total = 530;
                    merchant = '63168092e3d8b356cf887dac';
                    this.paymentDialog.pay = () => this.confirmPayment(field, merchant, this.paymentDialog.items, this.paymentDialog.total, '8')
                    break;
                default:
                    return;
            }

            this.paymentDialog = {
                ...this.paymentDialog,
                show: true,
                field: field,
            };
        },
        async confirmPayment(field, merchant, items, total, status) {
            xlog('Paying registration fee...')
            this.paymentDialog.show = false;
            this.progressDialog.show = true;
            this.progressDialog.title = 'Payment Processing';
            var response = await this.post('/lgu/business/pay-fee', {
                id: this.formData.id,
                field: field,
                paymentMethod: 'UnionBank',
                merchant: merchant,
                items: items,
                total: total,
                status: status,
            });
            this.progressDialog.show = false;
            if (response.status != 'success') {
                this.alertDialog.show = true;
                this.alertDialog.title = 'Oops!';
                this.alertDialog.subtitle = response.message;
                return;
            }
            this.alertDialog = {
                show: true,
                title: 'Success',
                subtitle: response.message,
            }
            this.loadBusiness()
        },
        async showFileFolder(field, title) {
            this.fileFolderDialog = {
                show: true,
                field: field,
                title: title,
                files: this.formData[field],
            }
            // if (this.currentUser.email.includes('dti')) {
            //     this.singleFileUploader = {
            //         show: true,
            //         title: 'Approve DTI Business Name Registration',
            //         subtitle: 'Upload DTI Certificate of Registration',
            //         confirmText: 'Approve',
            //     };
            // }
        },
        async showFileUploader() {
            // this.singleFileUploader = {
            //     show: true,
            //     field: field,
            //     title: title,
            //     files: this.formData[field],
            // }
            //     singleFileUploader: {
            //     show: false,
            //     title: 'Approve DTI Business Name Registration',
            //     subtitle: 'Upload DTI Certificate of Registration',
            //     confirmText: 'Approve',
            //     onConfirm: (e) => approveStep(e)
            // },
            if (this.formData.status == '2') {
                this.singleFileUploader = {
                    show: true,
                    title: 'Approve DTI Business Name Registration Application',
                    subtitle: 'Upload DTI Certificate of Registration',
                    confirmText: 'Approve',
                    onConfirm: (e) => this.approveStep(e),
                };
            } else if (this.formData.status == '4') {
                this.singleFileUploader = {
                    show: true,
                    title: 'Approve Barangay Business Clearance Application',
                    subtitle: 'Upload Barangay Business Clearance Certificate',
                    confirmText: 'Approve',
                    onConfirm: (e) => this.approveStep(e),
                };
            } else if (this.formData.status == '6') {
                this.singleFileUploader = {
                    show: true,
                    title: 'Approve Mayor\'s Permit Application',
                    subtitle: 'Upload Mayor\'s Permit Certificate',
                    confirmText: 'Approve',
                    onConfirm: (e) => this.approveStep(e),
                };
            } else if (this.formData.status == '8') {
                this.singleFileUploader = {
                    show: true,
                    title: 'Approve Business Certificate of Registration Application',
                    subtitle: 'Upload Business Certificate of Registration',
                    confirmText: 'Approve',
                    onConfirm: (e) => this.approveStep(e),
                };
            }
        },
        async approveStep(file) {
            this.singleFileUploader.show = false;
            xlog('Approving');

            var data = { id: this.formData.id };
            if (this.formData.status == '2') {
                data = {
                    ...data,
                    dtiCertificateOfRegistration: file,
                    dtiApprovedDate: this.moment(),
                    status: '3',
                }
            } else if (this.formData.status == '4') {
                data = {
                    ...data,
                    barangayBusinessClearance: file,
                    barangayApprovedDate: this.moment(),
                    status: '5',
                }
            } else if (this.formData.status == '6') {
                data = {
                    ...data,
                    mayorsPermit: file,
                    mayorsApprovedDate: this.moment(),
                    status: '7',
                }
            } else if (this.formData.status == '8') {
                data = {
                    ...data,
                    rdoCertificateOfRegistration: file,
                    rdoApprovedDate: this.moment(),
                    status: '9',
                }
            }

            this.progressDialog.show = true;
            var response = await this.post('/lgu/business/save', data);
            this.progressDialog.show = false;
            if (response.status != 'success') {
                this.alertDialog.show = true;
                this.alertDialog.title = 'Oops!';
                this.alertDialog.subtitle = response.message;
                return;
            }
            this.alertDialog = {
                show: true,
                title: 'Success',
                subtitle: 'Approved successfully.',
            }
            this.loadBusiness()
        }
    },
    watch: {
        showing(value) {
            if (value == true) {
                xlog(`Current Business ID: ${this.$props.id}`);
                this.loadBusiness();
            }
        },
        async 'formData.region'(value) {
            this.provinces = [];
            this.cities = [];
            this.barangays = [];
            xlog(value)
            var response = await this.post('/address/list', {
                region: this.formData.region,
                get: 'province'
            });
            this.provinces = response.data.addresses;
        },
        async 'formData.province'(value) {
            this.cities = [];
            this.barangays = [];
            if (value != null) {
                xlog(value)
                var response = await this.post('/address/list', {
                    region: this.formData.region,
                    province: this.formData.province,
                    get: 'city'
                });
                this.cities = response.data.addresses;
            }
        },
        async 'formData.city'(value) {
            this.barangays = [];
            if (value != null) {
                xlog(value)
                var response = await this.post('/address/list', {
                    region: this.formData.region,
                    province: this.formData.province,
                    city: this.formData.city,
                    get: 'barangay'
                });
                this.barangays = response.data.addresses;
            }
        },
    },
    async mounted() {
        xlog(`Current Business ID: ${this.$props.id}`);
        await this.loadBusiness();
        var response = await this.post('/address/list', {
            get: 'region'
        });
        this.regions = response.data.addresses;
        // this.provinces = [this.formData.province];
        // this.cities = [this.formData.city];
        // this.barangays = [this.formData.barangay];
    },
};
</script>

<style scoped>
light.v-tabs-items {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
}

.disable-events {
    pointer-events: none
}
</style>