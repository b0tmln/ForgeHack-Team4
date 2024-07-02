import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';

import 
    ForgeReconciler,
    {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    DatePicker,
    Form,
    FormFooter,
    FormHeader,
    FormSection,
    HelperMessage,
    Label,
    RadioGroup,
    Range,
    RequiredAsterisk,
    Select,
    Stack,
    TextArea,
    Toggle,
    useForm,
    Text,
    Textfield
} from "@forge/react";

const Config = () => {
    return (
        <Textfield name="organisationId" label="Organisation ID donating to" />
    );
};

export const FormAllFieldsExample = () => {
    const { getFieldId, register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        // add organisationId to the data object
        data.organisationId = organisationId;
        const response = await invoke('payment', data);
        console.log(response);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormHeader title="Support our cause with a donation.">
                <Text>
                    Required fields are marked with an asterisk. <RequiredAsterisk />
                </Text>
            </FormHeader>

            <FormSection>
                <Stack space="space.200">
                    <Box>
                        <Label labelFor={getFieldId("text field1")}>
                            Amount <RequiredAsterisk />
                        </Label>
                        <Textfield
                            {...register("text field1", {
                                required: true,
                                maxLength: 10,
                            })}
                        />
                    </Box>

                    <Box>
                        <Label labelFor={getFieldId("select")}>Currency Code <RequiredAsterisk />
                        </Label>
                        <Select
                            options={[
                                { label: "AUD", value: "aud" },
                                { label: "USD", value: "usd" },
                                { label: "...", value: "..." },
                            ]}
                            {...register("select")}
                        />
                    </Box>

                    <Box>
                        <Label labelFor={getFieldId("text field2")}>
                            First Name
                        </Label>
                        <Textfield
                            {...register("text field2", {
                                required: true,
                                maxLength: 20,
                            })}
                        />
                    </Box>

                    <Box>
                        <Label labelFor={getFieldId("text field3")}>
                            Last Name
                        </Label>
                        <Textfield
                            {...register("text field3", {
                                required: true,
                                maxLength: 20,
                            })}
                        />
                    </Box>

                    <Box>
                        <Label labelFor={getFieldId("text field4")}>
                            Email
                        </Label>
                        <Textfield
                            {...register("text field4", {
                                required: true,
                                maxLength: 50,
                            })}
                        />
                    </Box>

                    <Box>
                        <Label labelFor="toggle">Consented to be contacted by organisation</Label>
                        <Toggle {...register("toggle")} />
                    </Box>

                </Stack>
            </FormSection>

            <FormFooter>
                <ButtonGroup>
                    <Button type="submit" appearance="primary">
                        Submit
                    </Button>
                </ButtonGroup>
            </FormFooter>
        </Form>
    );
};


const App = () => {
    const [context, setContext] = useState(undefined);

    useEffect(() => {
        view.getContext().then(setContext);
    }, []);
        
    const [data, setData] = useState(null);

    const config = context?.extension.config;
    const organisationId = config?.organisationId;
    return (
        <>
            <FormAllFieldsExample />
        </>
    );
};

ForgeReconciler.addConfig(<Config />);

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
