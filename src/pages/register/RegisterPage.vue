<script setup lang="ts">
import { reactive } from 'vue';
import FormComponent from '@/components/FormComponent.vue';
import type { ButtonComponent, FieldComponent } from '@/types';
import { useRouter } from 'vue-router';
const router = useRouter();
import useDbStore from '@/stores/fakeDb-store';

const dbStore = useDbStore();
const formData = reactive<{
    formLegend: string;
    formStyle: string;
    fields: FieldComponent[];
    actions: ButtonComponent[];
}>({
    formStyle: 'transform: translateY(-50%)',
    formLegend: 'Créer un compte',
    fields: [
        { id: 'email', label: 'Email', placeholder: 'Email', type: 'email', required: true },
        { id: 'password', label: 'Password', placeholder: 'Password', type: 'password', minLength: 8, required: true }
    ],
    actions: [
        { id: 'register', label: 'Créer un compte' },
        { id: 'reset', label: 'Reset', type: 'reset' }
    ]
});

function checkPasswordStrength(password: string): boolean {
    if (password.length < 8 || password.toLowerCase() === password) {
        return false;
    } else {
        return true;
    }
}

function onsubmit(event: Event) {
    event.preventDefault();

    const newUser = {
            email: (event.target as HTMLFormElement).email.value,
            password: (event.target as HTMLFormElement).password.value
        };

    if (!newUser.email || !newUser.password) {
        alert('Please fill in all fields');
        return;
    }

    if (dbStore.getUserByEmail(newUser.email)) {
        alert('User already exists!');
        return;
    }

    if (!checkPasswordStrength(newUser.password)) {
        alert('Password is too weak!');
        return;
    }

    dbStore.addUser(newUser);
    alert('User created!');
    router.push('/login');
}
</script>

<template>
    <main>
        <FormComponent :style="formData.formStyle" :formLegend="formData.formLegend" :fields="formData.fields"
            :actions="formData.actions" :onSubmit="onsubmit" />
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