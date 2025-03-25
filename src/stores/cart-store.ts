import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { cartProduct, Product } from '@/types';

const useCartStore = defineStore('cart', () => {
	const cart = ref<cartProduct[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

	const setCart = (newCart: cartProduct[]) => {
		cart.value = newCart;
		localStorage.setItem('cart', JSON.stringify(cart.value));
		return cart;
	};

	const getCart = computed(() => cart.value);

	const addToCart = (product: Product) => {
		const existingProduct = cart.value.find((item: cartProduct) => item.id === product.id);
		if (existingProduct) {
			existingProduct.quantity += 1;
		} else {
			const newProduct: cartProduct = {
				...product,
				quantity: 1
			};
			cart.value.push(newProduct);
		}
		localStorage.setItem('cart', JSON.stringify(cart.value));
	}

	const removeFromCart = (productId: number) => {
		cart.value = cart.value.filter((product: cartProduct) => product.id !== productId);
		localStorage.setItem('cart', JSON.stringify(cart.value));
	};

	const clearCart = () => {
		cart.value = [];
		localStorage.removeItem('cart');
	};

	const updateProductQuantity = (productId: number, quantity: number) => {
		const product = cart.value.find((item: cartProduct) => item.id === productId);
		if (product) {
			product.quantity = quantity;
			if (product.quantity <= 0) {
				removeFromCart(productId);
			} else {
				localStorage.setItem('cart', JSON.stringify(cart.value));
			}
		}
	}

	return {
		setCart,
		getCart,
		addToCart,
		removeFromCart,
		clearCart,
		updateProductQuantity
	};
});

export default useCartStore;