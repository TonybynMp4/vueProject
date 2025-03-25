<script setup lang="ts">
    import { reactive } from 'vue';
    import FormComponent from '@/components/FormComponent.vue';
    import type { ButtonComponent, FieldComponent } from '@/types';
    import useAuthStore from '@/stores/auth-store';
    import useDbStore from '@/stores/fakeDb-store';
    const dbStore = useDbStore();
    const authStore = useAuthStore();
    import { useRouter } from 'vue-router';
import { compareHash } from '@/hash';
    const router = useRouter();

    console.log('dbStore', dbStore.getUsers);

    const formData = reactive<{
        formLegend: string;
        formStyle: string;
        fields: FieldComponent[];
        actions: ButtonComponent[];
    }>({
        formStyle: 'transform: translateY(-50%)',
        formLegend: 'Connexion',
        fields: [
            { id: 'email', label: 'Email', placeholder: 'Email', type: 'email', required: true },
            { id: 'password', label: 'Mot de Passe', placeholder: 'Password', type: 'password', minLength: 8, required: true }
        ],
        actions: [
            { id: 'login', label: 'Se connecter', type: 'submit' },
            { id: 'reset', label: 'Reset', type: 'reset' }
        ]
    });

    const onSubmit = async (event: Event) => {
        event.preventDefault();

        const userCredentials = {
            email: (event.target as HTMLFormElement).email.value,
            password: (event.target as HTMLFormElement).password.value
        };

        if (!userCredentials.email || !userCredentials.password) {
            alert('Please fill in all fields');
            return;
        }

        const user = dbStore.getUserByEmail(userCredentials.email);
        if (!user) {
            alert('User does not exist!');
            return;
        }

        if (!compareHash(userCredentials.password, user.password)) {
            alert('Incorrect password!');
            return;
        }

        authStore.login(user);
        router.push('/');
    }
</script>

<template>
    <main>
        <FormComponent
            :style="formData.formStyle"
            :formLegend="formData.formLegend"
            :fields="formData.fields"
            :actions="formData.actions"
            :onSubmit="onSubmit"
        />
    </main>
</template>

<style scoped>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        margin: 3rem auto;
    }
</style>