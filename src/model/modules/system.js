import axios from 'axios'
export default {
    questionList(params = {}) {
        return axios.post("base/client/question", params);
    },
    questionInfo(params = {}) {
        return axios.post("base/client/question", params);
    },
};