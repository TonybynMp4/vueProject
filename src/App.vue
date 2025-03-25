<script setup lang="ts">
    import { computed } from 'vue';
    import useAuthStore from './stores/auth-store';
    import ButtonComponent from './components/ButtonComponent.vue';
    const authStore = useAuthStore();
    const isLoggedIn = computed(() => authStore.getUser !== null);
    const onClickLogout = () => authStore.logout();
</script>

<template>
    <header>
        <h1>
			<router-link to="/" style="text-decoration: none; color: inherit; font-weight: bold;">
				Vetements-nul.com
			</router-link>
        </h1>
        <ul>
            <li>
                <router-link class="button" to="/">Accueil</router-link>
            </li>
            <li v-if="!isLoggedIn">
                <router-link class="button" to="/register">Inscription</router-link>
            </li>
            <li v-if="!isLoggedIn">
                <router-link class="button" to="/login">Connexion</router-link>
            </li>
			<li>
				<router-link class="button" to="/cart">Panier</router-link>
			</li>
            <li v-if="isLoggedIn">
                <ButtonComponent :id="'logout'" :label="'Déconnexion'" @click="onClickLogout" />
            </li>
        </ul>
    </header>
    <router-view></router-view>
    <footer>
        <p>&copy; Vetements-nul.com {{new Date().getFullYear()}}</p>
    </footer>
</template>

<style>
    header {
        background-color: #f1f1f1;
        color: #333;
        width: 100%;
        display: flex;
        padding: 1rem;
        justify-content: space-between;
        align-items: center;
    }

    header ul {
        display: flex;
        gap: 1rem;
        margin: 0;
    }

    header ul li {
        list-style: none;
    }

    main {
        min-height: 80vh;
    }

    footer {
        background-color: #f1f1f1;
        color: #333;
        width: 100%;
        display: flex;
        padding: 1rem;
        justify-content: center;
        align-items: center;
    }
</style>