<script setup lang="ts">
import useCartStore from '@/stores/cart-store';
import type { Product, ProductComponent } from '@/types';
const cartStore = useCartStore();

const addToCart = (product: Product) => {
	cartStore.addToCart(product);

	alert(`Produit ${product.name} ajouté au panier !`);
};

const props = defineProps<ProductComponent>();
</script>

<template>
	<article>
		<h2>
			{{ props.product.name }}
		</h2>
		<p>Price: {{ props.product.price }}</p>
		<button @click="addToCart(props.product)">Add to Cart</button>
	</article>
</template>

<style scoped>
	article {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		border: 1px solid #ccc;
		padding: 1rem;
		border-radius: 5px;
		width: 30%
	}

	button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 5px;
		cursor: pointer;
	}
	button:hover {
		background-color: #0056b3;
	}
</style>