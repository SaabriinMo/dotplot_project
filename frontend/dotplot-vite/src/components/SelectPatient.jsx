import { Table, Container, Title, Text  } from '@mantine/core';

const tableData = {
  head: ['Patient ID', 'Patient Name'],
  body: [
    { id: 2338, name: 'Kay Slade' },
    { id: 8778, name: 'Elisabeth Slade' },
  ],
};

// eslint-disable-next-line react/prop-types
export default function SelectPatient({onData, onUniqueData }) {

  const handleRowClick = (patientID) => {
    const formData = new FormData();
    formData.append('patient_id', patientID);

    fetch('/api/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);

        // Code to remove duplicates due to multiple scans.
        const seen = new Set();
        const uniqueData = data.filter((item) => {
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
  };

  return (
    <Container style={{
        position: 'absolute',
        top: '27%',
        left: '40%',
    }}>
        <Title ta="center">
            Search
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb="lg">
            Select a patient from these results
        </Text>
        <Table striped highlightOnHover withRowBorders={false} verticalSpacing="md">
        <caption>{tableData.caption}</caption>
        <Table.Thead>
            <Table.Tr>
            {tableData.head.map((heading) => (
                <Table.Th key={heading}>{heading}</Table.Th>
            ))}
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            {tableData.body.map((row) => (
            <Table.Tr key={row.id} onClick={() => handleRowClick(row.id)} style={{ cursor: 'pointer' }}>
                <Table.Td>{row.id}</Table.Td>
                <Table.Td>{row.name}</Table.Td>
            </Table.Tr>
            ))}
        </Table.Tbody>
        </Table>
    </Container>
  );
}