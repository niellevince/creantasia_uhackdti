import axios from "axios";

export default async function session(router, next) {
    var response = await axios({
        method: 'POST',
        url: `${process.env.VUE_APP_BACKEND}/user/current`,
        withCredentials: true,
    });

    if (response.data.status != 'unauthorized') {
        return router.push({ name: 'home' });
    }

    return next();
}