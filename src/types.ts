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

type ProductComponent = {
	product: Product;
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
	price: number;
}

interface cartProduct extends Product {
	quantity: number;
}

export type {
	ProductComponent,
    FormComponent,
    FieldComponent,
    ButtonComponent,
    User,
    Product,
	cartProduct,
    localUser
}