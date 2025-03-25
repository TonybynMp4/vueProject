interface FormComponent {
    formLegend: string;
    formStyle?: string;
    fields: FieldComponent[];
    actions: ButtonComponent[];
    onSubmit: (event: Event) => void;
}

type FieldComponent = {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
    minLength?: number;
    required?: boolean;
	defaultValue?: string;
};

type ButtonComponent = {
    id: string;
    label: string;
    type?: 'submit' | 'reset' | 'button';
    className?: string;
    style?: string;
    disabled?: boolean;
    onClick?: (event: Event) => void;
};

interface User extends localUser {
   password: string;
}

interface localUser {
    id: number;
    email: string;
}

interface Product {
    id: number;
    name: string;
}

export type {
    FormComponent,
    FieldComponent,
    ButtonComponent,
    User,
    Product,
    localUser
}