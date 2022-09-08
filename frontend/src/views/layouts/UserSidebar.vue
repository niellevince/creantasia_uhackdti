<template>
    <v-list nav dense>
        <v-list-item-group v-model="selectedItem">
            <ListItem to="/businesses" icon="mdi-domain" title="Businesses"></ListItem>
            <ListItem to="/business-applications" icon="mdi-store" title="My Businesses" v-if="currentUser.role == 'user'"></ListItem>
            <ListItem to="/business-applications" icon="mdi-store" title="Applications" v-if="currentUser.role == 'office'"></ListItem>
            <ListItem to="/transactions" icon="mdi-receipt-text-check" title="Transactions"></ListItem>
        </v-list-item-group>
    </v-list>
</template>

<script>
import ListItem from '@/components/ListItem.vue';
export default {
    data: () => ({
        selectedItem: 0,
        dropdowns: {
            doctors: false,
            management: false,
        },
    }),
    mounted() {
        var route = this.$route.fullPath;
        var doctorsRoutes = ["/med/doctors", "/med/applicants"];
        if (doctorsRoutes.includes(route))
            this.dropdowns.doctors = true;
        var doctorsRoutes = ["/med/doctors", "/med/applicants"];
        if (doctorsRoutes.includes(route))
            this.dropdowns.doctors = true;
    },
    components: { ListItem }
}
</script>

<style>

</style>