<script setup lang="ts">
import { computed, ref } from 'vue';
import useCartStore from '@/stores/cart-store';

const cartStore = useCartStore();
const cartProducts = computed(() => cartStore.getCart);

const clearCart = () => {
	cartStore.clearCart();
};

const order = () => {
	alert('Commande passée :) !');

	cartStore.clearCart();
};
</script>

<template>
	<main>
		<h1>Panier</h1>
		<p v-if="cartProducts.length === 0">Vous n'avez pas encore d'article dans votre panier.</p>
		<section v-else>
			<table>
				<thead>
					<tr>
						<th>Nom</th>
						<th>Quantité</th>
						<th>Prix</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="product in cartProducts" :key="product.id">
						<td style="width: 30%;">
							{{ product.name }}
						</td>
						<td style="width: 20%;">
							<input type="number" v-model="product.quantity" min="1" max="99"
								@change="cartStore.updateProductQuantity(product.id, product.quantity)" />
						</td>
						<td style="width: 30%;">
							{{ (product.price * product.quantity).toFixed(2) }} €
						</td>
						<td style="width: 20%;">
							<button @click="cartStore.removeFromCart(product.id)" class="cart_table_button">
								Retirer le produit
							</button>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td style="font-weight:bold;" colspan="2">Total</td>
						<td>
							{{cartProducts.reduce((total, product) => total + (product.price * product.quantity),
								0).toFixed(2)}} €
						</td>
						<td>
							<button @click="clearCart" class="cart_table_button">
								Vider le panier
							</button>
						</td>
					</tr>
				</tfoot>
			</table>

			<button v-if="cartProducts.length > 0" @click="order">
				Commander
			</button>
		</section>
	</main>
</template>

<style scoped>
.cart_table_button {
	border-color: #dc3545;
	width: 100%;
}

.cart_table_button:hover {
	background-color: #dc3545;
	color: white;
}

main {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
}

table input {
	width: 100%;
	border: 1px solid #ccc;
	padding: 0.5rem;
	border-radius: 5px;
}

section {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	width: 80%;
}

table {
	border-collapse: collapse;
}

table,
th,
td {
	border: 1px solid #ccc;
	padding: 0.5rem;
	text-align: left;
}

th {
	font-weight: bold;
}
</style>