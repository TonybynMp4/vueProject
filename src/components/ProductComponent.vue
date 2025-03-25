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
		<fieldset>
			<legend>
				{{ props.product.name }}
			</legend>
			<img alt="Produit" width="200" height="200" src="https://placehold.co/600x400" />
			<div class="product-details">
				<p>{{ props.product.price }}€</p>
				<button @click="addToCart(props.product)">Ajouter au panier</button>
			</div>
		</fieldset>
	</article>
</template>

<style scoped>
	.product-name {
		height: 3rem;
		width: 100%;
	}

	.product-details {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 80%
	}

	fieldset {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		border: 1px solid #ccc;
		padding: 1rem;
		border-radius: 5px;
		font-size: 0.9rem;
		width: 100%;
		height: 100%;
	}

	article {
		width: 30%;
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