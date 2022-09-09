import axios from "axios";
import store from '../store/index';

export default async function auth(router, next, to) {

    if (store.state.currentUser.id == null || store.state.currentUser.id == undefined) {
        var response = await axios({
            method: 'POST',
            url: `${process.env.VUE_APP_BACKEND}/user/current`,
            // withCredentials: true,
            headers: {
                'Authorization': process.env.VUE_APP_DEVELOPMENT == 'true' ? `Bearer ${localStorage.token}` : null,
            }
        });

        if (response.data.status == 'unauthorized') {
            return router.push({ name: 'login' });
        }

        store.state.currentUser = response.data.data;
    } else {
        store.state.currentUser = store.state.currentUser;
    }

    if (store.state.currentUser.firstname == undefined || store.state.currentUser.firstname == null) {
        if (to.name != 'finish-profile') {
            return router.push({ name: 'finish-profile' });
        }
    }
    
    return next();
}