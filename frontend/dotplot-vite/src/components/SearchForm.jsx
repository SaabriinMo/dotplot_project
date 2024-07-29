import { useForm } from '@mantine/form';
import { useState } from 'react';
import {
  TextInput,
  Text,
  Paper,
  Button,
  Stack,
  NumberInput,
  Container,
  Title,
  Center,
} from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';


// eslint-disable-next-line react/prop-types
export default function SearchForm({ onData, onUniqueData }) {
    const [generalError, setGeneralError] = useState('');

  const form = useForm({
    initialValues: {
      patientID: '',
      firstName: '',
      surname: '',
    },

    validate: {
      patientID: (val) => (!val || !isNaN(val) ? null : 'Patient ID should be a number'),
      firstName: (val) => (!val || /^[A-Za-z]+$/.test(val) ? null : 'First name should contain only letters'),
      surname: (val) => (!val || /^[A-Za-z]+$/.test(val) ? null : 'Surname should contain only letters'),
    },
  });

  const handleSubmit = (values) => {
    // Check if at least one input has a value
    if (!values.patientID && !values.firstName && !values.surname) {
      setGeneralError('Please fill in at least one field');
      // form.setErrors({
      //   patientID: true,
      //   firstName: true,
      //   surname: true,
      // });
      return;
    }

    setGeneralError('');
    // Additional form submission logic goes here
    console.log('Form submitted', values);
  
    if (values.firstName || values.surname || values.patientID) {
      const formData = new FormData();
      
      if (values.firstName) {
        formData.append('first_name', values.firstName);
      }
      
      if (values.surname) {
        formData.append('last_name', values.surname);
      }
      
      if (values.patientID) {
        formData.append('patient_id', values.patientID);
      }
    
      fetch('/api/', {
        method: 'POST',
        body: formData
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);

        if (data.length === 0) {
          setGeneralError('No matching patients found');
          return;
        }
        // Code to remove duplicates due to multiple scans.
        // Needed in case we need to ask the user to choose a patient.
        const seen = new Set();
        const uniqueData = data.filter(item => {
          const key = item[0]; 
          if (seen.has(key)) {
            return false;
          } else {
            seen.add(key);
            return true;
          }
        });
      
        console.log('Unique data:', uniqueData);

        

        onData(data);
        onUniqueData(uniqueData);
      })
      .catch((error) => console.error('Error fetching data:', error));
    }
  };

return (
    <Center w={useFullscreen} 
    style={{
        position: 'absolute',
        top: '15%',
        left: '40%',
    }}>
    <Container size={420} my={40}>
      <Title ta="center">
        Search
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Search for a patient
      </Text>

        <Paper radius="md" mt="lg" p="xl" withBorder>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    {generalError && (
                        <Text color="red">
                        {generalError}
                        </Text>
                    )}
                    <TextInput
                        label="First name"
                        placeholder="Enter patient's first name"
                        value={form.values.firstName}
                        onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                        error={form.errors.firstName}
                        radius="md"
                    />

                    <TextInput
                        label="Surname"
                        placeholder="Enter patient's surname"
                        value={form.values.surname}
                        onChange={(event) => form.setFieldValue('surname', event.currentTarget.value)}
                        error={form.errors.surname}
                        radius="md"
                    />
                
                    <NumberInput 
                        allowNegative={false}
                        allowDecimal={false}
                        label="Patient ID"
                        placeholder="Input patient ID"
                        value={form.values.patientID}
                        onChange={(value) => form.setFieldValue('patientID', value)}
                        error={form.errors.patientID}
                    />

                </Stack>
                
                <Center mt="lg">
                    <Button type="submit" mt="md" radius="xl">
                        Search
                    </Button>
                </Center>
            </form>
        </Paper>
    </Container>
    </Center>
);
}
