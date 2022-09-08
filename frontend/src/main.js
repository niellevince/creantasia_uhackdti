import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";
import * as moment from 'moment-timezone';
// moment.tz.setDefault('Etc/UTC');

Vue.config.productionTip = false

import VueSocketIO from 'vue-socket.io'

// Vue.use(new VueSocketIO({
//     // debug: true,
//     connection: process.env.VUE_APP_BACKEND,
//     withCredentials: true,
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
// }))

Vue.mixin({
    data() {
        return {
            server: 'http://localhost:3000',
            requiredRules: [(v) => !!v || "This field is required"],
            emailRules: [
                (v) => !!v || "E-mail is required",
                (v) => /.+@.+/.test(v) || "E-mail must be valid",
            ],
            mobileRules: [
                (v) => !isNaN(this.mobile) || "Enter a valid mobile number",
                (v) => {
                    if (v == null) {
                        return 'Enter a valid mobile number';
                    }
                    if (v.length != 10) {
                        return 'Please enter a 10 digit mobile number';
                    }
                    return true;
                }
            ],
            passwordRules: [
                (v) => !!v || "Password is required",
                (v) => v.length >= 8 || "Min 8 characters",
            ],
            currency: new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP',
            }),
        }
    },
    methods: {
        jsonParse(string) {
            return JSON.parse(string);
        },
        capitalize: str => str.charAt(0).toUpperCase() + str.slice(1),
        post: async (url, data) => {
            var response = await axios({
                method: 'POST',
                url: `${process.env.VUE_APP_BACKEND}${url}`,
                data: data ?? {},
                withCredentials: true,
                headers: {
                    'Authorization': process.env.VUE_APP_DEVELOPMENT == 'true' ? `Bearer ${localStorage.token}` : null,
                }
            });
            xlog(url)
            xlog(response.data);
            return response.data;
        },
        async logout() {
            await this.post('/logout');
            localStorage.removeItem('token')
            this.$store.state.currentUser = {};
            this.$router.push({ name: 'login' })
        },
        moment: moment,
        copyToClipboard(mytext) {
            var eventTitle = this.$store.state.currentEvent.name;
            var eventDate = this.moment(this.$store.state.currentEvent.date).format('MMMM d, YYYY- h:m A');
            var input = document.createElement("textarea");
            input.value = mytext;
            document.body.appendChild(input);
            try {
                input.select();
                input.click();
                input.focus();
                var successful = document.execCommand("copy");
            }
            catch (err) {
                xlog("Oops, unable to copy");
            }
            document.body.removeChild(input);
        },
        randomString(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        },
        randomNumber() {
            return Math.floor(100000 + Math.random() * 900000);
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        checkNotNull(array) {
            for (var i of array) {
                // xlog(`Checking if null: ${i}`)
                if (i == null || i == '' || i == undefined || i.length == 0) {
                    return false;
                }
            }
            return true;
        },
        humanize(str) {
            var i, frags = str.split('_');
            for (i = 0; i < frags.length; i++) {
                frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
            }
            return frags.join(' ');
        },
        getFileName(url) {
            return url.substring(url.lastIndexOf('/') + 1);
        },
        getExtension(url) {
            return url.split(/[#?]/)[0].split('.').pop().trim();
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.currentUser;
        }
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
