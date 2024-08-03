const api = 'https://2735-185-237-80-251.ngrok-free.app/api';

export class ProfileService {
    getSettings(bot_id, init_data) {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                bot_id: bot_id,
                init_data: init_data
            },
            referrer: '',
            referrerPolicy: 'no-referrer',
            credentials: 'omit',
            cache: 'no-cache'
        };

        return fetch(`${api}/settings`, requestOptions)
            .then((res) => res.json())
            .catch(function (res) {
                console.warn(res);
            });
    }
    getProfiles(bot_id, init_data, last) {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                bot_id: bot_id,
                init_data: init_data
            },
            referrer: '',
            referrerPolicy: 'no-referrer',
            credentials: 'omit',
            cache: 'no-cache'
        };
        let params = new URLSearchParams({
            last: last
        });

        return fetch(`${api}/profiles?${params}`, requestOptions)
            .then((res) => res.json())
            .catch(function (res) {
                console.warn(res);
            });
    }

    askStartingDialog(bot_id, init_data, user_id) {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                bot_id: bot_id,
                init_data: init_data
            },
            referrer: '',
            referrerPolicy: 'no-referrer',
            credentials: 'omit',
            cache: 'no-cache'
        };
        let params = new URLSearchParams({
            user_id: user_id
        });

        return fetch(`${api}/ask_dialogue?${params}`, requestOptions)
            .then((res) => res.json())
            .catch(function (res) {
                console.warn(res);
            });
    }
}
