import { Container, SimpleGrid, rem, Paper, Text, Title, Image, Box } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';
import modelImage from '../../model.png';
import { useState, useEffect } from 'react';

const coordinates = {
    A1: { top: '63%', left: '23.5%' },
    A2: { top: '69%', left: '23.5%' },
    A3: { top: '75%', left: '23.5%' },
    A4: { top: '81%', left: '23.5%' },
    B1: { top: '63%', left: '30.5%' },
    B2: { top: '69%', left: '30.5%' },
    B3: { top: '75%', left: '30.5%' },
    B4: { top: '81%', left: '30.5%' },
    C1: { top: '63%', left: '37.5%' },
    C2: { top: '69%', left: '37.5%' },
    C3: { top: '75%', left: '37.5%' },
    C4: { top: '81%', left: '37.5%' },
    D1: { top: '63%', left: '44.5%' },
    D2: { top: '69%', left: '44.5%' },
    D3: { top: '75%', left: '44.5%' },
    D4: { top: '81%', left: '44.5%' },
    E1: { top: '63%', left: '51.5%' },
    E2: { top: '69%', left: '51.5%' },
    E3: { top: '75%', left: '51.5%' },
    E4: { top: '81%', left: '51.5%' },
    F1: { top: '63%', left: '58.5%' },
    F2: { top: '69%', left: '58.5%' },
    F3: { top: '75%', left: '58.5%' },
    F4: { top: '81%', left: '58.5%' },
    G1: { top: '63%', left: '65.5%' },
    G2: { top: '69%', left: '65.5%' },
    G3: { top: '75%', left: '65.5%' },
    G4: { top: '81%', left: '65.5%' },
    H1: { top: '63%', left: '70.5%' },
    H2: { top: '69%', left: '70.5%' },
    H3: { top: '75%', left: '70.5%' },
    H4: { top: '81%', left: '70.5%' },
};


// eslint-disable-next-line react/prop-types
export default function ViewPatient({ data }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [clickedIndex, setClickedIndex] = useState(null);
    const [scanImage, setScanImage] = useState('');
 
    // eslint-disable-next-line react/prop-types
    const modifiedData = data.map(subArray => subArray.slice(7));
    
    useEffect(() => {
        if (hoveredIndex !== null || clickedIndex !== null) {
            const scanNumber = hoveredIndex !== null ? modifiedData[hoveredIndex][0] : modifiedData[clickedIndex][0];
            import(`../../../data/US scans/${scanNumber}.png`)
                .then((image) => setScanImage(image.default))
                .catch((error) => {
                    console.error(`Image for scan number ${scanNumber} not found`, error);
                    setScanImage(null);
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hoveredIndex, clickedIndex]);

    return (
    <Container my="md" mx={0}>
      <SimpleGrid cols={3} w={1500} spacing="xl" m={0} h={rem(650)}>
        <Paper shadow="md" p="xl">
            <Title mb="lg">{data[0][0]}: {data[0][1]} {data[0][2]}</Title>
            <div>
                <Text size="lg" color="dimmed">
                    Age
                </Text>
                <Text fw={500} size="lg">
                    {data[0][3]}
                </Text>
                <Text mt="sm" size="lg" color="dimmed">
                    Height
                </Text>
                <Text fw={500} size="lg">
                    {data[0][4]} cm
                </Text>
                <Text mt="sm" size="lg" color="dimmed">
                    Weight
                </Text>
                <Text fw={500} size="lg">
                    {data[0][5]} kg
                </Text>
                <Text mt="sm" size="lg" color="dimmed">
                    History of breast cancer
                </Text>
                <Text fw={500} size="lg">
                    {data[0][6]}
                </Text>
            </div>
        </Paper>
        <Paper shadow="md" p="xl">
            <Title mb="lg">Scans</Title>
            <Box style={{ position: 'relative', display: 'inline-block' }}>
                <Image radius="sm" src={modelImage} />
                {modifiedData.map((subArray, index) => {
                    const coordinateKey = subArray[1];
                    const position = coordinates[coordinateKey] || { top: '0%', left: '0%' };
                    return (
                        <Box
                            key={index}
                            style={{
                                position: 'absolute',
                                top: position.top,
                                left: position.left,
                                width: '28px',
                                height: '28px',
                                backgroundColor: 'blue',
                                opacity: 0.5,
                                cursor: 'pointer',
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => setClickedIndex(index)}
                        />
                    );
                })}
            </Box>
        </Paper>
        <Paper h={useFullscreen} shadow="md" p="xl">
        {(hoveredIndex !== null || clickedIndex !== null) && (
            <div>
                <Title mb="lg">Scan #{hoveredIndex !== null ? modifiedData[hoveredIndex][0] : modifiedData[clickedIndex][0]}</Title>
                <Image
                    radius="sm"
                    src={scanImage}
                />
                <div>
                    <SimpleGrid cols={2} my="md">
                        <div>
                            <Text size="lg" color="dimmed">
                                Coordinates
                            </Text>
                            <Text fw={500} size="lg">
                                {hoveredIndex !== null ? modifiedData[hoveredIndex][1] : modifiedData[clickedIndex][1]}
                            </Text>
                        </div>
                        <div>
                            <Text size="lg" color="dimmed">
                                Date of scan
                            </Text>
                            <Text fw={500} size="lg">
                                {hoveredIndex !== null 
                                  ? modifiedData[hoveredIndex][2].split(' ').slice(0, 4).join(' ') 
                                  : modifiedData[clickedIndex][2].split(' ').slice(0, 4).join(' ')}
                            </Text>
                        </div>
                    </SimpleGrid>
                    <Text mt="sm" size="lg" color="dimmed">
                        Diagnosis
                    </Text>
                    <Text fw={500} size="lg">
                        {hoveredIndex !== null ? modifiedData[hoveredIndex][3] : modifiedData[clickedIndex][3]}
                    </Text>
                </div>
            </div>
        )}
        </Paper>
      </SimpleGrid>
    </Container>
  );
}