import { createStore } from 'vuex';

const store = createStore({
    state(){
        return {
            invoice: { totalAmount: 0, products: {  "1": { count:0, price: 0} } },
            clients:[
                {
                    id:"Zayed",
                    name: "Zayed Al Blushi",
                    image: "https://raw.githubusercontent.com/0072007ss/AItest/master/labeled_images/Zayed/3.jpg",
                    pin: "1111"
                },
                {
                    id:"sohrab",
                    name: "Sohrab",
                    image: "https://raw.githubusercontent.com/0072007ss/AItest/master/labeled_images/sohrab/3.jpg",
                    pin: "2222"
                },
                {
                    id:"Abubaker",
                    name: "Engineer AbuBaker",
                    image: "https://raw.githubusercontent.com/0072007ss/AItest/master/labeled_images/Abubaker/3.jpg",
                    pin: "3333"
                },
            ],
            products:[
                {
                    id:"1",
                    name: "Cookies",
                    describtion: "20 Pcs Cookies Box",
                    image: "https://raw.githubusercontent.com/0072007ss/AItest/master/labeled_images/Zayed/3.jpg",
                    price: 120
                },
                {
                    id:"2",
                    name: "Cake",
                    describtion: "20 Pcs Cake Box",
                    image: "https://raw.githubusercontent.com/0072007ss/AItest/master/labeled_images/Zayed/3.jpg",
                    price: 215
                },
                {
                    id:"3",
                    name: "Brownies",
                    describtion: "20 Pcs Brownies Box",
                    image: "https://raw.githubusercontent.com/0072007ss/AItest/master/labeled_images/Zayed/3.jpg",
                    price: 100
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