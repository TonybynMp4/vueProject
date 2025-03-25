import { compareHash, hash } from '@/hash';
import type { Product, User } from '@/types';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


const useDbStore = defineStore('fakeDb', () => {
    const users = ref<User[]>(
        JSON.parse(localStorage.getItem('users') || 'null') ||
        []
    );
    const products = ref<Product[]>(
        JSON.parse(localStorage.getItem('products') || 'null') ||
        [
            { id: 1, name: 'T-shirt afreux', price: 19.99 },
            { id: 2, name: 'Jean un peu trop moulant', price: 9.99 },
			{ id: 3, name: 'Veste en cuir de vachette naine', price: 49.99 },
			{ id: 4, name: 'Chapeau de cowboy', price: 15.99 }
        ]
    );

    const getUserById = (id: number) => users.value.find(user => user.id === id)
    const getProductById = (id: number) => products.value.find(product => product.id === id)
    const getUserByEmail = (email: string) => users.value.find(user => user.email === email)

    const getUsers = computed(() => users.value)
    const addUser = async (newUser: { email: string; password: string; }) => {
        const newId = users.value.length + 1;

        try {
            console.log(compareHash(newUser.password, await hash(newUser.password)));
            newUser.password = await hash(newUser.password);
        } catch (error) {
            console.error(error);

        }

        users.value.push({ id: newId, ...newUser });
        localStorage.setItem('users', JSON.stringify(users.value));
    }

    const getProducts = computed(() => products.value);

    return {
        getUsers,
        getProducts,
        getUserById,
        getProductById,
        getUserByEmail,
        addUser,
    }
})

export default useDbStore;