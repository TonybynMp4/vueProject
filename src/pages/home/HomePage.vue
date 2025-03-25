<script setup lang="ts">
    import { ref } from 'vue';
</script>

<template>
    <main>
        <h1>Bienvenue sur ce site ecommerce de fou</h1>
        <p>Vous pouvez vous connecter:</p>
        <router-link class="button" to="/login">Se connecter</router-link>
        <p>Ou, si ce n'est pas déjà fait, vous inscrire:</p>
        <router-link class="button" to="/register">S'inscrire</router-link>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
</style>