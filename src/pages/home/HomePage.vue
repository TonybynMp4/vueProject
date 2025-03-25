<script setup lang="ts">
	import Product from '@/components/ProductComponent.vue';
	import useAuthStore from '@/stores/auth-store';
	import useDbStore from '@/stores/fakeDb-store';
	import { computed, } from 'vue';

	const authStore = useAuthStore();
    const isLoggedIn = computed(() => authStore.getUser !== null);
	const dbStore = useDbStore();
	const products = computed(() => dbStore.getProducts);
</script>

<template>
    <main>
        <h1>Bienvenue sur ce site ecommerce de fou</h1>
		<section v-if="!isLoggedIn">
			<p>Vous pouvez vous connecter:</p>
			<router-link class="button" to="/login">Se connecter</router-link>
			<p>Ou, si ce n'est pas déjà fait, vous inscrire:</p>
			<router-link class="button" to="/register">S'inscrire</router-link>
		</section>
		<section class="productList" v-else>
			<Product v-for="product in products" :key="product.id" :product="product" />
		</section>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
		width: 80%;
		margin: 0 auto;
    }

	.productList {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		width: 100%;
	}
</style>