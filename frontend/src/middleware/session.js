import axios from "axios";

export default async function session(router, next) {
    var response = await axios({
        method: 'POST',
        url: `${process.env.VUE_APP_BACKEND}/user/current`,
        // withCredentials: true,
        headers: {
            'Authorization': process.env.VUE_APP_DEVELOPMENT == 'true' ? `Bearer ${localStorage.token}` : null,
        }
    });

    if (response.data.status != 'unauthorized') {
        return router.push({ name: 'home' });
    }

    return next();
}