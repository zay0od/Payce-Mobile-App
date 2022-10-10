import { createStore } from 'vuex';

const store = createStore({
    state(){
        return {
            clients:[
                {
                    id:"user1",
                    name: "Zayed Al Blushi",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU",
                    pin: "1345"
                },
                {
                    id:"user2",
                    name: "Ahmed Mohammed",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTskZZRN73n7mIPS6dDsFkd8xsD_hw0k0Vh4CXVCD_2HmrBHAXbe4bkBKS-fI6qlWCd_7c&usqp=CAU",
                    pin: "5324"
                },
                {
                    id:"user3",
                    name: "Engineer Abu Baker",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5qZWrKpx9mJWfLUk-SlGC9F6ME43mlmLtEAy4j_xpD59KcJGmn4sAJGdJ1XDiCmbukAM&usqp=CAU",
                    pin: "7632"
                },
                {
                    id:"user4",
                    name: "Sohrab",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSbYw7jpAT4jd7j3j1QQAfWqQC44jf_n1kxo09x7khBk55GGJE55nNQpaj12U3k_-wFno&usqp=CAU",
                    pin: "1643"
                },
            ]
        }
    },
    mutations: {
        addMemory(state, userData){
            const newUser = {
                id: new Date().toISOString(),
                name: userData.name,
                image: userData.image,
                pin: userData.pin,
            }

            state.clients.unshift(newUser)

        }
    },
    actions: {//async work here
        addMemory(context, newUser){
            context.commit('addMemory', newUser)
        }
    },
    getters: {
        clients(state){
            return state.clients
        },
        client(state){
            return (userId) => {
                return state.clients.find( user => user.id === userId )
            }
        }
    }
})

export default store