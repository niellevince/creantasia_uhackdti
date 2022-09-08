<template>
    <GuestLayout>
        <v-container class="px-6 fill-height">
            <v-row justify="center" align-items="center">
                <v-col xl="4" lg="6" md="6" sm="8">
                    <div class="mb-5">
                        <h1 class="text-center orange--text">UHackDTI</h1>
                    </div>
                    <v-card class="pa-6">
                        <v-card-text class="text-center">

                            <h3 class="mb-4">Document Verification</h3>
                            <h1 class="black--text mb-6">{{businessID}}</h1>
                            <div class="circle-loader" style="background-color: white !important;">
                                <div class="status draw"></div>
                            </div>
                            <h3 :class="textClass">{{verifyText}}</h3>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </GuestLayout>
</template>

<script>
import GuestLayout from '@/views/layouts/GuestLayout.vue';
export default {
    props: ['id'],
    components: { GuestLayout },
    data: () => ({
        businessID: '',
        verifyText: 'Verifying authenticity of the document...',
        textClass: '',
    }),
    methods: {
        statusChange(status) {
            var el = $('.circle-loader')
            el.removeClass()
            el.addClass('circle-loader');
            el.addClass(status);
        }
    },
    async mounted() {
        this.businessID = this.id;
        // http://44.199.47.8/verify-business/8479328472 real
        // http://44.199.47.8/verify-business/2463782123 fake
        await this.sleep(3000);

        if (this.businessID == '8479328472') {
            this.verifyText = 'This document is legitimate and business is verified.';
            this.textClass = 'success--text';
            this.statusChange('success');
        } else {
            this.verifyText = 'This document is invalid.';
            this.textClass = 'error--text';
            this.statusChange('failed');
        }
    }
}
</script>

<style scope lang="scss">
.info {
    padding: 4em 0;
}

// Define vars we'll be using
$sin45: 0.70710678;

$brand-success: #5cb85c;
$brand-failure: #FF0000;
$loader-size: 8em;
$symbol-thickness: 2px; // Check thickness
$check-height: $loader-size/2;
$check-width: $check-height/2;
$check-left: (
    $loader-size/7 + $loader-size/12
); // 7/12 is a nice centrepoint of the tick
$check-color: $brand-success;
$cross-color: $brand-failure;
$cross-offset: (
    $check-height / $sin45) - $check-height;

.circle-loader {

    margin: 0 0 30px 10px;
    border: $symbol-thickness solid rgba(0, 0, 0, 0.2
    );
border-left-color: $check-color;
animation-name: loader-spin;
animation-duration: 1s;
animation-iteration-count: infinite;
animation-timing-function: linear;
position: relative;
display: inline-block;
vertical-align: top;

&,
&:after {
    border-radius: 50%;
    width: $loader-size;
    height: $loader-size;
}
}

.success {
    -webkit-animation: none;
    animation: none;
    border-color: $brand-success;
    transition: border opacity 500ms ease-out;

    .status {

        &.draw:after {
            animation-duration: 1.2s;
            animation-timing-function: ease;
            animation-name: checkmark;
            transform: scaleX(-1) rotate(135deg);
        }

        &:after {
            opacity: 1;
            height: $check-height;
            width: $check-width;
            transform-origin: left top;
            border-right: $symbol-thickness solid $check-color;
            border-top: $symbol-thickness solid $check-color;
            content: '';
            left: $check-left;
            top: $check-height;
            position: absolute;
        }
    }
}

.failed {
    -webkit-animation: none;
    animation: none;
    border-color: $brand-failure;
    transition: border opacity 500ms ease-out;

    .status {
        top: 50%;
        left: 50%;
        position: absolute;

        &.draw {

            &:before,
            &:after {
                animation-duration: 1.2s;
                animation-timing-function: ease;
                animation-name: crossmark;
            }

            &:before {
                transform: scaleX(-1) rotate(45deg);
            }

            &:after {
                transform: scaleX(-1) rotate(225deg);
            }
        }

        &:before,
        &:after {
            opacity: 1;
            height: $check-height / 2;
            width: $check-height / 2;
            transform-origin: left top;
            border-right: $symbol-thickness solid $cross-color;
            border-top: $symbol-thickness solid $cross-color;
            content: '';
            position: absolute;
        }

        &:before {
            left: calc(#{$cross-offset} - #{($symbol-thickness*2)});
            top: calc(#{$symbol-thickness * 2} - #{$cross-offset});
        }

        &:after {
            left: calc(#{($symbol-thickness * 2)/$sin45} - #{$cross-offset});
            top: calc(#{$cross-offset} - #{($symbol-thickness)/$sin45});
        }
    }
}


@keyframes loader-spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes checkmark {
    0% {
        height: 0;
        width: 0;
        opacity: 1;
    }

    20% {
        height: 0;
        width: $check-width;
        opacity: 1;
    }

    40% {
        height: $check-height;
        width: $check-width;
        opacity: 1;
    }

    100% {
        height: $check-height;
        width: $check-width;
        opacity: 1;
    }
}

@keyframes crossmark {
    0% {
        height: 0;
        width: 0;
        opacity: 1;
    }

    20% {
        height: 0;
        width: $check-width;
        opacity: 1;
    }

    40% {
        height: $check-width;
        width: $check-width;
        opacity: 1;
    }

    100% {
        height: $check-width;
        width: $check-width;
        opacity: 1;
    }
}
</style>