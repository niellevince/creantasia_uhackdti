<template>
    <Guest>
        <div class="d-flex justify-center align-center fill-height">
            <div class="col-8">
                <center>
                    <img src="@/assets/logo.png" alt="" height="100" />
                </center>
                <h1 class="text-center mt-6">
                    Welcome to UHackDTI
                </h1>
                <p class="text-center">
                    We think that you're not allowed here.
                </p>
            </div>
        </div>
    </Guest>
</template>

<script>
import Guest from "../layouts/GuestLayout.vue";
export default {
    components: {
        Guest,
    },
};
</script>
