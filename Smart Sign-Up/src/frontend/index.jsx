import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import ForgeReconciler, {
    DynamicTable,
    Text,
    Form,
    FormSection,
    FormFooter,
    Label,
    Textfield,
    Button,
    useForm
} from "@forge/react";


let F1 = 'Notes'

const Config = () => {
    return (
        <Textfield name="F1" label="Custom Field 1" />
    );
};

const FormDefaultExample = ({ F1, onSubmit, isSubmitting }) => {
    const { handleSubmit, register, getFieldId } = useForm();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormSection>
                <Label labelFor={getFieldId("field1")}>
                    {F1}
                </Label>
                <Textfield {...register("field1")} />
            </FormSection>

            <FormFooter>
                <Button appearance="primary" type="submit" isDisabled={isSubmitting}>
                    Submit
                </Button>
            </FormFooter>
        </Form>
    );
};

const App = () => {
    const [data, setData] = useState(null);
    const [storageList, setStorageList] = useState([]);
    const [context, setContext] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rowMain, setRowMain] = useState(["Id", "Email", "Name"]);

    useEffect(() => {
        view.getContext().then(setContext).catch(console.error);
    }, []);

    useEffect(() => {
        invoke('getText', { example: 'my-invoke-variable' }).then(response => {
            setData(response);
        }).catch(console.error);
    }, []);

    useEffect(() => {
        if (context?.extension.config?.F1) {
            const F1 = context.extension.config.F1;
            setRowMain(prev => [...prev, F1]);
        }
    }, [context]);

    const handleFormSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            if (data) {
                const newItem = { accountId: data.accountId, email: data.email, publicName: data.publicName, customField: formData.field1 };
                setStorageList(prevList => [...prevList, newItem]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const rows = storageList.map((item, index) => ({
        key: `row-${index}`,
        cells: [item.accountId, item.email, item.publicName, item.customField].map((content, idx) => ({
            key: idx,
            content,
        })),
    }));

    const config = context?.extension.config;
    const F1 = config?.F1;

    const head = {
        cells: rowMain.map((column) => ({
            key: column,
            content: column,
        })),
    };

    return (
        <Text>
            <DynamicTable
                caption="User Data"
                head={head}
                rows={rows}
            />
            <FormDefaultExample F1={F1} onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </Text>
    );
};

ForgeReconciler.addConfig(<Config />);

ForgeReconciler.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

